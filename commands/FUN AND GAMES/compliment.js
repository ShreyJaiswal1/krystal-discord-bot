const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Memer = require("random-jokes-api");

module.exports = {
  name: "complement",
  description: "gets a random compliment for you",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let COMPLIMENT = Memer.copmliment();
    message.channel.send(new MessageEmbed()
    .setTitle(`HERE IS YOUR COMPLIMENT!!`)
    .setColor(config.embedcolor)
    .setDescription(COMPLIMENT));
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