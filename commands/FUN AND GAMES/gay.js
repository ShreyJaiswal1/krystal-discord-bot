const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "gay",
  description: "gay count for the user",
  aliases: ["gaycount"],
  expectedArgs: "<user>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.channel.send(`Please mention someone while using this command`);
    let amount = Math.floor(Math.random() * 100) + 1;
    let embed = new MessageEmbed()
    .setTitle(`GAY COUNT RESULT`)
    .setColor(config.embedcolor)
    .setDescription(`**${target.user.tag}** is **${amount}%** gay :rainbow_flag: !!`)
    .setFooter(config.footertext, config.footericon);
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