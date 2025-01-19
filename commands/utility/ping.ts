import { SlashCommandBuilder, ChatInputCommandInteraction } from "npm:discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Pong!");
}