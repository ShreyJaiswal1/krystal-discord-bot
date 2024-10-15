const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "move",
  description: "moves a song in the queue",
  aliases: ["mv"],
  expectedArgs: "<old-number> <new-number>",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const player = client.manager.players.get(message.guild.id);
      //if no FROM args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(config.wrongcolor)
          .setFooter(config.footertext, config.footericon)
          .setTitle(`:x: ERROR | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``)
        );
      //If no TO args return error
      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(config.wrongcolor)
          .setFooter(config.footertext, config.footericon)
          .setTitle(`:x: ERROR | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``));
      //if its not a number or too big / too small return error
      if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)
        return message.channel.send(
          new MessageEmbed()
          .setColor(config.wrongcolor)
          .setFooter(config.footertext, config.footericon)
          .setTitle(`:x: ERROR | Your Input must be a Number greater then \`1\` and smaller then \`${player.queue.length}\``)
        );
      //get the new Song
      let song = player.queue[player.queue.length - 1];
      //move the Song to the first position using my selfmade Function and save it on an array
      let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
      //clear teh Queue
      player.queue.clear();
      //now add every old song again
      for (const track of QueueArray)
        player.queue.add(track);
      //send informational message
      return message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`Success | Mmoved the Song in the Queue from Position \`${args[0]}\` to Position: \`${args[1]}\``)
        .setThumbnail(song.displayThumbnail())
        .setDescription(`[${song.title}](${song.uri}) - \`${format(song.duration)}\` - requested by **${song.requester.tag}**`)
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