const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "membercount",
  description: "gets the membercount for the server",
  aliases: ["members", "mc"],
  expectedArgs: "",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    const Members = message.guild.memberCount;
    const bots = message.guild.members.cache.filter(
      member => member.user.bot === true
    ).size;
    const humans = message.guild.members.cache.filter(
      member => !member.user.bot
    ).size;
    const online = message.guild.members.cache.filter(
      member => member.presence.status === "online"
    ).size;
    const offline = message.guild.members.cache.filter(
      member => member.presence.status === "offline"
    ).size;
    const dnd = message.guild.members.cache.filter(
      member => member.presence.status === "dnd"
    ).size;
    const idle = message.guild.members.cache.filter(
      member => member.presence.status === "idle"
    ).size;

    const embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setTitle(`Members Information`)
      .addField(`All Members`, Members)
      .addField(`Humans`, humans)
      .addField(`Bots`, bots)
      .addField(
        `Members Status`,
        `Online: ${online} | Do Not Disturb: ${dnd} | Idle: ${idle} | Offline: ${offline}`
      )
      .setTimestamp();

    message.channel.send(embed);
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