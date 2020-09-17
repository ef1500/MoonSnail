const mongoose = require("mongoose");
const Guild = require("../models/guild");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  let settings = await Guild.findOne(
    {
      guildID: message.guild.id,
    },
    (err, guild) => {
      if (err) console.error(err);
      if (!guild) {
        const settings = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildName: message.guild.name,
          guildID: message.guild.id,
          prefix: process.env.PREFIX,
          color: process.env.COLOR,
          autoRole: "null",
          joinMessage: "null",
          leaveMessage: "null",
        });

        settings.save().catch((err) => console.error(err));
      }
    }
  );

  const prefix = settings.prefix;

  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (command) command.run(client, message, args);
};
