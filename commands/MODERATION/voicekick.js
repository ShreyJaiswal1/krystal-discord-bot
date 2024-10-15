const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "voicekick",
  description: "kicks the mentioned user from vc",
  aliases: [""],
  expectedArgs: "<user>",
  category: "MODERATION",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
    return message.channel.send(
      "I Don't Have Proper Permissions To Use This Command!"
    );

  if (!message.mentions.members.first())
    return message.channel.send(
      `Please Mention User That You Want To Kick From Voice Channel!`
    );

  let { channel } = message.mentions.members.first().voice;

  if (!channel)
    return message.channel.send(`User Is Not In Any Voice Channel!`);

  message.mentions.members.first().voice.kick();
  
  message.channel.send(`User Has Been Kicked From Voice Channel!`)
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