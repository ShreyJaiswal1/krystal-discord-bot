const Discord = require("discord.js");
const config = require("../../config.json");
const { parse } = require("twemoji-parser");
module.exports = {
  name: "steal",
  description: "steals a emoji",
  aliases: ["emoji"],
  expectedArgs: "link/emoji name",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
        return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
      }
      
      const emoji = args[0];
      if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);
  
      let customemoji = Discord.Util.parseEmoji(emoji);
  
      if (customemoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
          customemoji.animated ? "gif" : "png"
        }`;
        const name = args.slice(1).join(" ");
        message.guild.emojis.create(
          `${Link}`,
          `${name || `${customemoji.name}`}`
        );
        const Added = new Discord.MessageEmbed()
          .setTitle(`Emoji Added`)
          .setColor(config.embedcolor)
          .setDescription(
            `Emoji Has Been Added! | Name : ${name || `${customemoji.name}`} | Preview : [Click Me](${Link})`
          );
        return message.channel.send(Added);
      } else {
        let CheckEmoji = parse(emoji, { assetType: "png" });
        if (!CheckEmoji[0])
          return message.channel.send(`Please Give Me A Valid Emoji!`);
        message.channel.send(
          `You Can Use Normal Emoji Without Adding In Server!`
        );
      }
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