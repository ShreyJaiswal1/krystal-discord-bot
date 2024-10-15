const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "quoteimg",
  description: "Gets a quote image for you",
  aliases: [""],
  expectedArgs: '<user> <message>',
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("You need to mention a user and provide text!")

    let msg = args.slice(1).join(" ");

    const e = user.displayAvatarURL({ format: 'png' })

    const img = await canvacord.Canvas.quote({ username: `${user.username}`, color: user.displayHexColor, message: `${msg}`, image: e })
    let attachment = new MessageAttachment(img, "quote.png");
    return message.channel.send(attachment);

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