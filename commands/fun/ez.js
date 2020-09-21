//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "ez",
  category: "fun",
  description: "GG EZ",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage("https://i.imgur.com/vBgfzFL.png");
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
