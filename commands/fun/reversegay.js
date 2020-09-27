//Author: ef1500 (fixed by seasnail as per)
//Imports requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reversegay",
  category: "fun",
  description: "Uno reverse but for weebs.",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    //Deletes the command message
    message.delete();
    //Sends the response in an embed and deletes it after 50000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage(
        "https://64.media.tumblr.com/aab218159b28cd130d95e3cb5fa1da5c/tumblr_pshl5wq4zO1vxgjheo1_500.png"
      );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
