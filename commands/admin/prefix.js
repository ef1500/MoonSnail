//Import requirements
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const Discord = require("discord.js");

module.exports = {
  name: "prefix",
  category: "admin",
  description: "Displays the prefix for the server or changes it.",
  usage: `prefix *or* prefix {any string}`,
  run: async (client, message, args) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    //Gets guild info from the database or use the schema to make new data
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    //Tells user what server prefix is and how to change
    if (args.length < 1) {
      const prefixis = new Discord.MessageEmbed()
        .setColor(process.env.GENERAL_COLOR)
        .addField(
          `The current server prefix is: \`${settings.prefix}\``,
          `To change this, do the command: \`${settings.prefix}prefix {new prefix}\``
        );
      message.channel.send(prefixis);
      return;
    }
    if (message.member.hasPermission("ADMINISTRATOR")) {
      //Updates prefix
      await settings.updateOne({
        prefix: args[0],
      });
      //Sends confirmation of change
      const prefixchange = new Discord.MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .addField(
          `This server's prefix has been changed to: \`${args[0]}\``,
          `To change this, do the command: \`${args[0]}prefix {new prefix}\``
        );
      message.channel.send(prefixchange);
      return;
    } else {
      //Tells the user that they dont have permissions to do the command and auto deletes both messages
      message.delete({ timeout: 5000 });
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry ` +
            `<@${message.author.id}>` +
            `, you don't have the required permissions to change the server prefix.`
        );
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
  },
};
