const db = require ("quick.db");
const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");

module.exports = {
  name: "deletechatbot",
  aliases: ["deletebot", "removechatbot", "removebot"],
  description: "Removes chatbot from the specified channel",
  expectedArgs: "<channel_mention>",
  category: "ADMIN",
  callback: async ({client, prefix, text, args, message}) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You need \`ADMINISTRATOR\` permissions to use this command.`);
    let request = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!request)return message.channel.send("Please mention a valid channel");
    let chatbot = request.id;
    if(db.has(`_${message.guild.id}`)){
   
   message.channel.send(new MessageEmbed()
   .setTitle("SUCESSFULLY DELETED CHATBOT")
   .setColor(ee.embedcolor)
   .setFooter(ee.footertext, ee.footericon)
   .setDescription(`Removed chatbot from <#${chatbot}>`));
   db.delete(`_${message.guild.id}`);
    } else {
      message.channel.send("That channel is not a chatbot channel");
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