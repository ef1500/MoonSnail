const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  guildName: reqString,
  username: reqString,
  xp: {
    type: Number,
    default: 0,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
    required: true,
  },
});

module.exports = mongoose.model("profiles", profileSchema);
