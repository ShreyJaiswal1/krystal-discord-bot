const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require('node-fetch');
const { MessageButton } = require('discord-buttons');

module.exports = {
  name: "fishing",
  description: "starts a fishing game",
  aliases: ["fishing.io"],
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send("You have to be in a vc")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "814288819477020702",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("Sadly i cant start this game")
        const e = new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle(`CLICK BUTTON TO PLAY FISHING GAME!!`)
        .setDescription(`<a:Games:872888505351680040> [CLICH ME](https://discord.com/invite/${invite.code}) to start playing game\nNote: This feature might not work on phone!!`);
        const button = new MessageButton()
        .setStyle('url')
        .setEmoji('872888505351680040')
        .setURL(`https://discord.com/invite/${invite.code}`)
        .setLabel('Click here')
        message.channel.send(e, button)
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