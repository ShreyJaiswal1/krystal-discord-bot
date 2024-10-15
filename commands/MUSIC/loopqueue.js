const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");
module.exports = {
    name: `loopqueue`,
    category: `MUSIC`,
    aliases: [`qloop`, "lq", "queueloop", "loopqu", "loopq"],
    description: `Toggles looping for the whole queue.`,
    run: async ({client, message, args, text, prefix}) => {
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
        if(!player.current < 1) return message.channel.send(`**:x: Nothing playing in this server**`);
        //if user is not in the right channel as bot, then return error
        if(player && channel.id !== player.voiceChannel)
          return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
        //if bot connected bot not with the lavalink player then try to delete the player
        if(player && botchannel && channel.id !== botchannel.id){
          player.destroy();
        }
        //change Queue Mode
        player.setQueueRepeat(!player.queueRepeat);
        //Send Success Message
        return message.channel.send(new MessageEmbed()
        .setDescription(`**${player.queueRepeat ? `:repeat: Queue loop enabled` : `:no_entry_sign: Disabled queue loop`}**`)
        .setColor(ee.embedcolor)
        .setTitle(`QUEUE LOOP`));
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