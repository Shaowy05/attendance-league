import { Client, Collection, GatewayIntentBits } from "npm:discord.js";
import { Command } from "./Command.ts";

export class CustomClient extends Client {
  commands: Collection<string, Command> = new Collection();

  constructor() {
    super({ intents: GatewayIntentBits.Guilds });
    this.commands = new Collection();
  }
}
