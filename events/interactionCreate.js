const { Client } = require("discord.js");
const buttonEvent = require("./buttonInteraction");
const commandEvent = require("./commandInput");
const modalEvent = require("./modalInteraction");

/**
 * @param {Client<true>} client
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (client, interaction) => {
  if (interaction.isButton()) return buttonEvent(client, interaction);
  if (interaction.isChatInputCommand())
    return commandEvent(client, interaction);
  if (interaction.isModalSubmit()) return modalEvent(client, interaction);
};
