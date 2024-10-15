const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
 
 module.exports = {
   name: "advice",
   description: "Gets an advice for you",
   aliases: ["giveadvice"],
   category: "FUN AND GAMES",
   callback: (message, client, prefix) => {
     try {
     fetch("https://api.adviceslip.com/advice").then(res => res.json()).then(data => {
       let adviceEmbed = new MessageEmbed()
       .setTitle("HERE IS YOUR ADVICE!! TAKE IT SERIOUSLY")
       .setColor(config.embedcolor)
       .setDescription(data.slip.advice)
       .setFooter(config.footertext, config.footericon);
       message.channel.send(adviceEmbed);
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