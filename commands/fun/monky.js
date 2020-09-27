//Author: ef1500 (fixed by seasnail as per)
//Imports requirements
const { MessageEmbed } = require("discord.js");
//Tells the bot what it can reply with
var monkeypics = [
  "https://i.ytimg.com/vi/M3XECvpSPNA/maxresdefault.jpg",
  "https://i.imgflip.com/33kw.jpg",
  "https://i.insider.com/59ca74582488496ef520430f?width=480",
];

module.exports = {
  name: "monky",
  category: "fun",
  description: "monky brain",
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
    //Picks a response to send
    const randMonkey =
      monkeypics[Math.floor(Math.random() * monkeypics.length)];
    //Sends response in an embed and deletes it after 10000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage(randMonkey);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000 });
    });
  },
};
