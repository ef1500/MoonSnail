const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "reverse",
  category: "fun",
  description: "Uno reverse lol.",
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
      .setImage(
        "https://www.uokpl.rs/fpng/f/151-1516996_transparent-uno-card.png"
      );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
