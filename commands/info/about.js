const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "about",
  category: "info",
  description: "Dm's a user some information about the bot.",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
    const about = new MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setAuthor("About MoonSnail", client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())

      .setDescription(
        "This bot is my first Discord.js bot and its still in early development so please report any issues to me through discord or the github."
      )
      .addFields(
        {
          name: "Requirements:",
          value:
            "By default the bot is given admin permissions but in order to get the full functionality of MoonSnail please move the role to the top of the role list or give it another role that is higher that members, e.g 'bots'.",
          inline: true,
        },
        {
          name: "Some useful links:",
          value:
            "[MoonSnail on Discord](https://discord.gg/Pta3APY)\n[MoonSnail on Github](https://github.com/seasnail8169/MoonSnail/)\n[The SnailCorp™️ Website](https://snailcorp.xyz) (coming soon!!)",
          inline: true,
        }
      );
    message.author.send(about);
    const dmsent = new MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setDescription(
        `<@${message.author.id}>` +
          `, I just sent some useful info to your dm's!`
      );
    message.channel.send(dmsent).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
