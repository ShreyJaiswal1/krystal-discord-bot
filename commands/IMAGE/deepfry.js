const fetch = require("node-fetch")
const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require("../../config.json");

module.exports = {
  name: "deepfry",
  description: "gets a deepfry image",
  aliases: ["fry"],
  expectedArgs: "[user]",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     const user = message.mentions.members.first() || message.member || message.guild.users.cache.get(u => u.id === args[0])
        const avatar = user.user.displayAvatarURL({ dynamic: false, size: 4096})
        fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
        .then((res) =>  res.json())
        .then((data) => {
            let embed = new MessageAttachment(data.message, 'deepfry.png')
            message.channel.send(embed)
        })
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