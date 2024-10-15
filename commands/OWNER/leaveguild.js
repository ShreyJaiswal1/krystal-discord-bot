const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "leaveguild",
  description: "Leaves a guild",
  aliases: ["leaveserver"],
  expectedArgs: "<guild>",
  category: "OWNER",
  ownerOnly: true,
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     const target = client.guilds.cache.find(g => g.name === args.join(" ")) || client.guilds.cache.get(args[0]);
     if(!target)return message.channel.send(`No guilds found for ${args.join(" ")}`);
     target.leave();
     message.channel.send(new MessageEmbed()
     .setTitle(`LEFT GUILD`)
     .setColor(config.embedcolor)
     .setDescription(`I left the guild **${target.name}**`));
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