const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require('node-fetch');

module.exports = {
  name: "insta",
  description: "gets a info about the user",
  aliases: ["instagram", "ig"],
  expectedArgs: "<user>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     try{
    const name = args.join(" ");

    if (!name) {
        return message.channel.send("**Please Enter A Name!**")
            .then(m => m.delete({timeout: 5000}));
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
        res = await fetch(url).then(url => url.json());
    } catch (e) {
        return message.channel.send("I couldn't find that account").then(msg => {
            msg.delete({timeout: 5000})
        })
    }

    const account = res.graphql.user;

    const embed = new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle(account.full_name)
        .setURL(`https://instagram.com/${name}`)
        .setThumbnail(account.profile_pic_url_hd)
        .setDescription("Profile information")
        .addField("**Username**", `${account.username}`)
        .addField("**Full name**", `${account.full_name}`)
        .addField("**Biography**", `${account.biography.length == 0 ? "none" : account.biography}`)
        .addField("**Posts**", `${account.edge_owner_to_timeline_media.count}`)
        .addField("**Followers**", `${account.edge_followed_by.count}`)
        .addField("**Following**", `${account.edge_follow.count}`)
        .addField("**Private account**", `${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);

    message.channel.send(embed);
  } catch(e) {
    message.channel.send(`**:x: No user found with this username**`)
  }
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