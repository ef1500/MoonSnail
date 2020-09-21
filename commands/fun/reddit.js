const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
module.exports = {
  name: "reddit",
  category: "fun",
  description: "Get an image from a subreddit.",
  usage: "reddit {subreddit}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.channel.nsfw) {
      const embed = new MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`This command can only be used in nsfw channels!`);
      message.delete();
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    let Subreddit = message.content.slice(8);
    if (!Subreddit) {
      const noreddit = new MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`You did not specify your subreddit!`);
      message.delete();
      message.channel.send(noreddit).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    try {
      let image = await api(Subreddit, true);
      const Embed = new MessageEmbed()
        .setAuthor("A random image from:")
        .setTitle(`r/${Subreddit}`)
        .setURL(`https://reddit.com/r/${Subreddit}`)
        .setColor(process.env.GENERAL_COLOR)
        .setImage(image);
      message.delete();
      message.channel.send(Embed).then((msg) => {
        msg.delete({ timeout: 60000 });
      });
    } catch {
      const badreddit = new MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(`Could not get info from that subreddit!`);
      message.delete();
      message.channel.send(badreddit).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
  },
};
