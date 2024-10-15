const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "tenor",
  description: "gets a tenor gif",
  aliases: ["gif", "tenor-gif"],
  expectedArgs: "<query>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!args[0])return message.channel.send(`You need to provide a query for gif`);
    let num = Math.floor(Math.random() * 25);
    fetch(`https://g.tenor.com/v1/random?key=${config.tenor}&q=${args.join(' ')}&limit=25`)
    .then(res => res.json())
    .then(json => message.channel.send(json.results[num].url))
    .catch(e => {
      message.channel.send('Failed to find a gif that matched your query');
      // console.error(e);
      return;
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