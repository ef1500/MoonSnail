const profileSchema = require("../models/profile");

module.exports = (client) => {
  client.on("message", (message) => {
    const { guild, member } = message;

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
      message.reply(
        `Poggers, you are now level ${level}! You need ${getNeededXP(
          level
        )} XP to level up again.`
      );
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
