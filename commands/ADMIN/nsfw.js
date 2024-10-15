const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require('quick.db')
module.exports = {
  name: "nsfw",
  description: "toggle nsfw commands in the server",
  aliases: [""],
  expectedArgs: "<enable / disable>",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`:x: You need \`ADMINISTRATOR\` to use this command!!`);
     if(!args[0]) return message.channel.send(`:x: Please try using \`${instance.getPrefix(message.guild)}nsfw enable/disable\``);
     if(args[0] === 'enable') {
         if(db.has(`nsfw_${message.guild.id}`)) {
            return message.channel.send(`NSFW commands are already enabled for this guild`);
         } else {
             db.set(`nsfw_${message.guild.id}`, true);
             message.channel.send(new MessageEmbed()
             .setTitle(`NSFW ENABLED!!`)
             .setColor(config.embedcolor)
             .setDescription(`NSFW commands are now **enabled** in this guild.`));
         }
     } else if(args[0] === 'disable') {
         if(!db.has(`nsfw_${message.guild.id}`)){
            return message.channel.send(`NSFW commands are already disabled for this guild`);
         } else {
             db.delete(`nsfw_${message.guild.id}`);
             message.channel.send(new MessageEmbed()
             .setTitle(`NSFW DISABLED!!`)
             .setColor(config.embedcolor)
             .setDescription(`NSFW commands are now **disabled** in this guild.`));
         }
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