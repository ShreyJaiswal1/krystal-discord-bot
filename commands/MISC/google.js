const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "google",
  description: "gets the information about a text on google",
  aliases: [""],
  expectedArgs: "<query>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
       if(!args[0]) return message.channel.send(`Please provide me query to google it`)
   message.channel.send(`http://lmgtfy.com/?q=${args.join(`+`)}`)
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