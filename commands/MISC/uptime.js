const { duration } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");

module.exports = {
  name: "uptime",
  description: "Gets the uptime of the bot",
  aliases: ["up"],
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    message.channel.send(new MessageEmbed()
    .setColor(ee.color)
    .setFooter(ee.footertext, ee.footericon)
    .setTitle(`**${client.user.username}** is online since:\n**${duration(client.uptime)}**`)
  );
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