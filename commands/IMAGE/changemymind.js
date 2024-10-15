const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "changemymind",
  description: "Gets a changemymind image for you",
  aliases: ["changemind", "mind"],
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!args[0]) return message.channel.send(`Please provide a valid text!!`);
    let image = await canvacord.Canvas.changemymind(args.join(' '));
 let attachment = new MessageAttachment(image, 'changemymind.png')
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