//Author: ef1500
//Imports requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pog",
  category: "fun",
  description: "Pogchamp",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Deletes the command message
    message.delete();
    //Sends the response in an embed and deletes it after 5000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage("https://pics.me.me/thumb_pogchamp-43297127.png");
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
