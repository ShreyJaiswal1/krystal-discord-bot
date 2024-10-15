//importing
const { tictactoe } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "tictactoe",
  description: "starts a new tictactoe game",
  aliases: ["ttt"],
  expectedArgs: "<user>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     
new tictactoe({
    message: message,
    player_two: message.mentions.members.first() || message.guild.channels.cache.get(args[0]),
});
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