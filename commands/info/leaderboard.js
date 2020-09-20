const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const levels = require("../../models/profile");
const Discord = require("discord.js");

module.exports = {
  name: "prefix",
  category: "admin",
  description: "Sets the prefix for this server.",
  usage: `prefix <newPrefix>`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.member.user +
        " ran the command: " +
        message.content
    );
    const guild = await levels.findOne(
      {
        guildID: message.guild.id,
      },
      (err, guild) => {
        if (err) console.error(err);
      }
    );
  },
};
