const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const client = require('nekos.life');
const neko = new client();
 
module.exports = {
  name: "tickle",
  description: "gets a tickle image",
  aliases: [""],
  expectedArgs: "<user>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     
    let target = message.mentions.members.first()
    if(!target) return message.channel.send(`Please mention someone while using this command`);
    
    await neko.sfw.tickle().then((data) => {
    
    let embed = new MessageEmbed()
    .setImage(data.url)
    .setColor(config.embedcolor)
    .setTitle(`${message.author.username} tickles ${target.user.username}`)
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