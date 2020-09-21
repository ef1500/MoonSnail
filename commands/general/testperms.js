const Discord = require("discord.js");

module.exports = {
  name: "testperms",
  category: "general",
  description: "Tests if you have admin perms on a server.",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (message.member.hasPermission("ADMINISTRATOR")) {
      const testpassed = new Discord.MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setAuthor("Test passed!");
      message.channel.send(testpassed).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    } else {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  },
};
