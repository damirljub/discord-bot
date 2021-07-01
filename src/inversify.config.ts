import "reflect-metadata"
import { Container } from "inversify"
import { TYPES } from "./types"
import { Bot } from "./bot"
import { Client } from "discord.js"
import { CommandResponder } from "./services/command-responder"
import { CommandListener } from "./services/command-listener"

let container = new Container()

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope()
container.bind<Client>(TYPES.Client).toConstantValue(new Client())
container.bind<string>(TYPES.DiscordToken).toConstantValue(process.env.DISCORD_TOKEN)
container.bind<CommandResponder>(TYPES.CommandResponder).to(CommandResponder).inSingletonScope()
container.bind<CommandListener>(TYPES.CommandListener).to(CommandListener).inSingletonScope()

export default container