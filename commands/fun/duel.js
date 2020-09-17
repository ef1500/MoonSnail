const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const Discord = require("discord.js");

const chooseArr = ["✅", "❌"];
const accept = ["✅"];

module.exports = {
  name: "duel",
  category: "fun",
  description: "Duel another user.",
  usage: "duel {user}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    var oponent = message.mentions.members.first();
    if (!oponent) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.fail_color)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.delete();
      message.channel.send(nomember).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        "**Duel:** " +
          message.author.username +
          " wants to duel " +
          oponent.user.username +
          `\n**${oponent.user.username}**, do you accept? \n` +
          "React with ✅ to accept."
      );

    const m = await message.channel.send(embed);
    const reacted = await promptMessage(m, oponent, 30, accept);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await message.reactions
      .removeAll()
      .catch((error) => console.error("Failed to clear reactions: ", error));

    embed.setDescription(result);

    m.edit(embed);

    function getResult(me, clientChosen) {
      if (
        (me === "❌" && clientChosen === "✅") ||
        (me === "✅" && clientChosen === "❌")
      ) {
        return message.author.username + " won ez!";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return oponent.user.username + " won ez!";
      }
    }
  },
};
