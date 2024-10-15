const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "meme",
  description: "gets a random meme for you",
  aliases: ["getmeme"],
  category: "IMAGE",
  callback: (message, client, prefix) => {
    try{
    fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()).then(async data => {
      let memeEmbed = new MessageEmbed()
      .setTitle("**MEME LINK**")
      .setColor(config.embedcolor)
      .setImage(data.url)
      .setURL(data.postLink)
      .setFooter(config.footertext, config.footericon);
      message.channel.send(memeEmbed);
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