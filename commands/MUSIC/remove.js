const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "remove",
  description: "removes a track from the queue",
  aliases: ["remove-track", "rm"],
  expectedArgs: "<number>",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const player = client.manager.players.get(message.guild.id);
           //if no args return error
           if (!args[0])
         //if the Number is not a valid Number return error
         if (isNaN(args[0]))
           return message.channel.send(new MessageEmbed()
             .setFooter(config.footertext, config.footericon)
             .setColor(config.wrongcolor)
             .setTitle(`:x: Error | It has to be a valid Queue Number!`)
             .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
           );
         //if the Number is too big return error
         if (Number(args[0]) > player.queue.size)
           return message.channel.send(new MessageEmbed()
             .setFooter(config.footertext, config.footericon)
             .setColor(ee.wrongcolor)
             .setTitle(`:x: Error | Your Song must be in the Queue!`)
             .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
           );
         //remove the Song from the QUEUE
         player.queue.remove(Number(args[0]) - 1);
         //Send Success Message
         return message.channel.send(new MessageEmbed()
           .setTitle(`Success | I removed the track at position: \`${Number(args[0])}\``)
           .setColor(config.embedcolor)
           .setFooter(config.footertext, config.footericon)
         );
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