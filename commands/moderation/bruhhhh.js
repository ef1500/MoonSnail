const Discord = require("discord.js");

module.exports = {
  name: "ban2",
  category: "moderation",
  description: "Bans a mentioned user.",
  usage: "ban {user}",
  run: async (client, message) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const args = message.content.split(" ").slice(1); // All arguments behind the command name with the prefix
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ");
    console.log(reason);
    console.log(user);
    console.log(args);

    if (!user) {
      const cantban = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry, ` +
            `<@${message.author.id}>` +
            ` you need to input a valid member to ban.`
        );
      message.delete();
      message.channel.send(cantban).then((msg) => {
        msg.delete({
          timeout: 5000,
        });
      });
      return;
    }
    if (user === message.author) {
      const cantban = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry, ` +
            `<@${message.author.id}>` +
            ` you need to input a valid member to ban.`
        );
      message.delete();
      message.channel.send(cantban).then((msg) => {
        msg.delete({
          timeout: 5000,
        });
      });
      return;
    }
    if (!reason) {
      const noreason = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry, ` +
            `<@${message.author.id}>` +
            ` you need to enter a reason for the ban.`
        );
      message.delete();
      message.channel.send(noreason).then((msg) => {
        msg.delete({
          timeout: 5000,
        });
      });
      return;
    }
    console.log("test");
    if (!user.hasPermission("ADMINISTRATOR")) {
      user.ban().then((user) => {
        const banned = new Discord.MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setDescription(
            `<@${user.id}>` +
              " has been successfully banned!\n" +
              `**Reason**: ${reason}`
          );
        message.channel.send(banned);
        return;
      });
    }
  },
};
