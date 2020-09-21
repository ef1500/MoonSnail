//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "pog",
    category: "fun",
    description: "Pogchamp",
    usage: `pog`,
    run: async (client, message, args) => {
        console.log(
            "ACTIVITY: " +
            message.author.username +
            " ran the command: " +
            message.content
        );
        message.delete();
        message.channel
            .send(
                "https://pics.me.me/thumb_pogchamp-43297127.png"
            )
            .then((msg) => {
                msg.delete({ timeout: 60000 });
            });
    },
};
