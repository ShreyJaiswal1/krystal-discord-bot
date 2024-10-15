const fetch = require("node-fetch");
const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require("../../config.json");

module.exports = {
  name: "tweet",
  description: "gets a tweet image",
  aliases: [""],
  expectedArgs: "<user> <message>",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("You need to mention a user and provide text!")

    let msg = args.slice(1).join(" ");

      fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user.username}&text=${msg}`)
       .then((res) => res.json())
       .then((data) => {
           let embed = new MessageAttachment(data.message, 'tweet.png');
           message.channel.send(embed)
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