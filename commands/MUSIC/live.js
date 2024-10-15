const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { live } = require("../../handlers/livemusic.json");
const playermanager = require("../../handlers/lavalink/playermanager");

module.exports = {
  name: "live",
  description: "plays a live music from your favorite category",
  aliases: ["livemusic"],
  expectedArgs: "<category>",
  category: "MUSIC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     let list = [];
       const types = live.forEach(music => {list.push(music.name)});

       if(!args[0])return message.channel.send(new MessageEmbed()
       .setTitle(`PLEASE PROVIDE THE CATEGORY!!`)
       .setColor(config.embedcolor)
       .setDescription(`**Categories:** ${list.join(', ')}`)
       .setFooter(`USEAGE: ${prefix}live <category>`));
       
        let select = live.find(x => x.name.includes(args[0]))
        if (select == undefined) {
         return message.channel.send('No live music found for ' + args[0]);
        } else{
          let link = select.url;
          let res;
          res = await client.manager.search({
            query: link,
            source: 'youtube'
          }, message.author);
        // Check the load type as this command is not that advanced for basics
        if (res.loadType === "LOAD_FAILED") throw res.exception;
        //if no tracks found return info msg
        if (!res.tracks[0]){
          return message.channel.send(`**:x: Found nothing for: \`${search}\`**`);
        }
        //create a player if not created
        let player;
        player = client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          selfDeafen: false,
        });
        //if the player is not connected, then connect and create things
        if (player.state !== "CONNECTED") {
          //connect to the channel
          player.connect()
          //add track
          player.queue.add(res.tracks[0]);
          //play track
          player.play();
        } else {
          let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      //clear queue
      player.queue.clear();
      //add new tracks
      player.queue.add(res.tracks[0]);
      //now add every old song again
      for (const track of oldQueue)
        player.queue.add(track);
        let playembed = new MessageEmbed()
        .setAuthor(`Added to queue`, message.author.displayAvatarURL({dynamic: true}))
        .setURL(res.tracks[0].uri)
        .setTitle("**" + res.tracks[0].title + "**")
        .setColor(config.embedcolor)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("Channel", res.tracks[0].author, true)
        .addField("Song Duration: ", res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0], true)
        .addField("Position in queue", `${player.queue.length}`, true);
        message.channel.send(playembed);
        }
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