const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "qrcode",
  description: "Genenerates a qrcode for your message",
  aliases: ["qr"],
  expectedArgs: "<your_message>",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text}) => {
    try{
     try {
   let code = args.join("%20");
   
   if(!code) {
   return message.channel.send(`Please provide text for the qrcode conversion!`);
   }

   if(code.length > 20) {
   return message.channel.send(`Please put text that has 20 characters or less because the conversion won't be good!`);
}

  let url = (`https://api.qrserver.com/v1/create-qr-code/?size=150×150&data=${code}`)

   let qrEmbed = new MessageEmbed()
    .setTitle("HERE IS YOUR QR CODE")
    .setColor(config.embedcolor)
    .setFooter(config.footertext, config.footericon)
    .setURL(url)
    .setImage(url);
    message.channel.send(qrEmbed);
  } catch(error) {
    console.log(error)
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