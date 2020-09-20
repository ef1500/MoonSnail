const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "reverse",
  category: "fun",
  description: "Uno reverse lol.",
  usage: `reverse`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    message.channel
      .send("https://www.uokpl.rs/fpng/f/151-1516996_transparent-uno-card.png")
      .then((msg) => {
        msg.delete({ timeout: 60000 });
      });
  },
};
