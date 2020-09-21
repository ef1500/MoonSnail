//Imports requirements
const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");

module.exports = {
  name: "reddit",
  category: "fun",
  description: "Get an image from a subreddit.",
  usage: "reddit {subreddit}",
  run: async (message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Warns that the channel is not nsfw so cannot send
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
    //Sets the subreddit to search as any arguments after the prefix and command length
    let Subreddit = message.content.slice(settings.prefix.length + 7);
    //Warns that there was no vaild arguments provided
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
      //Fetches the image using the api
      let image = await api(Subreddit, true);
      //Sends the response in an embed and deletes it after 60000ms
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
      //Warns that the subreddit specified was not a valid subreddit or that there wa an error fetching the image
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
