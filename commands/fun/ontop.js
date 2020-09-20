const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const readline = require("readline");
var center = require("center-align");
var colors = require("colors");

module.exports = {
  name: "ontop",
  category: "fun",
  description: "MoonSnail on top",
  usage: `ontop`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    message.channel
      .send(
        "lol \n" +
          center(`
      ┏━┓┏━┓╋╋╋╋╋╋╋╋┏━━━┓╋╋╋╋╋╋┏┓
      ┃┃┗┛┃┃╋╋╋╋╋╋╋╋┃┏━┓┃╋╋╋╋╋╋┃┃
      ┃┏┓┏┓┣━━┳━━┳━┓┃┗━━┳━┓┏━━┳┫┃
      ┃┃┃┃┃┃┏┓┃┏┓┃┏┓╋━━┓┃┏┓┫┏┓┣┫┃
      ┃┃┃┃┃┃┗┛┃┗┛┃┃┃┃┗━┛┃┃┃┃┏┓┃┃┗┓
      ┗┛┗┛┗┻━━┻━━┻┛┗┻━━━┻┛┗┻┛┗┻┻━┛`)
      )
      .then((msg) => {
        msg.delete({ timeout: 1000 });
      });
  },
};
