
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "ping",
  description: "Gets the ping of the bot",
  aliases: ["pong"],
  expectedArgs: "",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let oldate = new Date().getMilliseconds()
    let newtime = new Date().getMilliseconds() - oldate;
      message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle(`:ping_pong: PONG!!`)
        .setDescription(`LATENCY - \`${client.ws.ping}\`ms\n\nAPI PING - \`${client.ws.ping + newtime}\`ms\n\nGATEWAY \`${newtime}\`ms`)
      );
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