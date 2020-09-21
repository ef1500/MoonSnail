//Import requirements
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const Discord = require("discord.js");

module.exports = {
  name: "prefix",
  category: "admin",
  description: "Sets the prefix for the server.",
  usage: `prefix {any string}`,
  run: async (message, args) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user +
        " ran the command: " +
        message.content
    );
    //Gets guild info from the database or use the schema to make new data
    const settings = await Guild.findOne(
      {
        guildID: message.guild.id,
      },
      (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildName: message.guild.name,
            guildID: message.guild.id,
            prefix: process.env.PREFIX,
            color: process.env.COLOR,
            muterole: "Muted",
            autoRole: "placeholder",
            joinMessage: "placeholder",
            leaveMessage: "placeholder",
          });
          //Saves info to database
          newGuild.save().catch((err) => console.error(err));
        }
      }
    );
    //Warns that the user does not have permissions
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    //Warns that there was no prefix specified
    if (args.length < 1) {
      message.delete();
      const noprefix = new Discord.MessageEmbed()
        .setColor(process.env.GENERAL_COLOR)
        .setAuthor(
          `You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``
        );
      message.channel.send(noprefix).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    //Updates prefix
    await settings.updateOne({
      prefix: args[0],
    });
    //Sends confirmation of change
    const prefixchange = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor(`Your server prefix has been updated to \`${args[0]}\``);
    message.channel.send(prefixchange);
    return;
  },
};
