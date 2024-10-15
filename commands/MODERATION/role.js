const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "role",
   description: "Gives a role to the specified user",
   aliases: ["giverole"],
   category: "MODERATION",
   permission: ["MANAGE_ROLES"],
   expectedArgs: "<user> <role_id>",
   callback: async ({message, client, prefix, args}) => {
     try {
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**I dont have \`MANAGE_ROLES\` permission to use this command**");
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
  
  if(!user){
    message.channel.send("**Please mention a user**");
  }
  if(!role){
    message.channel.send("**Please mention a role to give**");
  }
  
  user.roles.add(role);
  let embed = new MessageEmbed()
  .setTitle("ROLE GIVEN!!")
  .setColor(config.embedcolor)
  .setFooter(config.footertext, config.footericon)
  .setDescription(`Given role ${role} to ${user}`);
       message.channel.send(embed);
       
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