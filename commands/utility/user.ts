import { SlashCommandBuilder, ChatInputCommandInteraction } from "npm:discord.js";

export const data = new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.");

export async function execute(interaction: ChatInputCommandInteraction) {
    try {
        const member = await interaction.guild?.members.fetch(interaction.user.id);

        if (member?.joinedAt) {
            await interaction.reply(
                `You are: ${interaction.user.username}\nYou joined: ${member.joinedAt}`
            );
        } else {
            await interaction.reply(
                `You are: ${interaction.user.username}\nCan't find this idiots join date.`
            );
        }
    } catch (error) {
        console.error(error);
        await interaction.reply("Can't retrieve user information. I'll get a Pink Soldier on it.");
    }

}