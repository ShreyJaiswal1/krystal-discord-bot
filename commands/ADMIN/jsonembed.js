const ee = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "jsonembed",
  expectedArgs: '<Channel mention> <JSON>',
  category: "ADMIN",
  aliases: ["json"],
  cooldown: "7s",
  description: "Sends a message embed to a specified channel",
  callback: ({ message, instance, prefix, args }) => {
    if(!message.member.hasPermission("EMBED_LINKS"))return message.channel.send(`You need \`EMBED_LINKS\` permissions to use this command.`);
    // get the target channel
    const targetChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!targetChannel) {
      message.reply('Please specify a channel to send the embed in');
      return;
    }

    // removes the channel mention
    args.shift();

    try {
      // get the JSON data
      const json = JSON.parse(args.join(' '));
      const { text = '' } = json;

      // send the embed
      targetChannel.send(text, {
        embed: json,
      });
      message.channel.send(new MessageEmbed()
      .setTitle("EMBED SENT SUCESSFULLY!!")
      .setColor(ee.embedcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(`Delivered your embed message to ${targetChannel}`));
    } catch (error) {
     message.channel.send({embed: {
    title: `:x: | ERROR`,
    description: `Invalid JSON please go to this link and convert your embed to JSON format\n**[CLICK HERE FOR CONVERSION](https://bastion.traction.one/tools/embedbuilder)**\n\n**EXAMPLE:** ${instance.getPrefix(message.guild)}embed #general { "color": 65535, "title": "HELLO", "description": "Hi this is a example embed" }`,
    color: ee.wrongcolor,
    footer: {
      text: ee.footertext,
      icon_url: ee.footericon
    }
  }});
    }
  },
};
/**
 * @INFO
 BOT CODED BY SHREY#5420 
 PLEASE MENTION HIM WHILE USING THIS CODE
 PLEASE DONT MISUSE CODE FOR RESELLING OR GIVEAWAY
* @INFO
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/