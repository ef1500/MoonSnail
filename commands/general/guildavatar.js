const Discord = require("discord.js");

module.exports = {
  name: "guildavatar",
  category: "general",
  description: "Displays the guilds logo in an embed.",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage(
        message.guild.iconURL({ dynamic: true, format: "png", size: 512 })
      );
    message.channel.send(avatarEmbed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
