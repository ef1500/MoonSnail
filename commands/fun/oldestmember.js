//Imports requirements
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "oldestmember",
  category: "fun",
  description: "Get the oldest account creation date in the guild.",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    //Specifies which memebers it can choose and how to sort members in order to choose one
    let member = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      //Chooses the first one
      .first();
    //Defines all parts of the userinfo command
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);

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

    //Deletes the command message
    message.delete({ timeout: 50000 });
    //Sends info in an embed and deletes it after 50000ms
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
