//Author: ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "snipe",
    category: "fun",
    description: "Pew pew pew",
    usage: `snipe {user}`,
    run: async (client, message, args) => {
        console.log(
            "ACTIVITY: " +
            message.author.username +
            " ran the command: " +
            message.content
        );
        message.delete();

        var outcomes = [
            "You Missed.",
            "Headshot",
            "Target Eliminated.",
            "Misfire.",
            "よくできました！",
            "Great Shot!",
            "Target Lost.",
            "Get better eyes",
            "You killed an innocent suvillian",
        ];
        const randOut = outcomes[Math.floor(Math.random() * outcomes.length)];
        const embed = new MessageEmbed()
            .setColor(process.env.GENERAL_COLOR)
            .setAuthor(`***Result:***`)
            .setDescription(randOut);

        message.channel.send(embed);
    },
};