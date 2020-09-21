//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

var monkeypics = [
  "https://i.ytimg.com/vi/M3XECvpSPNA/maxresdefault.jpg",
  "https://i.imgflip.com/33kw.jpg",
  "https://i.insider.com/59ca74582488496ef520430f?width=480",
];

module.exports = {
  name: "monky",
  category: "fun",
  description: "monky brain",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    const randMonkey =
      monkeypics[Math.floor(Math.random() * monkeypics.length)];

    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setTitle(`Monky`)
      .setImage(randMonkey);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
