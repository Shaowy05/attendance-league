import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "npm:discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Provides information about the server.");

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    if (interaction.guild) {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
      );
    } else {
      await interaction.reply(
        "Frontman doesn't reveal information about the island.",
      );
    }
  } catch (error) {
    console.error(error);
    await interaction.reply(
      "Frontman doesn't reveal information about the island.",
    );
  }
}
