const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "muterole",
  description: "sets a muterole for the server",
  aliases: ["setmuterole"],
  expectedArgs: "<role>",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You need \`ADMINISTRATOR\` permissions to use this command.`);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!args)return message.channel.send(`Please provide a role name or id to setup`)
    if(!role)return message.channel.send(`You need to provide a valid role to add it to mutedrole`);
    db.set(`mute_${message.guild.id}`, role.id);
    message.channel.send(new MessageEmbed()
     .setColor(config.embedcolor)
     .setTitle(`SUCESSFULLY SET MUTED ROLE!!`)
     .setDescription(`Sucessfully set muted role as ${role.name}`)
     .setFooter(config.footertext, config.footericon))
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