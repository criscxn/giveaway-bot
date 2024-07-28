const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

const modal = new ModalBuilder()
  .setCustomId("form")
  .setTitle("Cris - Çekiliş Kurulum!");
const a1 = new TextInputBuilder()
  .setCustomId("prize")
  .setLabel("Ödül")
  .setStyle(TextInputStyle.Paragraph)
  .setMinLength(2)
  .setPlaceholder("Çekiliş Ödülü Ne Olacak?")
  .setRequired(true);
const a2 = new TextInputBuilder()
  .setCustomId("key")
  .setLabel("Key")
  .setStyle(TextInputStyle.Paragraph)
  .setMinLength(1)
  .setPlaceholder("Çekilişin Anahtarı Ne Olacak? (Reroll, End)")
  .setRequired(true);
const a3 = new TextInputBuilder()
  .setCustomId("zaman")
  .setLabel("Süre")
  .setStyle(TextInputStyle.Paragraph)
  .setMinLength(1)
  .setPlaceholder("1s/1m/1h/1d")
  .setRequired(true);

const row = new ActionRowBuilder().addComponents(a1);
const row3 = new ActionRowBuilder().addComponents(a3);
modal.addComponents(row, row3);

module.exports = {
  name: "çekiliş-başlat",
  description: "Bir çekiliş oluşturursun!",
  type: 1,
  options: [],
  run: async (client, interaction) => {
    await interaction.showModal(modal);
  },
};
