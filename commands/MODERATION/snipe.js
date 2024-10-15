const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "snipe",
  description: "gets recenty deleted message",
  aliases: [""],
  category: "MODERATION",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
       const msg = client.snipes.get(message.channel.id);
       if(!msg) return message.channel.send(`There is nothing to snipe!!`).then(m => m.delete({timeout: 4000}));
       message.channel.send(new MessageEmbed()
       .setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}))
       .setTitle(`DELETED MESSAGE`)
       .setColor(config.embedcolor)
       .setDescription(msg.content)
       .setFooter(config.footertext, config.footericon)
       )
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