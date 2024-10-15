const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "channelinfo",
  description: "gets the info about the channel",
  aliases: ["channel"],
  expectedArgs: "<channel>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
    if (!channel) return message.channel.send("**Channel Not Found!**");

    let channelembed = new MessageEmbed()
        .setTitle(`Channel Information for ${channel.name}`)
        .setThumbnail(message.guild.iconURL())
        .addField("**NSFW**", channel.nsfw, true)
        .addField("**Channel ID**", channel.id, true)
        .addField("**Channel Type**", channel.type)
        .addField("**Channel Description**", `${channel.topic || "No Description"}`)
        .addField("**Channel Created At**", channel.createdAt)
        .setColor(config.embedcolor);
    message.channel.send(channelembed);
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