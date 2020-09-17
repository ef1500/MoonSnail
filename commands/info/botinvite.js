const Discord = require("discord.js");

module.exports = {
  name: "botinvite",
  category: "info",
  description: "DM's author an invite for the bot.",
  usage: `botinvite`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    let invite =
      "https://discord.com/oauth2/authorize?client_id=750674353758142555&permissions=8&scope=bot";
    message.author.send(invite);
    const dmsent = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor(`Sent the bot invite to your DM's!`);
    message.channel.send(dmsent).then((msg) => {
      msg.delete({ timeout: 3000 });
    });
  },
};
