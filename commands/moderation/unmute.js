const Discord = require("discord.js");
const Guild = require("../../models/guild");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  category: "moderation",
  usage: "unmute {user}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (!message.member.hasPermission("MANAGE_ROLES")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }

    if (message.mentions.users.size === 0) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.delete();
      message.channel.send(nomember).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    let unmuteTarget = message.guild.member(message.mentions.users.first());
    if (!unmuteTarget) {
      const cantunmute = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't unmute that member.`);
      message.delete();

      message.channel.send(cantunmute).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    let muterole = message.guild.roles.cache.find((x) => x.name == "Muted");
    unmuteTarget.roles.remove(muterole);
    const unmuted = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor(unmuteTarget.user.username + ` has been unmuted!`);
    message.channel.send(unmuted);
  },
};
