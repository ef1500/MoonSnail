const Discord = require("discord.js");

module.exports = {
  name: "purge",
  category: "moderation",
  description:
    "Deletes all messages in the current channel (Limited to 500 messages to prevent api abuse).",
  usage: "purge",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const noperms = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor("Sorry, you don't have the required permissions.");
      message.delete();
      message.channel.send(noperms).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
      return;
    }
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      async function clear() {
        message.delete();
        let fetched = await message.channel.messages.fetch({ limit: 99 });
        message.channel.bulkDelete(fetched);
        let fetched2 = await message.channel.messages.fetch({ limit: 99 });
        message.channel.bulkDelete(fetched2);
        let fetched3 = await message.channel.messages.fetch({ limit: 99 });
        message.channel.bulkDelete(fetched3);
        let fetched4 = await message.channel.messages.fetch({ limit: 99 });
        message.channel.bulkDelete(fetched4);
        let fetched5 = await message.channel.messages.fetch({ limit: 99 });
        message.channel.bulkDelete(fetched5);
        let fetched6 = await message.channel.messages.fetch({ limit: 5 });
        message.channel.bulkDelete(fetched6);
      }
      clear();
    }
  },
};
