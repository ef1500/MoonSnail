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
    let user =
      message.mentions.users.first() || //guildmember
      (await client.users.fetch(args[0]));

    if (!user) {
      message.channel.send("mention someone cunt");
    }
    console.log(args[0]);
    console.log(user);
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
