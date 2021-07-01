import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { CommandResponder } from "./services/command-responder";

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private commandResponder: CommandResponder;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.DiscordToken) token: string,
    @inject(TYPES.CommandResponder) commandResponder: CommandResponder) {
    this.client = client
    this.token = token
    this.commandResponder = commandResponder
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        console.log('Ignoring my own or other bot messages.')
        return
      }

      this.commandResponder.handle(message).then(() => {
        console.log("A response sent!")
      }).catch(() => {
        console.log("There was an error with sending a response.")
      })
    });

    return this.client.login(this.token)
  }
}