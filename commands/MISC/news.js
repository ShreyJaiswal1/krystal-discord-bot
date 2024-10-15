const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require('node-fetch');

module.exports = {
  name: "news",
  description: "gets the latest top 5 globall news",
  aliases: ["global"],
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    try {
      let query;
      if(args[0]){
        query = args[0];
      } else {
        query = 'general';
      }
      const response = await fetch(
          `https://newsapi.org/v2/top-headlines?q=${query}&pageSize=1&apiKey=${config.newsAPI}`
      );
      const json = await response.json();
      const articleArr = json.articles;
      let processArticle = article => {
          const embed = new MessageEmbed()
              .setColor(config.embedcolor)
              .setTitle(article.title)
              .setURL(article.url)
              .setAuthor(article.author)
              .setDescription(article.description)
              .setThumbnail(article.urlToImage)
              .setTimestamp(article.publishedAt)
              .setFooter(message.guild.name, message.guild.iconURL());
          return embed;
      };
      async function processArray(array) {
          for (const article of array) {
              const msg = await processArticle(article);
              message.channel.send(msg);
          }
      }
      await processArray(articleArr);
  } catch (e) {
      message.channel.send('Something failed along the way');
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