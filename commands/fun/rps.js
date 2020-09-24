//Import requirements
const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

//Tells the bot what it can reply with
const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
  name: "rps",
  category: "fun",
  description: "Rock Paper Scissors.",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Sends the initial embed
    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        "Add a reaction to one of these emojis to play the game."
      );
    const m = await message.channel.send(embed);
    //Reacts to the embed
    const reacted = await promptMessage(m, message.author, 30, chooseArr);
    //Chooses a response
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    //Fetches the outcome
    const result = await getResult(reacted, botChoice);
    //Clears the reactions or logs an error
    await message.reactions
      .removeAll()
      .catch((error) => console.error("Failed to clear reactions: ", error));
    //edits the embed to show the outcome of the game
    embed.setDescription("").addField(result, `${reacted} vs ${botChoice}`);
    m.edit(embed);
    //Function used to get the result of the game
    function getResult(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return "You won!";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return "You lost!";
      }
    }
  },
};
