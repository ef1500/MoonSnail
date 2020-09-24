const Discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kicks a mentioned user.",
  usage: "kick {user}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    var member = message.mentions.members.first();
    if (!member) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.channel.send(nomember).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    if (!member.hasPermission("ADMINISTRATOR")) {
      member.kick().then((member) => {
        const kicked = new Discord.MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setDescription(`<@${member.id}>` + " has been successfully kicked!");
        message.channel.send(kicked);
      });
    } else {
      const cantkick = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't kick that member.`);
      message.channel.send(cantkick).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    }
  },
};
