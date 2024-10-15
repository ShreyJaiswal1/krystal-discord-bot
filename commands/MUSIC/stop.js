
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "stop",
  description: "Stops the currently playing song",
  aliases: ["disconnect", "leave", "dc", "dis", "end"],
  expectedArgs: "",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
      //clear the QUEUE
      player.destroy();
      //Send Success Message
      return message.channel.send(new MessageEmbed()
      .setTitle(`DISCONNECTED`)
      .setColor(config.embedcolor)
      .setDescription(`Stopped music and left your channel\nUse \`${instance.getPrefix(message.guild)}join\` command to start listening again`));
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