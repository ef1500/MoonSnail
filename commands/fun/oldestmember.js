//Imports requirements
const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "oldestmember",
  category: "fun",
  description: "Get the oldest account creation date in the guild.",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Specifies which memebers it can choose and how to sort members in order to choose one
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      //Chooses the top one
      .first();
    //Sends it in an embed and deletes it after 30000ms
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
