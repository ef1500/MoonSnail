const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botstats",
  category: "info",
  description: "Get the current stats of the bot.",
  run: async (client, message) => {
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    const embed = new MessageEmbed()
      .setAuthor("MoonSnail Stats", client.user.avatarURL())
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        `» Servers: \`${client.guilds.cache.size.toLocaleString()}\` \n` +
          `» Channels: \`${client.channels.cache.size.toLocaleString()}\` \n` +
          `» Users: \`${client.users.cache.size.toLocaleString()}\``
      );
    message.delete({ timeout: 50000 });
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
