//Author: ef1500 (fixed by seasnail as per)
//Import Requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ez",
  category: "fun",
  description: "ezzzz",
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
    //Sends response in an embed and deletes it after 10000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage("https://i.imgur.com/vBgfzFL.png");
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000 });
    });
  },
};
