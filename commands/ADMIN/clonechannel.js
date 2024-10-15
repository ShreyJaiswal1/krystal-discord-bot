const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "clonechannel",
  description: "clones a channel",
  aliases: ["clone"],
  expectedArgs: "",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`You do not have \`ADMINISTRATOR\` permission to use this command`);
     message.channel.clone().then((ch) => {
         message.channel.send(new MessageEmbed()
         .setTitle(`CLONED CHANNEL!!`)
         .setDescription(`Cloned this channel, please checkout ${ch}`)
         .setColor(config.embedcolor)
         .setFooter(config.footertext, config.footericon));
     });
} catch(error) {x
  
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