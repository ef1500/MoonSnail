const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Discord = require("discord.js");

module.exports = {
  name: "commands",
  category: "info",
  description: "dm's you a full list of bot commands.",
  run: async (client, message) => {
    console.log(
      "ACTIVITY: " +
        message.member.user.tag +
        " ran the command: " +
        message.content
    );
    return getAll(client, message);
  },
};

function getAll(client, message) {
  const embed = new MessageEmbed()
    .setColor(process.env.GENERAL_COLOR)
    .setAuthor("MoonSnail Commands", client.user.avatarURL());

  const commands = (category) => {
    return client.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => `- \`${cmd.name}\``)
      .join(" \n ");
  };

  const info = client.categories
    .map(
      (cat) =>
        stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}:** \n ${commands(
          cat
        )}`
    )
    .reduce((string, category) => `${string}\ \n ${category}`);

  message.author.send(
    embed.setDescription(
      "Use `" +
        `help {command}\` to see more information about a specific command. \n \n ${info}`
    )
  );
  console.log;
  message.delete();
  const dmsent = new Discord.MessageEmbed()
    .setColor(process.env.SUCCESS_COLOR)
    .setDescription(
      `<@${message.author.id}>` + `, I just sent you a list of all my commands!`
    );
  message.channel.send(dmsent).then((msg) => {
    msg.delete({ timeout: 5000 });
  });
}
