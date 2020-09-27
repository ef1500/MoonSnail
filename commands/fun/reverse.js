//Imports requirements
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reverse",
  category: "fun",
  description: "Uno reverse lol.",
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
    //Sends the response in an embed and deletes it after 50000ms
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage(
        "https://www.uokpl.rs/fpng/f/151-1516996_transparent-uno-card.png"
      );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
