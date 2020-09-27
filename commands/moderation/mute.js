const Discord = require("discord.js");
const Guild = require("../../models/guild");
const ms = require("ms");

module.exports = {
  name: "mute",
  category: "moderation",
  description: "Mutes a user for an indefinite amount of time.",
  usage: "mute {user}",
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
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first());
    if (!tomute) {
      const nomember = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Please mention a valid user.`);
      message.delete();
      message.channel.send(nomember).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    if (tomute.hasPermission("ADMINISTRATOR")) {
      const cantmute = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't mute that member.`);
      message.delete();
      message.channel.send(cantmute).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
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
            color: "#ffff",
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
      });
    });
    await tomute.roles.add(muterole);
    const muted = new Discord.MessageEmbed()
      .setColor(process.env.SUCCESS_COLOR)
      .setDescription(`<@${tomute.id}>` + " has been successfully muted!")
      .addField(`Reason:`);

    message.channel.send(muted);
  },
};
