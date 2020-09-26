const levels = require("../../models/profile");
const Discord = require("discord.js");

module.exports = {
  name: "profile",
  category: "general",
  description: "Shows the authors xp profile.",
  run: async (client, message, args) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    //Deletes the command message
    message.delete({ timeout: 50000 });
    //sets the user
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

    //Finds the server in the db
    const user = await levels.findOne({
      userId: member.id,
    });
    //Defines items to put in the embed
    let levelxp = user.level * user.level * 100;
    const level = new Discord.MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setAuthor(
        "Profile for " + member.user.tag,
        member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 512,
        })
      )
      .addField(`**Level:** `, "`" + user.level + "`")
      .addField(`**XP:** `, "`" + `${user.xp}/${levelxp}` + "`");
    message.channel.send(level).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
