const { MessageEmbed } = require("discord.js");
const { resolveInclude } = require("ejs");
const profileSchema = require("../models/profile");

module.exports = (client, member) => {
  client.on("message", async (message) => {
    if (message.channel.type === "dm") {
      return;
    }
    const { guild } = message;
    const member = message.author;
    if (member.bot) {
      return;
    }
    addXP(guild.id, member.id, 23, message);
  });
};

const getNeededXP = (level) => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
  try {
    const result = await profileSchema.findOneAndUpdate(
      {
        username: message.author.tag,
        guildName: message.guild.name,
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          xp: xpToAdd,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    let { xp, level } = result;
    const needed = getNeededXP(level);
    if (xp >= needed) {
      ++level;
      xp -= needed;
      const embed = new MessageEmbed()
        .setColor(process.env.GENERAL_COLOR)
        .setDescription(
          `Poggers <@${
            result.userId
          }>, you are now level ${level}! You need ${getNeededXP(
            level
          )} XP to level up again.`
        );
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 20000 });
      });
      await profileSchema.updateOne(
        {
          guildId,
          userId,
        },
        {
          level,
          xp,
        }
      );
    }
  } finally {
  }
};

module.exports.addXP = addXP;
