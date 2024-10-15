const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "rainbow",
  description: "Gets a rainbow image for you",
  aliases: [""],
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new MessageEmbed()
    .setColor(config.embedcolor)
    .setTitle("Rainbow")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/rainbow?image=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();
    message.channel.send(Embed);
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