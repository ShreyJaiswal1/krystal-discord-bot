const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const urban = require('urban.js');

module.exports = {
  name: "urban",
  description: "gets the world from the dictionary",
  aliases: [""],
  expectedArgs: "<your_word>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const bargs =  message.content.split(' ');
    const searchString = bargs.slice(1).join(' ')
    if(!searchString)return message.channel.send(`You have to type in word`)
    
    
    
  urban(searchString).then(urbans=>{
    
    message.channel.send({embed: {
            
        description: `__**${urbans.word}**__\n\n**Definition**\n${urbans.definition}\n\n**Example**\n${urbans.example}\n\n**Tags:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Thumbs Up* **|** 👎 **${urbans.thumbsDown}** *Thumbs Down*`,
        author: {
            name: message.author.username,
            icon_url: message.author.avatarURL,
        },
        color: config.embedcolor,
    
  
        timestamp: new Date(),
    
    }
  })
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