const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const moment = require("moment");
const fetch = require("node-fetch");

module.exports = {
  name: "github",
  description: "gets info abot a github user",
  aliases: ["git"],
  expectedArgs: "<username>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    try {

        if (!args[0]) return message.channel.send(`Please Give Me A Username!`)
          
        fetch(`https://api.github.com/users/${args.join('-')}`)
          .then(res => res.json()).then(body => {
            if(body.message) return message.channel.send(`User Not Found | Please Give Me A Valid Username!`);
          let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
      
                  const embed = new MessageEmbed()
                  .setAuthor(`${login} Information!`, avatar_url)
                  .setColor(config.embedcolor)
                  .setThumbnail(`${avatar_url}`)
                  .addField(`Username`, `${login}`)
                  .addField(`ID`, `${id}`)
                  .addField(`Bio`, `${bio || "No Bio"}`)
                  .addField(`Public Repositories`, `${public_repos || "None"}`, true)
                  .addField(`Followers`, `${followers}`, true)
                  .addField(`Following`, `${following}`, true)
                  .addField(`Location`, `${location || "No Location"}`)
                  .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
                  .setFooter(config.footertext, config.footericon);
      
                  message.channel.send(embed)
      
          })
      
              } catch (error) {
                  console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
                  return message.channel.send(`Something Went Wrong Try Again Later!`)
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