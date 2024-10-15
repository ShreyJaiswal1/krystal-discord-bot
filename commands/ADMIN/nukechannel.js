const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "nukechannel",
  description: "nukes the current chaanel",
  aliases: ["nuke"],
  expectedArgs: "",
  category: "ADMIN",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`You do not have \`ADMINISTRATOR\` permission to use this command`);
    message.channel.send(new MessageEmbed()
    .setFooter(`Note: This is an irreversable action`)
    .setColor(config.wrongcolor)
    .setTitle(`ARE YOU SURE??`)
    .setDescription(`Are you sure to nuke this channel??\nReply with \`yes\` or \`no\``)).then(() => {
        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y' || message.content.toLowerCase() == 'yes') {
              message.channel.clone().then(ch => {
                ch.setPosition(message.channel.position)
                message.channel.delete();
                ch.send(new MessageEmbed()
               .setTitle("NUKED CHANNEL")
               .setColor(config.embedcolor)
               .setImage(`https://c.tenor.com/wjVPrdbJWngAAAAM/bomb-war.gif`)
               .setFooter(config.footertext, config.footericon)
               .setDescription(`This channel is nuked by ${message.author.tag}`));
              })
            } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N' || message.content.toLowerCase() == 'no') {
              message.channel.send(`Terminated`)
            } else {
              message.channel.send(`Terminated: Invalid Response`)
            }
          })
          .catch(collected => {
              message.channel.send('Timeout');
          });
      })
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