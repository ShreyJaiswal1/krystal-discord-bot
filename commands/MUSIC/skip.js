const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: `skip`,
  aliases: [`next`, "s"],
  description: `Votes to skip the current playing song`,
  expectedArgs: ``,
  category: "MUSIC",
  callback: async ({client, message, args, text, prefix}) => {
    //get the voice channel of the member
    const {
      channel
    } = message.member.voice;
    //if he is not connected to a vc return error
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if queue size too small return error
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
    //if bot connected bot not with the lavalink player then try to delete the player
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    player.stop();
    //return success message
    return message.channel.send(new MessageEmbed()
    .setColor(config.embedcolor)
    .setDescription(`**SKIPPING:** *${player.queue.current.title}*`));

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