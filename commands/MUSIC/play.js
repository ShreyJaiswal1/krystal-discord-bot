const { MessageEmbed } = require(`discord.js`);
const playermanager = require(`../../handlers/lavalink/playermanager`);
const ee = require("../../config.json")
module.exports = {
    name: `play`,
    category: `MUSIC`,
    aliases: [`p`],
    description: `Plays a song from youtube`,
    expectedArgs: `<link/query>`,
    callback: async ({client, message, args, text, prefix, instance}) => {
      const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
      const botchannel = message.guild.me.voice.channel;
      //if no args added return error message if allowed to send an embed
      if (!args[0]) {
        let string = `${instance.getPrefix(message.guild)}play <link/query>`
        let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor(ee.embedcolor)
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: Invalid usage**\n"+string)
        }
        return;
      }
      ///get the player
      const player = client.manager.players.get(message.guild.id);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as ${client.user.username} to use this command**`);
      //if bot connected bot not with the lavalink player then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      //IF YOUTUBE SEND INFO WITH YOUTUBE
      if(message.content.includes("youtu")){
        //send searching
        message.channel.send(`<:youtube:864418763571068958> **Searching** :mag_right: \`${args.join(" ")}\``).then(m => m.delete({timeout: 5000}))
        //play the song from our playermanager
        playermanager(client, message, args, `play:youtube`);
      //IF SPOTIFY SEARCH SEND INFO WITH SPOTIFY
      } else if(message.content.includes("spotify")){
        //send searching
        message.channel.send(`<:spotify:864418851453665281> **Searching** :mag_right: \`${args.join(" ")}\``).then(m => m.delete({timeout: 5000}))
        //play the song from our playermanager
        playermanager(client, message, args, `play:youtube`);
      //IF SOUNDCLOUD SEARCH SEND INFO WITH SOUNDCLOUD
      } else if(message.content.includes("soundcloud")){
        //send searching
        message.channel.send(`<:soundCloud:865413581888815134> **Searching** :mag_right: \`${args.join(" ")}\``).then(m => m.delete({timeout: 5000}))
        //play the song from our playermanager
        playermanager(client, message, args, `play:soundcloud`);
      //ELSE SEND RYTHM INFO
    } else if(message.content.includes("http")){
      //send searching
      message.channel.send(`<a:music:850776441041715261> **Searching** :mag_right: \`${args.join(" ")}\``).then(m => m.delete({timeout: 5000}))
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
    } else {
      //send searching
      message.channel.send(`<:youtube:864418763571068958> **Searching** :mag_right: \`${args.join(" ")}\``).then(m => m.delete({timeout: 5000}))
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
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