const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "gets the information about",
  aliases: [""],
  expectedArgs: "[city]",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!args[0]) return message.channel.send('**Please Enter A City Name!**')
      
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
    
    if(err) message.channel.send(err.message);

    if(result.length === 0) {
        message.channel.send('**Please Enter A Valid Location.**')
        return undefined;
    }

        var current = result[0].current;
        var location = result[0].location;

        const embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(config.embedcolor)
            .addField('**Timezone**', `UTC ${location.timezone}`, true)
            .addField('**Degree Type**', `${location.degreetype}`, true)
            .addField('**Temperature**', `${current.temperature} Degrees`, true)
            .addField('**Feels Like**', `${current.feelslike} Degrees`, true)
            .addField('**Winds**', `${current.winddisplay}`, true)
            .addField('**Humidity**', `${current.humidity}%`, true)
            .addField('**Date**', `${current.date}`, true)
            .addField('**Day**', `${current.day}`, true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        message.channel.send({embed})

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