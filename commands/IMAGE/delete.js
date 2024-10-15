const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "delete",
  description: "Gets a delete image for you",
  aliases: ["deleted"],
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const avatar = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let image = await canvacord.Canvas.delete(avatar.user.displayAvatarURL({format: 'png'}), true);
 let attachment = new MessageAttachment(image, 'delete.png')
    message.channel.send(attachment);
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