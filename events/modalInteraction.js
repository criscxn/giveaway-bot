const db = require("croxydb");
const {
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

/**
 *
 * @param {Client<true>} client
 * @param {import("discord.js").Interaction} interaction
 * @returns
 */
module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "form") {
    const prize = interaction.fields.getTextInputValue("prize");
    const time = interaction.fields.getTextInputValue("zaman");
    const zaman = Date.now();

    try {
      const var1 = ms(time);
      const vars = await db.get(
        `cekilis.${interaction.guild.id}_${interaction.channel.id}`
      );

      if (!vars) {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setEmoji("🎉")
            .setCustomId("giveaway")
            .setStyle(ButtonStyle.Primary)
        );
        const embed = new EmbedBuilder()
          .setColor("#5865f2")
          .setTitle(prize)
          .setTimestamp().setDescription(`
  Süre: <t:${Math.floor(Date.now() / 1000) + Math.floor(var1 / 1000)}:R> (<t:${
          Math.floor(Date.now() / 1000) + Math.floor(var1 / 1000)
        }:f>)
  Düzenleyen: <@${interaction.user.id}>
  Kazanan: 1
  Katılımcı: **0**`);
        interaction.reply({
          content: "Çekiliş Başarıyla Oluşturuldu.",
          ephemeral: true,
        });
        interaction.channel
          .send({ embeds: [embed], components: [row] })
          .then((mesaj) => {
            db.set(`cekilis_${mesaj.id}`, interaction.user.id);
            db.push(`user_${mesaj.id}`, interaction.user.id);
            db.set(`reroll_${interaction.guild.id}`, {
              channelID: interaction.channel.id,
              messageID: mesaj.id,
            });
            db.set(`cekilis_${interaction.channel.id}`, {
              kanalid: interaction.channel.id,
              mesajid: mesaj.id,
              hosted: interaction.user.id,
              sure: var1,
              zaman: zaman,
              toplam: 1,
              odul: prize,
              ex: Math.floor(Date.now() / 1000) + Math.floor(var1 / 1000),
            });
            db.set(`cekilis_${mesaj.id}`, {
              kanalid: interaction.channel.id,
              mesajid: mesaj.id,
              hosted: interaction.user.id,
              sure: var1,
              zaman: zaman,
              toplam: 1,
              odul: prize,
              ex: Math.floor(Date.now() / 1000) + Math.floor(var1 / 1000),
            });
          });
      }
    } catch (err) {
      interaction.reply("Girdiğin süre geçerli bir süre değil!");
    }
  }
};
