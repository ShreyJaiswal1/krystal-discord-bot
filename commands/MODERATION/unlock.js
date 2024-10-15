const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "unlock",
  description: "unlocks the mentioned channel",
  aliases: [""],
  expectedArgs: "[channel]",
  category: "MODERATION",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
        return message.channel.send("You don't have enough Permissions")
        }
        let target = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        target.overwritePermissions([
          {
             id: message.guild.id,
             null : ['SEND_MESSAGES'],
          },
         ],);
        const embed = new MessageEmbed()
        .setTitle("CHANNEL UNLOCKED!!")
        .setDescription(`${target} has been unlocked`)
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon);
        await message.channel.send(embed);
        message.delete();
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