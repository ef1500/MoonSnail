const weather = require("weather-js");
const Discord = require("discord.js");
const discord = require("discord.js");

module.exports = {
  name: "weather",
  description: "Get the weather of any location.",
  category: "info",
  usage: "weather {location}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (!args.length) {
      const badloc = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setAuthor(
          `Sorry, I couldn't find any information about that location.`
        );
      message.channel.send(badloc);
      return;
    }

    weather.find({ search: args.join(" "), degreeType: "C" }, function (
      err,
      result
    ) {
      try {
        let embed = new discord.MessageEmbed()
          .setTitle(`Weather - ${result[0].location.name}`)
          .setColor(process.env.GENERAL_COLOR)
          .addField("Temperature", `${result[0].current.temperature} °C`, true)
          .addField("Sky", result[0].current.skytext, true)
          .addField("Humidity", result[0].current.humidity, true)
          .addField("Wind Speed", result[0].current.windspeed, true)
          .addField("Time Observed", result[0].current.observationtime, true)
          .addField("Wind", result[0].current.winddisplay, true)
          .setThumbnail(result[0].current.imageUrl);
        message.channel.send(embed).then((msg) => {
          msg.delete({ timeout: 60000 });
        });
      } catch (err) {
        const badloc = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setAuthor(
            `Sorry, I couldn't find any information about that location.`
          );
        message.channel.send(badloc).then((msg) => {
          msg.delete({ timeout: 3000 });
        });
      }
    });
  },
};
