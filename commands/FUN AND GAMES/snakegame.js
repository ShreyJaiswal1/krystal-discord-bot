const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const SnakeGame = require('snakecord');
const snakeGame = new SnakeGame({
        title: 'Snake Game',
        color: config.embedcolor,
        timestamp: true,
        gameOverTitle: "Game Over"
});
    
module.exports = {
  name: "snakegame",
  description: "starts a snake game",
  aliases: ["snake"],
  expectedArgs: "",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     snakeGame.newGame(message);
} catch(error) {
  
  console.log(error);
  
  message.channel.send({embed: {
    title: ":x: | ERROR",
    description: "An error occurred while executing this command",
    color: config.wrongcolor,
    footer: {
      text: config.footertext,
      icon_url: config.footericon
    }
  }});
}
  }
};
/**
 * @INFO
 BOT CODED BY SHREY#5420 
 PLEASE MENTION HIM WHILE USING THIS CODE
 PLEASE DONT MISUSE CODE FOR RESELLING OR GIVEAWAY
 * @INFO
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/