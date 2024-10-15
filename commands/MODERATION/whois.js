const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const moment = require('moment');
module.exports = {
  name: "whois",
   description: "Gets info about the mentioned member.user",
   aliases: ["member.userinfo"],
   category: "MODERATION",
   expectedArgs: "<member.user_mention>",
   callback: async ({message, client, prefix, args}) => {
     try {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

const embed = new MessageEmbed()
    .setColor(config.embedcolor)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .addField(`${member.user.tag}`, `${member.user}`, true)
    .addField("ID:", `${member.user.id}`, true)
    .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
    .addField("Status:", `${member.user.presence.status.toUpperCase()}`, true)
    .addField("Game:", `${member.user.presence.activity ? member.user.presence.activity.name : 'None'}`, true)
    .addField("Bot:", `${member.user.bot}`, true)
    .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField("Roles:", member.roles.cache.size - 1, true)
    .setFooter(config.footertext, config.footericon);
 
message.channel.send({embed});

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