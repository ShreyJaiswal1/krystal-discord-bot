const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const axios = require('axios');
const fetch = require('node-fetch');

module.exports = {
  name: "banner",
  description: "gets a user profile banner",
  aliases: [""],
  expectedArgs: "[user]",
  category: "MODERATION",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined) || message.member;
    if (!user) return message.reply('You must mention someone to get there banner').catch(console.error);

    const res = await fetch(`https://cryptons.ga/api/v1/userbanner?id=${user.id}`);

    const json = res.json()

    if(json.url === "null") return message.repy('User doesnt have a banner')
    axios.get(`https://cryptons.ga/api/v1/userbanner?id=${user.id}`)
        .then(function(response) {
        if(response.data.url === "null") return message.reply('User doesnt have a banner')
            const embed = new MessageEmbed()
                .setTitle(`BANNER`)
                .setURL(response.data.url)
                .setImage(response.data.url)
                .setColor(config.embedcolor)
                .setFooter(config.footertext, config.footericon);
                
            message.channel.send(embed);
        });
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