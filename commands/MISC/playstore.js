const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const PlayStore = require("google-play-scraper");

module.exports = {
  name: "playstore",
  description: "gets a application info from the playstore",
  aliases: [""],
  expectedArgs: "<application>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!args[0])
    return message.channel.send(
      `Please Give Something To Search - ${message.author.username}`
    );

  PlayStore.search({
    term: args.join(" "),
    num: 1
  }).then(Data => {
    let App;

    try {
      App = JSON.parse(JSON.stringify(Data[0]));
    } catch (error) {
      return message.channel.send(
        `No Application Found - ${message.author.username}!`
      );
    }

    let Embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setThumbnail(App.icon)
      .setURL(App.url)
      .setTitle(`${App.title}`)
      .setDescription(App.summary)
      .addField(`Price`, App.priceText, true)
      .addField(`Developer`, App.developer, true)
      .addField(`Score`, App.scoreText, true)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(Embed);
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