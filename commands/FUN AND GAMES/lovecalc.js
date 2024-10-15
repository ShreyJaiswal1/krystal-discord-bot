const { MessageEmbed } = require("discord.js");
const e = require("express");
const config = require("../../config.json");

module.exports = {
  name: "lovecalc",
  description: "love count for the user",
  aliases: ["lc", "love"],
  expectedArgs: "<user>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.channel.send(`Please mention someone while using this command`);
    let amount = Math.floor(Math.random() * 100) + 1;
    let embed = new MessageEmbed()
    .setTitle(`LOVE CALCULATOR`)
    .setColor(config.embedcolor)
    .setDescription(`There is **${amount}%** love between **${message.author.tag}** and **${target.user.tag}**`)
    .setFooter(config.footertext, config.footericon);
    if(amount < 20) {
        embed.addField("Comment", "Try but never cry xD")
    }
    if(20 < amount && amount < 50) {
        embed.addField("Comment", "Don't worry true love is uncountable")
    }
    if(50 < amount && amount < 80) {
        embed.addField("Comment", "Aww... what a perfect pair")
    }
    if(80 < amount && amount < 100) {
        embed.addField("Comment", "**OwO** life partner found!! Now it's time to give a party!!")
    }
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