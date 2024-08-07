const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const db = require("croxydb");

db.setLanguage("tr");
db.setReadable(true);

const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
  intents: INTENTS,
  allowedMentions: { parse: ["users"] },
  partials: PARTIALS,
  retryLimit: 3,
});

global.client = client;
client.commands = global.commands = [];

/* Slash Komutları Yüklüyoruz */

readdirSync("./commands").forEach((f) => {
  if (!f.endsWith(".js")) return;

  const props = require(`./commands/${f}`);

  client.commands.push({
    name: props.name.toLowerCase(),
    description: props.description,
    options: props.options,
    dm_permission: props.dm_permission,
    type: 1,
  });

  console.log(`[COMMAND] ${props.name} komutu yüklendi.`);
});

/* Slash Komutları Yüklüyoruz */

/* Eventleri Yüklüyoruz */

readdirSync("./events").forEach((e) => {
  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
    eve(client, ...args);
  });

  console.log(`[EVENT] ${name} eventi yüklendi.`);
});

/* Eventleri Yüklüyoruz */

client
  .login(TOKEN)
  .then(() => {
    console.log(`[BOT] Token girişi başarılı.`);
  })
  .catch((err) => {
    console.log(`[BOT] Token girşi başarısız.`, err);
  });
