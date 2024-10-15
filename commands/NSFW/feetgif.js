const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const client = require('nekos.life');
const neko = new client();
const db = require('quick.db');

module.exports = {
  name: "feetgif",
  description: "gets a feet gif",
  aliases: [""],
  category: "NSFW",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(db.has(`nsfw_${message.guild.id}`)){
       if(!message.channel.nsfw) return message.channel.send(`:x: Please use NSFW commands in a NSFW (18+) channel`)
    await neko.nsfw.feetGif().then((data) => {
    
    let embed = new MessageEmbed()
    .setImage(data.url)
    .setColor(config.embedcolor)
    .setTitle(`Mhmmm... so sexy ;)`)
    .setTimestamp()
    message.channel.send(embed);
    });
  } else {
    message.channel.send(`NSFW commands are disabled in this guild!!`)
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