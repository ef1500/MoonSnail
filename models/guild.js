const { Schema, model } = require("mongoose");

const guildSettingSchema = new Schema({
  guildName: { type: String },
  guildID: { type: String },
  prefix: { type: String, default: "%" },
  autoRole: { type: String },
  joinMessage: { type: String },
  leaveMessage: { type: String },
  color: { type: String, default: "#00ff77" },
});

module.exports = model("guild_settings", guildSettingSchema);
