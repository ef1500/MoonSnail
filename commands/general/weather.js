const weather = require("weather-js");
const Discord = require("discord.js");

module.exports = {
  name: "weather",
  description: "Get the weather of any location.",
  category: "general",
  usage: "weather {location}",
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );

    if (!args.length) {
      const noloc = new Discord.MessageEmbed()
        .setColor(process.env.FAIL_COLOR)
        .setDescription(
          `Sorry ${message.author}, you need to input a location for me to search for.`
        );
      message.channel.send(noloc);
      return;
    }

    weather.find({ search: args.join(" "), degreeType: "C" }, function (
      err,
      result
    ) {
      try {
        let embed = new Discord.MessageEmbed()
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
          msg.delete({ timeout: 50000 });
        });
      } catch (err) {
        message.delete({ timeout: 5000 });
        const badloc = new Discord.MessageEmbed()
          .setColor(process.env.FAIL_COLOR)
          .setDescription(
            `Sorry ${message.author}, I couldn't find any information about that location.`
          );
        message.channel.send(badloc).then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      }
    });
  },
};
