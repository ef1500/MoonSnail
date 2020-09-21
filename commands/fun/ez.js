//Author: ef1500
//Import Requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ez",
  category: "fun",
  description: "GG EZ",
  run: async (message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Deletes the command message
    message.delete();
    //Sends response in an embed and deletes it after 5000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage("https://i.imgur.com/vBgfzFL.png");
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
