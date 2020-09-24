const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  usage: "userinfo (self) or userinfo {user}",
  category: "info",
  description: "Get info of mentioned user or yourself.",

  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(userArgs[0]) ||
      message.guild.members.cache.find(
        (x) =>
          x.user.username.toLowerCase() === userArgs.slice(0).join(" ") ||
          x.user.username === userArgs[0]
      ) ||
      message.member;

    if (member.presence.status === "dnd")
      member.presence.status = "Do Not Disturb";
    if (member.presence.status === "online") member.presence.status = "Online";
    if (member.presence.status === "idle") member.presence.status = "Idle";
    if (member.presence.status === "offline")
      member.presence.status = "offline";

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment
      .utc(member.joinedAt)
      .format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

    const profile = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setColor(process.env.GENERAL_COLOR)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Profile:**", ` <@${member.id}>`)
      .addField("**Roles:**", `<@&${member._roles.join("> <@&")}>`)
      .addField(
        "**Account Created On:**",
        `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`,
        true
      )
      .addField(
        "**Joined the server on:**",
        `${joineddate} \n» ${joined} day(s) ago`
      )
      .addField("**Status:**", status);
    message.channel.send(profile).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
