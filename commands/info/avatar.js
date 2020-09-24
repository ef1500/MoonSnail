const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "info",
  description: "Displays the mentioned users profile picture in an embed.",
  usage: "avatar (self) *or* avatar {user}",
  run: async (client, message, args) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Sets the user as the first mention or if there is no mention, the author
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
    if (!user) {
      const nouser = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Sorry, I couldn't find that user.`);
      message.delete();
      message.channel.send(nouser).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    console.log(user);
    console.log(args[0]);
    message.channel.send(user.tag);
  },
};
/*
const avatarEmbed = new Discord.MessageEmbed()
.setColor(process.env.GENERAL_COLOR)
//.setAuthor(user.username + "'s Profile Picture:")
.setImage(
  user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
);
message.channel.send(avatarEmbed).then((msg) => {
msg.delete({ timeout: 30000 });
});

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
