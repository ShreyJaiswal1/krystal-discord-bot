const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Memer = require("random-jokes-api");

module.exports = {
  name: "pun",
  description: "gets a random pun text for you",
  aliases: [""],
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let pun = Memer.pun()
    message.channel.send(new MessageEmbed()
    .setTitle(`HERE IS YOUR PUN!!`)
    .setColor(config.embedcolor)
    .setDescription(pun))
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