const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require(`quick.db`);

module.exports = {
  name: "unmute",
   description: "Unmutes the mentioned user.",
   aliases: [""],
   category: "MODERATION",
   expectedArgs: "<user_mention>",
   callback: async ({message, client, prefix, args}) => {
     try {
      if(!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send(`You need \`KICK_MEMBERS\` permissions to use this command.`);
       if(!db.has(`mute_${message.guild.id}`))return message.channel.send(new MessageEmbed()
       .setTitle(`PLEASE SETUP MUTEROLE`)
       .setDescription(`Please use \`${prefix}muterole\` command to setup muted role!!`)
       .setColor(config.wrongcolor)
       .setFooter(config.footertext, config.footericon))
  let role = message.guild.roles.cache.get(db.get(`mute_${message.guild.id}`));
 if(!role) return message.channel.send("Cannot find Muted role. Please setup one to use this command");
let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!Member){
  return message.channel.send("You need to mention the user to mute");
}

await Member.roles.remove(role);

      let embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setFooter(config.footertext, config.footericon)
      .setTitle("SUCESSFULLY UNMUTED USER!!")
      .setDescription(`${Member} has been unmuted now`);
      message.channel.send(embed);
      try{
     let banEmbed = new MessageEmbed()
     .setTitle(`YOU HAVE BEEN UNMUTED`)
     .setColor(config.embedcolor)
     .setDescription(`Guild Name: **${message.guild.name}**\nModerator: **${message.author.tag}**`);
     Member.send(banEmbed);
      } catch(err) {
        message.channel.send("I could not dm user because their dm is off");
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
}}
}
