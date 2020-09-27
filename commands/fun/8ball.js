//Import Requirements
const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  name: "8ball",
  description: "8ball pog.",
  category: "fun",
  usage: "8ball {question}",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    //Gets guild info from database
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    //Sets the question as any argument after the prefix + the length of the command
    let question = message.content.slice(settings.prefix.length + 6);
    //Warns that there was no arguments or that they were invalid
    if (!question) {
      const embed = new MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `<@${message.author.id}>` +
            `, you need to specify a question for me to respond to.`
        );
      message.delete({ timeout: 5000 });
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    } else {
      //Tells the bot what it can respond with
      let responses = [
        "✅ Yes ✅",
        "Absoloutely",
        "❌ No ❌",
        "Not in a million years",
        "¿Who knows?",
        `No idea 😄`,
      ];
      //Picks a response to send
      let response = responses[Math.floor(Math.random() * responses.length)];
      //Deletes the command message
      message.delete({ timeout: 50000 });
      //Sends the question and response in an embed
      let qanda = new MessageEmbed()
        .setAuthor("MoonSnail Fortune Teller:", client.user.avatarURL())
        .setDescription(`Your question: ${question} \nMy answer: ${response}`)
        .setColor(process.env.GENERAL_COLOR);
      message.channel.send(qanda).then((msg) => {
        msg.delete({ timeout: 50000 });
      });
    }
  },
};
