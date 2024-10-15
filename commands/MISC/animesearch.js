const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const malScraper = require('mal-scraper');

module.exports = {
  name: "animesearch",
  description: "searchs a anime query and gets info about it",
  aliases: ["anime"],
  expectedArgs: "<query>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const search = `${args}`;
    if(!search)
    return message.reply('Please add a search query if invalid command will not work.');
    
    malScraper.getInfoFromName(search)
      .then((data) => {
      const malEmbed = new MessageEmbed()
        .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
        .setThumbnail(data.picture).setFooter(client.user.username, config.AVATARURL)
        .setColor(config.embedcolor)
        .addField('English Title', data.englishTitle)
        .addField('Japanese Title', data.japaneseTitle)
        .addField('Type', data.type)
        .addField('Episodes', data.episodes)
        .addField('Rating', data.rating)
        .addField('Aired', data.aired)
        .addField('Score', data.score)
        .addField('Score Stats', data.scoreStats)
        .addField('Link', `[Click here](${data.url})`);
    
        message.channel.send(malEmbed);
    
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