const figlet = require("figlet");

module.exports = {
    name: "ascii",
    aliases: ["asci"],
    category: "FUN AND GAMES",
    expectedArgs: "<text>",
    description: "Returns provided text in ascii format.",
    callback: async ({message, client, prefix, args, text}) => {
        try {
      
   let ascii = args.join(" ");
   if(!ascii) {
return message.channel.send(`Please provide text for the ascii conversion!`);
}

if(ascii.length > 20) {
return message.channel.send(`Please put text that has 20 characters or less because the conversion won't be good!`);
}
  
figlet(ascii, function(err, data) {
message.channel.send(data, {
code: 'AsciiArt' 
});
});
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