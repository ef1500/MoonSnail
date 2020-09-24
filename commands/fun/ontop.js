//Imports requirements
var center = require("center-align");

module.exports = {
  name: "ontop",
  category: "fun",
  description: "MoonSnail on top",
  run: async (client, message) => {
    //Logs activity
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    //Deletes the command message
    message.delete();
    //Sends the response and deletes it after 1000ms
    message.channel
      .send(
        center(`pog
╭━┳━╮╱╱╱╱╱╱╭━━╮╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╭╮
┃┃┃┃┣━┳━┳━┳┫━━╋━┳┳━╮┣╋╮╱╭━┳━┳╮┃╰┳━┳━╮
┃┃┃┃┃╋┃╋┃┃┃┣━━┃┃┃┃╋╰┫┃╰╮┃╋┃┃┃┃┃╭┫╋┃╋┃
╰┻━┻┻━┻━┻┻━┻━━┻┻━┻━━┻┻━╯╰━┻┻━╯╰━┻━┫╭╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╯
      `)
      )
      .then((msg) => {
        msg.delete({ timeout: 1000 });
      });
  },
};
