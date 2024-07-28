const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const moment = require("moment");

require("moment-duration-format");
moment.locale("tr");

/**
 *
 * @param {Client<true>} client
 */
module.exports = async (client) => {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(
      "[BOT] Komutları Discord'a kaydederken bir sorun oluştu.",
      error
    );
  }

  console.log(`${client.user.tag} Aktif!`);
  client.user.setActivity("criscxn Slash Çekiliş Botu!");

  setInterval(async () => {
    client.guilds.cache.map(async (guild) => {
      guild.channels.cache.map(async (channel) => {
        const datax = db.fetch(`cekilis_${channel.id}`);
        if (!datax) return;
        const mesaj = datax.mesajid;

        const data = db.get(`cekilis_${mesaj}`);
        if (data) {
          const time = Date.now() - data.zaman;
          const sure = data.sure;

          const kanal = guild.channels.cache.get(data.kanalid);
          kanal.messages.fetch(data.mesajid).then(() => {});

          if (time >= sure) {
            const winner = [];
            const kazanan = db.get(`user_${mesaj}`)[
              Math.floor(Math.random() * db.get(`user_${mesaj}`).length)
            ];
            if (!winner.map((winir) => winir).includes(kazanan))
              winner.push(kazanan);

            kanal.messages.fetch(data.mesajid).then(async (mesaj) => {
              const katılımcı = db.get(`user_${mesaj.id}`).length;
              const embed = new EmbedBuilder()
                .setTitle(data.odul)
                .setColor("#5865f2")
                .setTimestamp().setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() / 1000)}:R> (<t:${Math.floor(
                Date.now() / 1000
              )}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: <@${winner}> 
Katılımcı: **${katılımcı}**`);
              mesaj.edit({ embeds: [embed], components: [] });

              if (winner) {
                db.set(`cekilis_${mesaj.id}`, data.odul);
                db.delete(`cekilis_${channel.id}`);

                kanal.send(`Tebrikler <@${winner}> **${data.odul}** Kazandın!`);
                db.set(`son_${mesaj.id}`, true);
              } else {
                db.delete(`cekilis_${mesaj.id}`);
                db.delete(`cekilis_${channel.id}`);
                const embed = new EmbedBuilder()
                  .setTitle(data.odul)
                  .setColor("#5865f2").setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() / 1000)}:R> (<t:${Math.floor(
                  Date.now() / 1000
                )}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: Bilinmiyor.
Katılımcı: **0**`);
                mesaj.edit({ embeds: [embed], components: [] });
              }
            });
          }
        }
      });
    });
  }, 5000);
};
