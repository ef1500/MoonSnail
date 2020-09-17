const chalk = require("chalk");
var setTitle = require("console-title");
const readline = require("readline");
var center = require("center-align");
var colors = require("colors");

module.exports = async (client) => {
  console.log(
    center(
      `
      ┏━┓┏━┓╋╋╋╋╋╋╋╋┏━━━┓╋╋╋╋╋╋┏┓
      ┃┃┗┛┃┃╋╋╋╋╋╋╋╋┃┏━┓┃╋╋╋╋╋╋┃┃
      ┃┏┓┏┓┣━━┳━━┳━┓┃┗━━┳━┓┏━━┳┫┃
      ┃┃┃┃┃┃┏┓┃┏┓┃┏┓╋━━┓┃┏┓┫┏┓┣┫┃
      ┃┃┃┃┃┃┗┛┃┗┛┃┃┃┃┗━┛┃┃┃┃┏┓┃┃┗┓
      ┗┛┗┛┗┻━━┻━━┻┛┗┻━━━┻┛┗┻┛┗┻┻━┛
  `.blue.bold,
      112
    )
  );

  console.log(
    `MoonSnail`.blue.bold +
      ` is online! Logged in as \[${client.user.tag}\] (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`
  );
  console.log("SERVERS: ".blue.bold);
  client.guilds.cache.forEach((guild) => {
    console.log("» ".green + guild.name);
  });
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "%help",
      type: "LISTENING",
    },
  });
};
