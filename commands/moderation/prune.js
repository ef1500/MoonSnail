const Discord = require("discord.js");

module.exports = {
  name: "prune",
  category: "moderation",
  description: "Deletes a specified number of messages in the current channel.",
  usage: "prune {number from 2 - 100}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      const amount = parseInt(args[0]);
      if (isNaN(amount)) {
        const invalid = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setAuthor(`Please enter a valid number between 2 and 100.`);
        message.delete();
        message.channel.send(invalid);
        return;
      } else if (amount < 2 || amount > 100) {
        const invalid = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setAuthor(`Please enter a valid number between 2 and 100.`);
        message.delete();
        message.channel.send(invalid);
      }
      message.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        const error = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setAuthor(
            `There was an error trying to prune in this channel, check my permissions.`
          );
        message.delete();
        message.channel.send(error).then((msg) => {
          msg.delete({ timeout: 3000 });
        });
        return;
      });
    }
  },
};
