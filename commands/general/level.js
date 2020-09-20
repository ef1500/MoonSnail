const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const levels = require("../../models/profile");
const Discord = require("discord.js");

module.exports = {
  name: "level",
  category: "general",
  description: "Shows the authors xp level.",
  usage: `level`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.member.user +
        " ran the command: " +
        message.content
    );
    const user = await levels.findOne({
      userId: message.author.id,
    });
    const level = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor(
        `Your current level is ${user.level} and you have ${user.xp} XP in that level!`
      );
    message.channel.send(level).then((msg) => {
      msg.delete({ timeout: 60000 });
    });
  },
};
