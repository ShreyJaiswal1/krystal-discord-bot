const config = require("../../config.json");
const { MessageEmbed } = require ("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "fact",
  description: "Gets a random fact for you",
  aliases: ["factify", "getfact"],
  category: "FUN AND GAMES",
  callback: (message, client, prefix) => {
    try{
   fetch("https://bruhapi.syntaxpwn.repl.co/fact").then(res => res.json()).then(data => {
    let embed = new MessageEmbed()
    .setTitle(`YOUR RANDOM FACT IS HERE!!`)
    .setColor(config.embedcolor)
    .setDescription(data.res)
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