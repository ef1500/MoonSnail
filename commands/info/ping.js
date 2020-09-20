const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns bot and API latency in milliseconds.",
  usage: `ping`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const msg = await message.channel.send("Pinging...");
    message.delete();

    const embed = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        `Bot ping is **${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )} ms** \nAPI ping is **${Math.round(client.ws.ping)} ms**`
      );
    message.channel.send(embed);
  },
};
