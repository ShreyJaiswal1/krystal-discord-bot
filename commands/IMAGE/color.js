const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");
module.exports = {
  name: "color",
  description: "gets a color image for you",
  aliases: ["hex"],
  expectedArgs: "<color_name>",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     if(!args[0] || args[0].length > 6) return message.channel.send(`Please provide a valid color or hex string`);
     let image = await canvacord.Canvas.color(`#${args[0]}`, false, 100, 100);
     const attachment = new MessageAttachment(image,'color.png'); 
 message.channel.send(`Here is your color #${args[0]}`, attachment);
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