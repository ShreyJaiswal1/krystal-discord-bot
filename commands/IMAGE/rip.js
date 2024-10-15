const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "rip",
  description: "Gets a rip image for you",
  aliases: [""],
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new MessageEmbed()
    .setColor(config.embedcolor)
    .setTitle("Rest In Peace")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/rip?image=${Member.user.displayAvatarURL({ format: "png" })}`))
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