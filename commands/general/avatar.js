//Imports requirements
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "general",
  description: "Displays the mentioned users profile picture in an embed.",
  usage: "avatar (self) *or* avatar {user}",
  run: async (message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Sets the user as the first mention or if there is no mention, the author
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
      //.setAuthor(user.username + "'s Profile Picture:")
      .setImage(
        user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
      );
    message.channel.send(avatarEmbed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
