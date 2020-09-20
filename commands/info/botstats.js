const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { version } = require("discord.js");

module.exports = {
  name: "botstats",
  usage: "botstats",
  category: "info",
  description: "Get the current stats of the bot.",
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setAuthor("MoonSnail Stats", client.user.avatarURL())
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        `» Servers: \`${client.guilds.cache.size.toLocaleString()}\` \n` +
          `» Channels: \`${client.channels.cache.size.toLocaleString()}\` \n` +
          `» Users: \`${client.users.cache.size.toLocaleString()}\``
      );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
