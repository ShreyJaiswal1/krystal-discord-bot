const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");

module.exports = {
  name: "volume",
  description: "changes the volume of the song",
  aliases: ["vol", 'v'],
  expectedArgs: "<volume>",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const player = client.manager.players.get(message.guild.id);
      //if the Volume Number is out of Range return error msg
      if (Number(args[0]) <= 0 || Number(args[0]) > 150)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`:x: Error | You may set the volume \`1\` - \`150\``)
        );
      //if its not a Number return error msg
      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`:x: Error | You may set the volume \`1\` - \`150\``)
        );
      //change the volume
      player.setVolume(Number(args[0]));
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`🔊 Volume set to: \`${player.volume} %\``)
        .setColor(ee.embedcolor)
        .setFooter(ee.footertext, ee.footericon)
      );
} catch(error) {
  
  console.log(error);
  
  message.channel.send({embed: {
    title: ":x: | ERROR",
    description: "An error occurred while executing this command",
    color: ee.wrongcolor,
    footer: {
      text: ee.footertext,
      icon_url: ee.footericon
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