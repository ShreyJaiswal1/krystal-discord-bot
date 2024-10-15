const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");

module.exports = {
  name: "jump",
  description: "jumps to a song",
  aliases: ["skipto"],
  expectedArgs: "<queue_number>",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const player = client.manager.players.get(message.guild.id);
      //if no args send error plus example
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`:x: Error | Please include to which track you want to jump`)
          .setDescription(`Example: \`jump ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      //if userinput is not a Number
      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`:x: Error | It has to be a queue **Number**`)
        );
      //if the wished track is bigger then the Queue Size
      if (Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`:x: Error | That song is not in the queue, sorry!`)
        );
      //remove all tracks to the jumped song
      player.queue.remove(0, Number(args[0]) - 1);
      //stop the player
      player.stop()
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`Success | Jumped to the: \`${args[0]}\` Song`)
        .setDescription(`Skipped \`${Number(args[0])}\` Songs`)
        .setColor(ee.embedcolor)
        .setFooter(ee.footertext, ee.footericon)
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