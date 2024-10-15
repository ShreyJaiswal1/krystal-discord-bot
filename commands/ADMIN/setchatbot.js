const db = require("quick.db");
const ee = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    // Best practice for the built-in help menu
    name: "setchatbot",
    category: 'ADMIN',
    description: 'Sets a chatbot to a specified channel',
    aliases: ["addchatbot", "botchannel"],
    expectedArgs: "<channel_mention>",
    callback: ({ message, client, prefix, args }) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You need \`ADMINISTRATOR\` permissions to use this command.`);
     if(args[0] === null) return;
    let request = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!request) return message.channel.send("Please mention a valid channel");
    
    let chatbot = request.id;
    
    db.set(`_${message.guild.id}`, chatbot);
    message.channel.send(new MessageEmbed()
    .setTitle("ADDED CHATBOT SUCESSFULLY!!")
    .setColor(ee.embedcolor)
    .setFooter (ee.footertext, ee.footericon)
    .setDescription(`Added chatbot to ${request}\nPlease type **\`Hi\`** to get started.`));
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