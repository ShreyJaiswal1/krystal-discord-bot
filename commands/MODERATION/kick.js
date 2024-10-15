const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "kick",
   description: "Kicks the mentioned user",
   cooldown: "10s",
   aliases: [""],
   category: "MODERATION",
   expectedArgs: "<user_mention> [reason]",
   callback: async ({message, client, prefix, args}) => {
     try {
  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    const reason = args.slice(1).join(" ");
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`**You don't have enough powers to kick someone**`);
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`**I don't have powers to kick someone**`);
    
    if(!args[0]) return message.reply(`**Please mention someone to kick**`);
    
    if(!target) return message.reply(`**I can't find that member**`);
   
 
    
    if(target.id === message.author.id) return message.reply(`**You cannot lick yourself**`);
    
    if(target.kickable) {
      let embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setFooter(config.footertext, config.footericon)
      .setTitle("SUCESSFULLY KICKED USER!!")
      .setDescription(`Kicked ${target} for reason: \`${reason || "No Reason Provided"}\``);
      message.channel.send(embed);
      
      target.kick({
      reason: `${reason || "NO REASON GIVEN"}`
      });
      
      try{
     let kickEmbed = new MessageEmbed()
     .setTitle(`YOU HAVE BEEN BANNED`)
     .setColor(config.embedcolor)
     .setDescription(`Guild Name: **${message.guild.name}**\nModerator: **${message.author.tag}**\nReason: **${reason || "No reason given"}**`);
     target.send(kickEmbed);
     
      } catch(err) {
        message.channel.send("**I could not dm user because their dm is off**");
      }
    } else {
      return message.reply(`**I can't kick them, make sure that my role is above of theirs**`);
    }
    return undefined;
   
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