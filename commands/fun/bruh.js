//Author: ef1500

//Import Requirements
const { MessageEmbed } = require("discord.js");
//Tells the bot what it can reply with
var bruhpics = [
  "https://technofaq.org/wp-content/uploads/2016/02/bruh.jpg",
  "https://i.ytimg.com/vi/ZF57zsOWdB0/maxresdefault.jpg",
  "http://www.quickmeme.com/img/07/07dd24bc150b74327b321009a2a6b3cb584f935249c0a86abc82cdbcb6b0a76e.jpg",
];
module.exports = {
  name: "bruh",
  category: "fun",
  description: "Shows a random bruh pic.",
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
    //Picks which reply to send
    const randBruh = bruhpics[Math.floor(Math.random() * bruhpics.length)];
    //Sends the reply in an embed and deletes it after 3000ms
    const embed = new MessageEmbed()
      .setColor(process.env.FAIL_COLOR)
      .setImage(randBruh);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
