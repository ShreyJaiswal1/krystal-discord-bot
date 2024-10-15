const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const fetch = require('node-fetch');

module.exports = {
  name: "captcha",
  description: "returns a captha image",
  aliases: [""],
  expectedArgs: "<user_mention>",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    try {
        let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.user.username}&url=${user.user.displayAvatarURL({ format: "png", size: 512 })}`));
        let json = await res.json();
        let attachment = new MessageAttachment(json.message, "captcha.png");
        message.channel.send(attachment);
    } catch (e) {
        console.log(e);
        message.channel.send("Error, Try Again! Mention Someone");
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
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/