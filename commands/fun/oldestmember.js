const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "oldestmember",
  category: "fun",
  description: "Get the oldest account creation date in the guild.",
  run: async (bot, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setAuthor(mem.user.tag, mem.user.avatarURL())
      .setColor(process.env.GENERAL_COLOR)
      .setDescription(
        `Account creation date: ${formatDate(mem.user.createdAt)}`
      );
    message.channel.send(Embed).then((msg) => {
      msg.delete({ timeout: 30000 });
    });
  },
};
