//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "ez",
    category: "fun",
    description: "GG EZ",
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
                "https://i.imgur.com/vBgfzFL.png"
            )
            .then((msg) => {
                msg.delete({ timeout: 10000 });
            });
    },
};
