const axios = require("axios");

module.exports = {
name: "discord",
aliases: ["djs", "docs"],
category: "MISC",
description: "Shows doc's from discord.js",
expextedArgs: "<query>",

run: async({client, message, args}) => {
try {
 const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
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