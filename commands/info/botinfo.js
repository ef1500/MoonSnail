const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "botinfo",
  usage: "botinfo",
  category: "info",
  description: "Get current info of the bot.",
  run: async (message, args, level) => {
    const duration = moment
      .duration(this.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new MessageEmbed()
      .setTitle(`**Bot Stats**`)
      .setColor(process.env.GENERAL_COLOR)
      .addField(
        `• Memory Usage: ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)} mb`
      )
      .addField(`• Uptime: ${duration}`)
      .addField(`• Users: ${this.client.users.cache.size.toLocaleString()}`)
      .addField(`• Servers: ${this.client.guilds.cache.size.toLocaleString()}`)
      .addField(
        `• Channels: ${this.client.channels.cache.size.toLocaleString()}`
      )
      .addField(`• Discord.js: v${version}`)
      .addField(`• Node: ${process.version}`, { code: "asciidoc" });
    message.channel.send(embed);
  },
};
