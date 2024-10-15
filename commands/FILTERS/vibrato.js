const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "vibrato",
  description: "applies a vibrato filter",
  aliases: [""],
  expectedArgs: "",
  category: "FILTERS",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try { 
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
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
          vibrato: {
            "frequency": 4.0, // 0 < x
            "depth": 0.75      // 0 < x ≤ 1
        },
      });
      return message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`Success | Applying the \`VIBRATO\` Filter`)
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