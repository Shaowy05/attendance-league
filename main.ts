// Filesystem
import { join, extname } from "@std/path";

// Discord
import { CustomClient } from "./types/CustomClient.ts";
import { Event } from "./types/Event.ts";

// Retrieve the token from the environment variables
const token = Deno.env.get("FRONTMAN_TOKEN");

// Create a new client instance
const client = new CustomClient();

const currentDir = Deno.cwd();
const commandsFolderPath = join(currentDir, 'commands');

for await (const folder of Deno.readDir(commandsFolderPath)) {
    if (folder.isDirectory) {
        const commandsPath = join(commandsFolderPath, folder.name);
        for await (const commandEntry of Deno.readDir(commandsPath)) {
            if (extname(commandEntry.name) === '.ts') {
                const filePath = join(commandsPath, commandEntry.name);
                const command = await import(filePath);
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }
}

const eventsFolderPath = join(currentDir, 'events');

for await (const file of Deno.readDir(eventsFolderPath)) {
    const filePath = join(eventsFolderPath, file.name);
    const event: Event = await import(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord
client.login(token);
