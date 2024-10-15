const fetch = require("node-fetch");
const config = require("../../config.json");
const { MessageEmbed } = require ("discord.js");
const meme = require('random-jokes-api');

module.exports = {
  name: "joke",
  description: "Gets a random joke for you",
  aliases: ["givejoke", "jk"],
  category: "FUN AND GAMES",
  callback: (message, client, prefix) => {
    try{
   // fetch("https://official-joke-api.appspot.com/jokes/random").then(res => res.json()).then((data) => {
    let embed = new MessageEmbed()
      .setTitle("HERE YOUR JOKE!! HOPE YOU LAUGH")
      .setColor(config.embedcolor)
      .setFooter(config.footertext, config.footericon)
      .setDescription(`${meme.joke()}`);
      message.channel.send(embed);
   // });
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