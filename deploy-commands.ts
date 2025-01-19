import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "npm:discord.js";

const clientId = Deno.env.get("CLIENT_ID");
const guildId = Deno.env.get("GUILD_ID");
const token = Deno.env.get("FRONTMAN_TOKEN");

if (!clientId || !guildId || !token) {
    throw new Error("Missing environment variables.");
}

import { join, extname } from "@std/path";

const commands = [];
const currentDir = Deno.cwd();
const foldersPath = join(currentDir, 'commands');

for await (const folderEntry of Deno.readDir(foldersPath)) {
    if (folderEntry.isDirectory) {
        const commandsPath = join(foldersPath, folderEntry.name);
        console.log(commandsPath)
        for await (const commandEntry of Deno.readDir(commandsPath)) {
            if (extname(commandEntry.name) === '.ts') {
                const filePath = join(commandsPath, commandEntry.name);
                const command = await import(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		) as RESTPostAPIApplicationCommandsJSONBody[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
