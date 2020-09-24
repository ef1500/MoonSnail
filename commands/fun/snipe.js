//Author: ef1500
//Imports requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  category: "fun",
  description: "Pew pew pew",
  usage: `snipe {user}`,
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Tells the bot what it can respond with
    var outcomes = [
      "You Missed.",
      "Headshot",
      "Target Eliminated.",
      "Misfire.",
      "よくできました！",
      "Great Shot!",
      "Target Lost.",
      "Get better eyes",
      "You killed an innocent suvillian",
    ];
    //Chooses a response from the responses list
    const randOut = outcomes[Math.floor(Math.random() * outcomes.length)];
    //Sends the response in an embed and deletes it after 60000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(randOut);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 60000 });
    });
  },
};
