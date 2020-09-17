const mongoose = require("mongoose");
const Guild = require("../models/guild");
const Discord = require("discord.js");

module.exports = async (client, guild) => {
  guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildName: guild.name,
    guildID: guild.id,
    prefix: process.env.PREFIX,
    color: process.env.COLOR,
    muterole: "Muted",
    autoRole: "null",
    joinMessage: "null",
    leaveMessage: "null",
  });

  guild
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
};
