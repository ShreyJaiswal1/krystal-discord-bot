const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
  };
  
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
  });
module.exports = {
  name: "emojify",
  description: "gets a emojify text",
  aliases: [""],
  expectedArgs: "<text>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(args.length < 1) {
       return message.channel.send('You must provide some text to emojify!');
       }
    if(args.length > 100) {
       return message.channel.send('You cannot exceed 100 characters!');
       }
      await message.delete();
      message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(''));
    
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