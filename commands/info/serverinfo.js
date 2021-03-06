const { MessageEmbed } = require("discord.js");

const moment = require("moment");

const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "(╯°□°）╯︵ ┻━┻",
  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}

const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydney: "Sydney",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
};

module.exports = {
  name: "serverinfo",
  category: "info",
  description: "Displays information about the server.",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;

    const embed = new MessageEmbed()
      .setDescription(`**Server info: ${message.guild.name}**`)
      .setColor(process.env.GENERAL_COLOR)
      .setThumbnail(
        message.guild.iconURL({
          dynamic: true,
          format: "png",
          size: 512,
        })
      )
      .addField("General Info:", [
        `**» Name:** ${message.guild.name}`,
        `**» Owner:** <@${message.guild.owner.user.id}>`,
        `**» Region:** ${regions[message.guild.region]}`,
        `**» Boost Tier:** ${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
        }`,
        `**» Explicit Filter:** ${
          filterLevels[message.guild.explicitContentFilter]
        }`,
        `**» Verification Level:** ${
          verificationLevels[message.guild.verificationLevel]
        }`,
        `**» Time Created:** ${moment(message.guild.createdTimestamp).format(
          "LT"
        )} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(
          message.guild.createdTimestamp
        ).fromNow()}`,
        "\u200b",
      ])
      .addField("Stats:", [
        `**» Role Count:** ${roles.length}`,
        `**» Emoji Count:** ${emojis.size}`,
        `**» Regular Emoji Count:** ${
          emojis.filter((emoji) => !emoji.animated).size
        }`,
        `**» Animated Emoji Count:** ${
          emojis.filter((emoji) => emoji.animated).size
        }`,
        `**» Member Count:** ${message.guild.memberCount}`,
        `**» Humans:** ${members.filter((member) => !member.user.bot).size}`,
        `**» Bots:** ${members.filter((member) => member.user.bot).size}`,
        `**» Text Channels:** ${
          channels.filter((channel) => channel.type === "text").size
        }`,
        `**» Voice Channels:** ${
          channels.filter((channel) => channel.type === "voice").size
        }`,
        `**» Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
      ])
      .addField("Roles:", `${roles.join(" ")}`);
    message.delete({ timeout: 50000 });
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 50000 });
    });
  },
};
