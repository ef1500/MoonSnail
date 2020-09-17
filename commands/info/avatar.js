const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "info",
  description: "Displays the mentioned users profile picture in an embed.",
  usage: "avatar {user} *or* avatar",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const user = message.mentions.users.first() || message.author;
    if (!user) {
      message.delete();
      const nouser = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that user.`);
      message.delete();
      message.channel.send(nouser).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setAuthor(user.username)
      .setImage(user.displayAvatarURL());
    message.channel.send(avatarEmbed);
  },
};
