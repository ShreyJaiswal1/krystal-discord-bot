const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  name: "support",
  description: "gets invite for the bot",
  aliases: ["support-server"],
  expectedArgs: "",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     let button = new MessageButton()
     .setStyle('url')
     .setLabel('JOIN SERVER')
     .setURL(config.support)
     .setEmoji('828738580826292244');

     let embed = new MessageEmbed()
     .setTitle(`PLEASE JOIN OUR SUPPORT SERVER!!`)
     .setColor(config.embedcolor)
     .setDescription(`Please join our support server and report your bug or get your query solved!!`)
     .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
     .setFooter(config.footertext, config.footericon);

     message.channel.send(embed, button)
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