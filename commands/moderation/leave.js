const Discord = require("discord.js");

module.exports = {
  name: "leave",
  category: "moderation",
  description: "Makes the bot leave the server.",
  usage: "leave",
  run: async (client, message, args, member) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.guild.leave();
    } else {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
  },
};
