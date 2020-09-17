const Discord = require("discord.js");
const Guild = require("../../models/guild");
const ms = require("ms");

module.exports = {
  name: "tempmute",
  category: "moderation",
  description: "Mutes a user for a specified amount of time.",
  usage: "tempmute {user} {time `s, m, h, d`}",
  run: async (client, message, args, member) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first());
    if (!tomute) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.channel.send(nomember);
      return;
    }
    if (tomute.hasPermission("MANAGE_MESSAGES")) {
      const cantmute = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't mute that member.`);
      message.channel.send(cantmute);
      return;
    }
    let muterole = message.guild.roles.cache.find((x) => x.name == "Muted");
    if (!muterole) {
      try {
        message.guild.roles.create({
          data: {
            name: "Muted",
            hoist: false,
            mentionable: false,
            color: "#000000",
            permissions: [],
          },
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.createOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        SEND_TTS_MESSAGES: false,
        ATTACH_FILES: false,
        SPEAK: false,
        COLOR: "#c90808",
      });
    });

    let mutetime = args[1];
    if (!mutetime) {
      const cantmute = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Please specify a period of time to mute that member for.`);
      message.delete();
      message.channel.send(cantmute).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }

    await tomute.roles.add(muterole);
    const muted = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setAuthor(
        tomute.user.username +
          ` has been successfully muted for ${ms(ms(mutetime))}!`
      );
    message.channel.send(muted);

    setTimeout(function () {
      tomute.roles.remove(muterole);
      const muted = new Discord.MessageEmbed()
        .setColor(process.env.GENERAL_COLOR)
        .setAuthor(
          tomute.user.username + ` has been unmuted after ${ms(ms(mutetime))}!`
        );
      message.channel.send(muted);
    }, ms(mutetime));
  },
};
