const { MessageEmbed } = require("discord.js");
const db = require("mongoose");
const profiles = require("../../models/profile");
const Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  category: "general",
  description: "Shows the xp leaderboard for this server.",
  usage: `leaderboard`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.member.user +
        " ran the command: " +
        message.content
    );
    message.delete();
    profiles
      .find({ guildId: message.guild.id })
      .sort([
        ["level", "descending"],
        ["xp", "descending"],
      ])
      .exec((err, res) => {
        if (err) {
          console.log(err);
        }
        const embed = new MessageEmbed()
          .setTitle(`**Leaderboard for: ${message.guild.name}**`)
          .setThumbnail(message.guild.iconURL({ dynamic: true }));

        if (res.length === 0) {
          embed.setColor(process.env.FAIL_COLOR);
          embed.addField(
            "No information found",
            "Please send a message to gain XP levels!"
          );
        } else if (res.length < 10) {
          embed.setColor(process.env.GENERAL_COLOR);
          for (i = 0; i < res.length; i++) {
            let member =
              message.guild.members.cache.get(res[i].userId) || "Member left";
            if (member === "Member left") {
              embed.addField(
                `${i + 1}. ${member}`,
                ` **Level**: ${res[i].level} **XP**: ${res[i].xp}/` +
                  res[i].level * res[i].level * 100
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                ` **Level**: ${res[i].level} **XP**: ${res[i].xp}/` +
                  res[i].level * res[i].level * 100
              );
            }
          }
        } else {
          embed.setColor(process.env.GENERAL_COLOR);
          for (i = 0; i < 10; i++) {
            let member =
              message.guild.members.cache.get(res[i].userId) || "Member left";
            if (member === "Member left") {
              embed.addField(
                `${i + 1}. ${member}`,
                ` **Level**: ${res[i].level} **XP**: ${res[i].xp}/` +
                  res[i].level * res[i].level * 100
              );
            } else {
              embed.addField(
                `${i + 1}. ${member.user.username}`,
                `**Level**: ${res[i].level} **XP**: ${res[i].xp}/` +
                  res[i].level * res[i].level * 100
              );
            }
          }
        }
        message.channel.send(embed).then((msg) => {
          msg.delete({ timeout: 120000 });
        });
      });
  },
};
