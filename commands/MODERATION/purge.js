const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "purge",
  description: "bulk deletes messages",
  aliases: ["clear"],
  expectedArgs: "<message_count>",
  category: "MODERATION",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
       if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send(`You dont have permissions to use this command`).then(m => m.delete({timeout: 4000}));
       if(!args[0])return message.channel.send(`please provide the number of messages you want to delete`);
      if(args[0] < 1)return message.channel.send(`please provide the number of messages`).then(m => m.delete({timeout: 4000}));
      if(args[0] > 100)return message.channel.send(`please provide me number between 0 to 100`).then(m => m.delete({timeout: 4000}));
         let something = args[0];
         if(isNaN(something)) return message.channel.send(`Please enter a valid number of messages`);
        message.delete();
        message.channel.bulkDelete(something);
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