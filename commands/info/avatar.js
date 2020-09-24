const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "info",
  description: "Displays the mentioned users profile picture in an embed.",
  usage: "avatar (self) *or* avatar {user} (id or mention)",
  run: async (client, message, args) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Sets the user
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
      message.member; //guildmember
    if (!member) {
      const nouser = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that member.`);
      message.delete();
      message.channel.send(nouser).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    console.log(member);
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(process.env.GENERAL_COLOR)
      .setImage(
        member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 512,
        }) ||
          member.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 512,
          })
      );
    message.delete({ timeout: 50000 });

    message.channel.send(avatarEmbed).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
/*


message.delete();
const nouser = new Discord.MessageEmbed()
  .setColor(process.env.FAIL_COLOR)
  .setAuthor(`Sorry, I couldn't find that user.`);
message.delete();
message.channel.send(nouser).then((msg) => {
  msg.delete({ timeout: 3000 });
});
return;
*/
