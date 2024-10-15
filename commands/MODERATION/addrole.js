const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "addrole",
   description: "Creates a role of the given name.",
   aliases: ["createrole"],
   category: "MODERATION",
   expectedArgs: "<role_name>",
   callback: async ({message, client, prefix, args}) => {
     try {
   if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**You Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**I Dont Have The Permissions To Add Roles To Users! - [MANAGE_ROLES]**");
        
        if (!args[0]) return message.channel.send("**Please enter role name to create!**");
      
    let Role = args.join(" ");
   
  message.guild.roles.create({
  data: {
    name: Role,
  },
  reason: `${message.author.tag} created a role`,
});
   
   let RoleEmbed = new MessageEmbed()
   .setTitle("ROLE CREATED SUCCESSFULLY!!")
   .setColor(config.embedcolor)
   .setDescription(`Role created as name **${Role}**`)
   .setFooter(config.footertext, config.footericon);
   
   message.channel.send(RoleEmbed);
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