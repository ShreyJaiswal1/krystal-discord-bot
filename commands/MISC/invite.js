const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  name: "invite",
  description: "gets invite for the bot",
  aliases: ["inv"],
  expectedArgs: "",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     let button = new MessageButton()
     .setStyle('url')
     .setLabel('INVITE ME')
     .setURL(config.invite)
     .setEmoji('828738580826292244');
     let button2 = new MessageButton()
     .setStyle('url')
     .setLabel('SUPPORT SERVER')
     .setURL(config.support)
     .setEmoji('828738580826292244');
     let row = new MessageActionRow()
     .addComponent(button)
     .addComponent(button2);

     let embed = new MessageEmbed()
     .setTitle(`:heart: THANKS FOR INVITING ME!!`)
     .setColor(config.embedcolor)
     .setDescription(`I am a multipurpose discord bot with 230+ commands with high quality music quality. Click the button below to invite me into your server !!`)
     .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
     .setFooter(config.footertext, config.footericon);

     message.channel.send(embed, row)
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