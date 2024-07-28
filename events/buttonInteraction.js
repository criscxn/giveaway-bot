const db = require("croxydb");
const { Client, EmbedBuilder } = require("discord.js");

/**
 * @param {Client<true>} client
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;

  if (!interaction.channel) return;

  const message = await interaction.channel.messages.fetch(
    interaction.message.id
  );
  if (interaction.customId === "giveaway") {
    const varmi = db.get(`user_${interaction.message.id}`);
    const data = db.get(`cekilis_${interaction.channel.id}`);
    if (!varmi) {
      const odul = data.odul;
      const sure = data.ex;
      const hosted = data.hosted;

      db.push(`user_${interaction.message.id}`, interaction.user.id);
      interaction.reply({
        content: "Başarıyla çekilişe katıldın!",
        ephemeral: true,
      });
      const katılımcı = db.get(`user_${interaction.message.id}`).length;

      const embed = new EmbedBuilder()
        .setTitle(odul)
        .setDescription(
          `
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`
        )
        .setColor("Blurple");
      message.edit({ embeds: [embed] });
    } else if (varmi.includes(interaction.user.id)) {
      db.unpush(`user_${interaction.message.id}`, interaction.user.id);
      interaction.reply({
        content: `Başarıyla çekilişten ayrıldın!`,
        ephemeral: true,
      });
      const katılımcı = db.get(`user_${interaction.message.id}`).length;
      const odul = data.odul;
      const sure = data.ex;
      const hosted = data.hosted;
      const embed = new EmbedBuilder()
        .setTitle(odul)
        .setDescription(
          `
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`
        )
        .setColor("Blurple");
      message.edit({ embeds: [embed] });
    } else {
      const odul = data.odul;
      const sure = data.ex;
      const hosted = data.hosted;
      db.push(`user_${interaction.message.id}`, interaction.user.id);
      interaction.reply({
        content: "Başarıyla çekilişe katıldın!",
        ephemeral: true,
      });
      const katılımcı = db.get(`user_${interaction.message.id}`).length;
      const embed = new EmbedBuilder()
        .setTitle(odul)
        .setDescription(
          `
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`
        )
        .setColor("Blurple");
      message.edit({ embeds: [embed] });
    }
  }
};
