const Discord = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  name: "nickbot",
  category: "admin",
  description: "Changes the bots nickname.",
  usage: "nickbot {nickname}",
  run: async (client, message, args) => {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );

    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      message.delete({ timeout: 5000 });
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry ` +
            `<@${message.author.id}>` +
            `, you don't have the required permissions to change the bots nickname.`
        );
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    if (message.member.hasPermission("MANAGE_NICKNAMES")) {
      let nick = message.content.slice(settings.prefix.length + 9);
      if (!nick) {
        const nonick = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setDescription(
            `Sorry ` +
              `<@${message.author.id}>` +
              `, you need to specify a new nickname in order to change the bots nickname.`
          );
        message.delete({ timeout: 5000 });
        message.channel.send(nonick).then((msg) => {
          msg.delete({ timeout: 5000 });
        });
        return;
      }
      message.guild.me.setNickname(nick);
      const nickupdate = new Discord.MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setDescription(
          `Thanks ${message.author}! You just changed my nickname to \`${nick}\``
        );
      message.delete({ timeout: 50000 });
      message.channel.send(nickupdate).then((msg) => {
        msg.delete({ timeout: 50000 });
      });
      return;
    }
  },
};
