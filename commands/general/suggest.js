const { replaceResultTransformer } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "suggest",
  usage: "suggest {message}",
  description:
    "Sends a suggestion as an embed, in a channel called <#suggestions>.",
  category: "general",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (!args.length) {
      const nosuggestion = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `${message.author}, please input a suggestion to send!`
        );
      message.delete();
      message.channel.send(nosuggestion).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }

    let channel = message.guild.channels.cache.find(
      (x) => x.name === "suggestion" || x.name === "suggestions"
    );

    if (!channel) {
      const nochannel = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(
          `There is no channel with the name "suggestion" or "suggestions". Please ask the admin to create one.`
        );
      message.delete();
      message.channel.send(nochannel).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }

    let embed = new MessageEmbed()
      .setAuthor(
        "SUGGESTION: " + message.author.username,
        message.author.avatarURL()
      )
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(args.join(" "));

    channel.send(embed).then((m) => {
      m.react("✅");
      m.react("❌");
    });
    const suggestionsent = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor("Thanks! I sent your suggestion to " + "#" + channel.name);
    message.delete();
    message.channel.send(suggestionsent).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
    return;
  },
};
