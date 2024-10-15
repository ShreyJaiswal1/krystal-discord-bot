const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "dmuser",
  description: "dms a user",
  aliases: ["dm"],
  expectedArgs: "<user> <message>",
  category: "OWNER",
  ownerOnly: true,
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
    if(!message.member.hasPermission("EMBED_LINKS"))return message.channel.send(`You need \`EMBED_LINKS\` permissions to use this command.`);
    // get the target channel
    const targetuser = message.mentions.channels.first() || client.users.cache.get(args[0]);
    if (!targetuser) {
      message.reply('Please specify a user to send message.');
      return;
    }

    // removes the channel mention
    args.shift();

    try {
      // get the JSON data
      const json = JSON.parse(args.join(' '));
      const { text = '' } = json;

      // send the embed
      targetuser.send(text, {
        embed: json,
      });
      message.channel.send(new MessageEmbed()
      .setTitle("MESSAGE SENT SUCESSFULLY!!")
      .setColor(config.embedcolor)
      .setFooter(config.footertext, config.footericon)
      .setDescription(`Delivered your embed message to ${targetuser.tag}`));
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