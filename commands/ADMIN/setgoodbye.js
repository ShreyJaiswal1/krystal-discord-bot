const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "setgoodbye",
  description: "sets a welcome channel",
  aliases: ["setleave", "leavechannel"],
  expectedArgs: "<text/image> <channel>",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     // if author dont have admin perms
     if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You dont have \`ADMINISTRATOR\` permissions to use this command.`);
     // if null args
     if(!args[0])return message.channel.send(`Please specify a valid type and channel\n\`Ex. ${instance.getPrefix(message.guild)}setwelcome text #general\``);
     // if null channel
     let target = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channnel;

     // setting up welcome [text]
     if(args[0] === 'text') {
     if(db.has(`bye_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
     db.set(`bye_${message.guild.id}`, target.id);
     message.channel.send(new MessageEmbed()
     .setColor(config.embedcolor)
     .setTitle(`SUCESSFULLY SET GOODBYE CHANNEL!!`)
     .setDescription(`Sucessfully set goodbye channel (text only) as ${target.name}`)
     .setFooter(config.footertext, config.footericon))
     }

     // setting up welcome [image]
     if(args[0] === 'image') {
      if(db.has(`bye_img_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
       db.set(`bye_img_${message.guild.id}`, target.id);
    message.channel.send(new MessageEmbed()
   .setColor(config.embedcolor)
    .setTitle(`SUCESSFULLY SET GOODBYE CHANNEL!!`)
    .setDescription(`Sucessfully set goodbye channel (image only) as ${target.name}`)
    .setFooter(config.footertext, config.footericon))
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
 LI
 SENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/