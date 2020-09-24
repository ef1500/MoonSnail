const Discord = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  name: "nickbot",
  category: "general",
  description: "Changes the bots nickname.",
  usage: "nickbot {nickname}",
  run: async (client, message, args) => {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }

    if (message.member.hasPermission("MANAGE_NICKNAMES")) {
      let nick = message.content.slice(settings.prefix.length + 8);
      if (!nick) {
        const nonick = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setAuthor(`Please specifiy a nickname.`);
        message.delete();
        message.channel.send(nonick).then((msg) => {
          msg.delete({ timeout: 3000 });
        });
        return;
      }
      message.guild.me.setNickname(nick);
      const nickupdate = new Discord.MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setAuthor("Updated the bots nickname.");
      message.delete();
      message.channel.send(nickupdate).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  },
};
