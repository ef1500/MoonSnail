const Discord = require("discord.js");

module.exports = {
  name: "serverinvite",
  category: "info",
  description: "dm's you am invite to the bots development server.",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    message.delete({ timeout: 5000 });
    let invite = "https://discord.gg/Pta3APY";
    message.author.send(invite);
    const dmsent = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setDescription(
        `<@${message.author.id}>` +
          `, I just sent you an invite to the bots development server.`
      );
    message.channel.send(dmsent).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
