import { Events } from "npm:discord.js";
import { CustomClient } from "../types/CustomClient.ts";

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: CustomClient) {
    try {
        const user = await client.users.fetch(client.user?.id as string);
        if (user) {
            console.log(`Ready! Logged in as ${user.tag}`);
        } else {
            console.error("Failed to fetch bot user.");
        }
    } catch (error) {
        console.error(error);
        console.error("Failed to fetch bot user.");
    }
}