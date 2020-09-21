//IMPORTS
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
config({
  path: `${__dirname}/.env`,
});
const fs = require("fs");

//CLIENT
const client = new Client({
  fetchAllMembers: true,
  disableMentions: "all",
});

///HANDLERS
client.commands = new Collection();
client.mongoose = require("./utils/mongoose");
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    client.on(evtName, evt.bind(null, client));
  });
});

//BETTER SAFE THEN SORRY
client.on("error", console.error);
client.on("warn", console.warn);

//STARTUP
client.mongoose.init();
client.login(process.env.TOKEN);
