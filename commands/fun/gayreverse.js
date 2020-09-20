//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "reversegay",
    category: "fun",
    description: "Uno reverse but for weebs.",
    usage: `reversegay`,
    run: async (client, message, args) => {
        console.log(
            "ACTIVITY: " +
            message.author.username +
            " ran the command: " +
            message.content
        );
        message.delete();
        message.channel.send(
            "https://64.media.tumblr.com/aab218159b28cd130d95e3cb5fa1da5c/tumblr_pshl5wq4zO1vxgjheo1_500.png"
        );
    },
};