import { Message } from "discord.js"
import { CommandListener } from "./command-listener"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"

@injectable()
export class CommandResponder {
  private CommandListener: CommandListener

  constructor(
    @inject(TYPES.CommandListener) CommandListener: CommandListener
  ) {
    this.CommandListener = CommandListener;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.CommandListener.isWhoCommand(message.content)) {
      return message.reply(`I am bot that is made to demonstrate connection between NodeJs and Discord.`)
    }
    if (this.CommandListener.isRollCommand(message.content)) {
      const rolled = Math.floor(Math.random() * 100) + 1
      return message.reply(`You have rolled ${rolled}`)
    }

    return Promise.reject();
  }
}