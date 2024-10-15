const { MessageEmfuse, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "fuse",
  description: "Gets a fuse image for you",
  aliases: ["fused"],
  expectedArgs: "<mention1> <mention2>",
  category: "IMAGE",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!message.mentions.users.first()) return message.channel.send(`You have not defined your users.`); //If the message did not include mentioned users
    var count = 0; //To find out what user we're on.
    let user1; //Defining the users
    let user2; //Defining the users
    message.mentions.users.forEach(user => {
        count++; //Adding one onto the count variable
        if (count >= 3) return; //If the user mentioned more than two users return
        if (count === 1) user1 = message.guild.members.cache.get(user.id); //Getting the first mentioned user
        else user2 = message.guild.members.cache.get(user.id); //Getting the second mentioned user
    });
    let image = await canvacord.Canvas.fuse(user1.user.displayAvatarURL({format: 'png'}),  user2.user.displayAvatarURL({format: 'png'}));
 let attachment = new MessageAttachment(image, 'fuse.png');
   message.channel.send(attachment);
} catch(error) {
  console.log(error);
  
  message.channel.send({emfuse: {
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