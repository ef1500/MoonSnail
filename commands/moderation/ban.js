const Discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Bans a mentioned user.",
  usage: "ban {user}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    var member = message.mentions.members.first();
    if (!member) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.delete();
      message.channel.send(nomember).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    if (!member.hasPermission("ADMINISTRATOR")) {
      member.ban().then((member) => {
        const banned = new Discord.MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setAuthor(member.displayName + " has been successfully banned!");
        message.channel.send(banned);
        return;
      });
    } else {
      const cantban = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't ban that member.`);
      message.delete();
      message.channel.send(cantban).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  },
};
