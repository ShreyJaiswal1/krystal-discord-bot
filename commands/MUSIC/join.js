const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "join",
  description: "joins a voice channel",
  aliases: ["j"],
  expectedArgs: "",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    var { channel } = message.member.voice;
    if(!channel) 
      return message.channel.send(new MessageEmbed()
        .setColor(config.wrongcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`:x: ERROR | You are not connected to a Voice Channel`)
      );
    //if no args return error
    var player = client.manager.players.get(message.guild.id);
    if(player) {
      var vc = player.voiceChannel;
      var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
      
      return message.channel.send(new MessageEmbed()
        .setColor(config.wrongcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`:x: ERROR | I am already connected somewhere`)
        .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)
      );
    }
    //create the player
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    //join the chanel
    if (player.state !== "CONNECTED") { 
      player.connect();
    }   
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