const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const client = require('nekos.life');
const neko = new client();
 
module.exports = {
  name: "foxgirl",
  description: "gets a foxgirl image",
  aliases: [""],
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    await neko.sfw.foxGirl().then((data) => {
    
    let embed = new MessageEmbed()
    .setImage(data.url)
    .setColor(config.embedcolor)
    .setTitle(`Here is your foxgirl image`)
    .setTimestamp()
    message.channel.send(embed);
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