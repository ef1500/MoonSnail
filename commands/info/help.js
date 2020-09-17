const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  description: "Displays bot help message.",
  usage: `help *or* help {commandname}`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();
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
    .setTitle("Help")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `For a full list of commands, please type \`${process.env.PREFIX}commands\` \n\nTo see more info about a specific command, please type \`${process.env.PREFIX}help <command>\` without the \`<>\``
    )
    .addField(
      "About",
      "This bot is my first Discord.js bot and its still in early development so please report any issues to me through discord or the github!"
    )
    .addField(
      "Requirements",
      'By default the bot is given admin permissions but in order to get the full functionality of MoonSnail please move the role to the top of the role list or give it another role that is higher that members, e.g "bots".'
    )
    .addField(
      "Links",
      "[MoonSnail Discord Server](https://discord.com/invite/Pta3APY/)\n[Github](https://github.com/seasnail8169/MoonSnail/)\n[Website](https://snailcorp.xyz) (coming soon!!)"
    )
    .setFooter("Created by seasnail8169", "https://i.ibb.co/DtzjWZf/pfp.png");
  message.author.send(embed);
  const dmsent = new Discord.MessageEmbed()
    .setColor(process.env.SUCCESS_COLOR)
    .setAuthor(`Sent some useful info to your DM's!`);
  message.channel.send(dmsent).then((msg) => {
    msg.delete({ timeout: 3000 });
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

  if (cmd.name) info = `**Command Name**: ${cmd.name}`;
  if (cmd.description) info += `\n**Description**: ${cmd.description}`;
  if (cmd.usage) {
    info += `\n**Usage**: ${cmd.usage}`;
  }
  if (cmd.usage2) info += `\n**Usage 2**: ${cmd.usage2}`;
  message.delete();

  return message.channel.send(
    embed.setColor(process.env.GENERAL_COLOR).setDescription(info)
  );
}
