const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const {
    format,
    swap_pages2
} = require('../../handlers/functions');

module.exports = {
  name: "queue",
  description: "Gets the current song queue",
  aliases: ["q"],
  expectedArgs: "",
  category: "MUSIC",
  slash: 'both',
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
        //get the right tracks of the current tracks
        const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player) return message.channel.send(`**:x: Nothing playing in this server**`);
        const tracks = player.queue;
        //if there are no other tracks, information
        if (!tracks.length)
          return message.channel.send(new MessageEmbed()
            .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
              dynamic: true
            }))
            .setFooter(config.footertext, config.footericon)
            .setColor(config.embedcolor).addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
            .setDescription(`:x: No tracks in the queue`)
          ).then(msg => {
            try {
              msg.delete({
                timeout: 5000
              }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
            } catch {
              /* */ }
          })
        //if not too big send queue in channel
        if (tracks.length < 15)
          return message.channel.send(new MessageEmbed()
            .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
              dynamic: true
            }))
            .setFooter(config.footertext, config.footericon)
            .addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
            .setColor(config.embedcolor).setDescription(tracks.map((track, i) => `**${++i})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*requested by: ${track.requester.tag}*`).join(`\n`))
          ).then(msg => {
            try {
              msg.delete({
                timeout: 5000
              }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
            } catch {
              /* */ }
          })
        //get an array of quelist where 15 tracks is one index in the array
        let quelist = [];
        for (let i = 0; i < tracks.length; i += 15) {
          let songs = tracks.slice(i, i + 15);
          quelist.push(songs.map((track, index) => `**${i + ++index})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*requested by: ${track.requester.tag}*`).join(`\n`))
        }
        let limit = quelist.length <= 5 ? quelist.length : 5
        let embeds = []
        for (let i = 0; i < limit; i++) {
          let desc = String(quelist[i]).substr(0, 2048)
          await embeds.push(new MessageEmbed()
            .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
              dynamic: true
            }))
            .setFooter(config.footertext, config.footericon)
            .setColor(config.embedcolor)
            .addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
            .setDescription(desc));
        }
        //return susccess message
        return swap_pages2(client, message, embeds)
} catch(error) {
  
  console.log(error);
  
  message.channel.send({embed: {
    title: ":x: | ERROR",
    description: "An error occurred while executing this command",
    embedcolor: config.wrongcolor,
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