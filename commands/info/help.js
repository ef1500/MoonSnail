const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  description:
    "Helps you to get started using the bot and provides info about each command.",
  usage: `help *or* help {command}`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      return helpMSG(client, message);
    }
  },
};
function helpMSG(client, message) {
  const embed = new MessageEmbed()
    .setColor(process.env.GENERAL_COLOR)
    .setAuthor("MoonSnail Help", client.user.avatarURL())
    .setDescription(
      `By default the prefix is \`%\` but this may have changed so check with your server admin if you are unsure. For a full list of commands, use the \`commands\` command. \nTo see more info about a specific command, please type \`help {command}\` \n If you are having issues with the bot or just want to talk about it or suggest features feel free to check out [MoonSnail Development](https://discord.gg/Pta3APY) on discord.`
    );
  message.delete();

  message.author.send(embed);
  const dmsent = new Discord.MessageEmbed()
    .setColor(process.env.SUCCESS_COLOR)
    .setDescription(
      `<@${message.author.id}>` + `, I just sent some useful info to your dm's!`
    );
  message.channel.send(dmsent).then((msg) => {
    msg.delete({ timeout: 5000 });
  });
}

function getCMD(client, message, input) {
  const embed = new MessageEmbed();

  const cmd = client.commands.get(input.toLowerCase());

  let info = `No information found for command **${input.toLowerCase()}**`;

  if (!cmd) {
    return message.channel.send(
      embed.setColor(process.env.GENERAL_COLOR).setDescription(info)
    );
  }

  if (cmd.name) info = `**Command Name**: \`${cmd.name}\``;
  if (cmd.description) info += `\n**Description**: \`${cmd.description}\``;
  if (cmd.usage) {
    info += `\n**Usage**: \`${cmd.usage}\``;
  }
  return message.channel
    .send(embed.setColor(process.env.GENERAL_COLOR).setDescription(info))
    .then((msg) => {
      msg.delete({ timeout: 50000 });
    });
}
