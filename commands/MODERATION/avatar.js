const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "avatar",
  minArgs: 0,
  maxArgs: 1,
   description: "Gets an avatar of mentioned user.",
   aliases: ["av", "getavatar", " getav"],
   category: "MODERATION",
   expectedArgs: "[user_mention]",
   callback: async ({message, client, prefix, args}) => {
     try {
      const avatar = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

   let targetAvtar = new MessageEmbed()
   .setTitle(`HERE IS AVATAR OF ${avatar.user.username}`)
   .setColor(config.embedcolor)
   .setFooter(config.footertext, config.footericon)
   .setImage(avatar.user.displayAvatarURL({dynamic: true}));
   
   message.channel.send(targetAvtar);
 
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