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
        message.author.username +
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
        .setAuthor(`You need to specify a question for me to reply to.`);
      message.delete();
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    } else {
      //Tells the bot what it can respond with
      let responses = [
        "Yes",
        "No",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
      ];
      //Picks a response to send
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      //Sends the question and response in an embed
      let Embed = new MessageEmbed()
        .setAuthor("MoonSnail Fortune Teller:", client.user.avatarURL())
        .setDescription(`Your question: ${question}\nMy reply: ${response}`)
        .setColor(process.env.GENERAL_COLOR);
      message.channel.send(Embed);
    }
  },
};
