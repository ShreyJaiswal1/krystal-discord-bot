const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  description: "sets a welcome channel",
  aliases: ["greet"],
  expectedArgs: "<text/image/greet/embed> <channel>",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     // if author dont have admin perms
     if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You dont have \`ADMINISTRATOR\` permissions to use this command.`);
     // if null args
     if(!args[0])return message.channel.send(`Please specify a valid type and channel. Valid types \`image/text/greet\`\n\`Ex. ${instance.getPrefix(message.guild)}setwelcome text #general\``);
     // if null channel
     let target = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channnel;

     // setting up welcome [text]
     if(args[0] === 'text') {
     if(db.has(`wel_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
     db.set(`wel_${message.guild.id}`, target.id);
     message.channel.send(new MessageEmbed()
     .setColor(config.embedcolor)
     .setTitle(`SUCESSFULLY SET WELCOME CHANNEL!!`)
     .setDescription(`Sucessfully set welcome channel (text only) as ${target.name}`)
     .setFooter(config.footertext, config.footericon))
     }
     // setting up welcome [greet]
     if(args[0] === 'greet') {
     if(db.has(`wel_g_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
     db.set(`wel_g_${message.guild.id}`, target.id);
      message.channel.send(new MessageEmbed()
      .setColor(config.embedcolor)
       .setTitle(`SUCESSFULLY SET WELCOME CHANNEL!!`)
       .setDescription(`Sucessfully set welcome channel (greet only) as ${target.name}`)
       .setFooter(config.footertext, config.footericon))
      }
    // setting up welcome [embed]
     if(args[0] === 'embed') {
      if(db.has(`wel_e_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
      db.set(`wel_e_${message.guild.id}`, target.id);
      message.channel.send(new MessageEmbed()
      .setColor(config.embedcolor)
      .setTitle(`SUCESSFULLY SET WELCOME CHANNEL!!`)
      .setDescription(`Sucessfully set welcome channel (embed only) as ${target.name}`)
      .setFooter(config.footertext, config.footericon))
      }

     // setting up welcome [image]
     if(args[0] === 'image') {
      if(db.has(`wel_img_${message.guild.id}`, target.id))return message.channel.send(`This channel has already welcome enabled`);
       db.set(`wel_img_${message.guild.id}`, target.id);
    message.channel.send(new MessageEmbed()
   .setColor(config.embedcolor)
    .setTitle(`SUCESSFULLY SET WELCOME CHANNEL!!`)
    .setDescription(`Sucessfully set welcome channel (image only) as ${target.name}`)
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