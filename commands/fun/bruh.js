//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

var bruhpics = [
  "https://technofaq.org/wp-content/uploads/2016/02/bruh.jpg",
  "https://i.ytimg.com/vi/ZF57zsOWdB0/maxresdefault.jpg",
  "http://www.quickmeme.com/img/07/07dd24bc150b74327b321009a2a6b3cb584f935249c0a86abc82cdbcb6b0a76e.jpg",
];

module.exports = {
  name: "bruh",
  category: "fun",
  description: "shows a random bruh pic",
  usage: `bruh`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    const randBruh = bruhpics[Math.floor(Math.random() * chooseArr.length)];

    const embed = new MessageEmbed()
      .setColor(process.env.FAIL_COLOR)
      .setAuthor(`**Bruh Moment:**`)
      .attachFiles(randBruh);
    message.channel.send(embed);
  },
};
