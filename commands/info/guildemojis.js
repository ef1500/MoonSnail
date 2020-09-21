const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildemojis",
  description: "View all emojis in the server.",
  category: "info",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}:`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Total [${OverallEmojis}]**`
      )
      .setColor(process.env.GENERAL_COLOR);
    message.channel.send(Embed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
