const {
  MessageEmbed
} = require(`discord.js`)
const ee = require(`../../config.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `forward`,
  category: `MUSIC`,
  aliases: [`fwd`],
  description: `Forwards by a certain amount of time in the current track.`,
  expectedArgs: `<time>`,
  run: async (client, message, args, instance, text, prefix) => {
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
      //if queue size too small return error
      if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
      //if invalid usage
      if (!args[0]) {
        let string = `${instance.getPrefix(message.guild)}forward <Time in seconds>`
        let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: Invalid usage**\n"+string)
        }
        return;
      }
      //get the seektime variable of the user input
      let seektime = Number(player.position) + Number(args[0]) * 1000;
      //if the userinput is smaller then 0, then set the seektime to just the player.position
      if (Number(args[0]) <= 0) seektime = Number(player.position);
      //if the seektime is too big, then set it 1 sec earlier
      if (Number(seektime) >= player.queue.current.duration)
        return message.channel.send(`**:x: Time cannot be longer than the song**`);
      //seek to the new Seek position
      player.seek(Number(seektime));
      //Send Success Message
      return message.channel.send(new MessageEmbed().setTitle(`*FORWARDED SONG`).setDescription(`Set position to: ${format(player.position)}**`).setColor(ee.embedcolor));
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