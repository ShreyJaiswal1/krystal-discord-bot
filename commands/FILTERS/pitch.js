const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "pitch",
  description: "applies a pitch filter",
  aliases: [""],
  expectedArgs: "<multiplicator from 1 to 3>",
  category: "FILTERS",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try { 
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (!args.length)
    return message.channel.send(new MessageEmbed()
      .setColor(config.wrongcolor)
      .setFooter(config.footertext, config.footericon)
      .setTitle(`:x: ERROR | Please include the Multiplicator`)
      .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
    );
  if(isNaN(args[0]))
    return message.channel.send(new MessageEmbed()
      .setColor(config.wrongcolor)
      .setFooter(config.footertext, config.footericon)
      .setTitle(`:x: ERROR | The Multiplicator must be a Number`)
      .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
    );
  if(Number(args[0]) >= 3 || Number(args[0]) <= 0)
    return message.channel.send(new MessageEmbed()
      .setColor(config.wrongcolor)
      .setFooter(config.footertext, config.footericon)
      .setTitle(`:x: ERROR | Multiplicator out of range | Must be between 0 and 3`)
      .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
    );
    player.node.send({
      op: "filters",
      guildId: message.guild.id,
      equalizer: player.bands.map((gain, index) => {
          var Obj = {
            "band": 0,
            "gain": 0,
          };
          Obj.band = Number(index);
          Obj.gain = Number(gain)
          return Obj;
        }),
      timescale: {
            "speed": 1.0,
            "pitch": Number(args[0]),
            "rate": 1.0
        },
    });
  return message.channel.send(new MessageEmbed()
    .setColor(config.embedcolor)
    .setFooter(config.footertext, config.footericon)
    .setTitle(`Success | Pitch set to \`${args[0]}\``)
    .setDescription(`Note: *It might take up to 5 seconds until you hear the Filter*`)
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