const db = require("croxydb");
const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 * @param {Client<true>} client
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.guildId) return;

  readdirSync("./commands").forEach((f) => {
    const cmd = require(`../commands/${f}`);

    if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
      return cmd.run(client, interaction, db);
    }
  });
};
