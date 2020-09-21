const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
  name: "8ball",
  description: "8ball pog.",
  category: "fun",
  usage: "8ball {question}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    let question = message.content.slice(settings.prefix.length + 6);
    if (!question) return message.channel.send(`pogger not`);
    else {
      let responses = [
        "Yes",
        "No",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setAuthor("MoonSnail Fortune Teller:", client.user.avatarURL())
        .setDescription(`Your question: ${question}\nMy reply: ${response}`)
        .setColor(process.env.GENERAL_COLOR);
      message.channel.send(Embed);
    }
  },
};
