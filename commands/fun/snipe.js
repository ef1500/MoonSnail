//author ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "snipe",
  category: "fun",
  description: "Pew pew pew",
  usage: `snipe {user}`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();

    //create list of possible outcomes
    var outcomes = ["You Missed.", "Headshot", "Target Eliminated.", "Misfire.", "よくできました！", "Great Shot!", "Target Lost.", "Get better eyes", "You killed an innocent suvillian"];


        const randOut = outcomes[Math.floor(Math.random() * chooseArr.length)]; //choose an outcome

        const embed = new MessageEmbed()
          .setTitle(`***RESULTS***`)
          .setDescription(randOut)

    message.channel.send(embed);
  },
};
