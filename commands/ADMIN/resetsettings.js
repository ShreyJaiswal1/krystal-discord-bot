const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require(`quick.db`);

module.exports = {
  name: "resetsettings",
  description: "reset settings for the guild",
  aliases: ["resetall"],
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You dont have \`ADMINISTRATOR\` permissions to use this command.`);
     db.delete(`mute_${message.guild.id}`);
     db.delete(`wel_${message.guild.id}`);
     db.delete(`wel_img_${message.guild.id}`);
     db.delete(`bye_${message.guild.id}`);
     db.delete(`bye_img_${message.guild.id}`);
     db.delete(`_${message.guild.id}`);
     db.delete(`nsfw_${message.guild.id}`);
     db.delete(`wel_g_${message.guild.id}`);
     db.delete(`wel_e_${message.guild.id}`);

     let embed = new MessageEmbed()
     .setColor(config.embedcolor)
     .setTitle(`RESETED ALL SETTINGS!!`)
     .setFooter(config.footertext, config.footericon)
     .setDescription(`Sucessfully reset all settings for this guild!!`);

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