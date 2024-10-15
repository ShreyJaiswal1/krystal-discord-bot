const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Memer = require("random-jokes-api");

module.exports = {
  name: "roast",
  description: "gets a random roast text",
  aliases: [""],
  expectArgs: `[mention-user]`,
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let target = message.mentions.users.first();
   if(!target){
    let roast = Memer.roast()
    message.channel.send(new MessageEmbed()
    .setTitle(`YOU ROSTED YOURSELF xD`)
    .setColor(config.embedcolor)
    .setFooter(config.footertext, config.footericon)
    .setDescription(roast))
   } else if(target){
    let roast = Memer.roast()
    message.channel.send(new MessageEmbed()
    .setTitle(`YOU ROSTED ${target.tag}`)
    .setColor(config.embedcolor)
    .setFooter(config.footertext, config.footericon)
    .setDescription(roast))
   }
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