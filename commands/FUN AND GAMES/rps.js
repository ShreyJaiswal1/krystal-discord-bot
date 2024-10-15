const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "rps",
  description: "starts a rock paper scissors game",
  aliases: ["rockpaperscissors"],
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let embed = new MessageEmbed()
    .setTitle("RPS GAME")
    .setColor(config.embedcolor)
    .setDescription("React to play!")
    .setTimestamp()
    let msg = await message.channel.send(embed)
    await msg.react("🗻")
    await msg.react("✂")
    await msg.react("📰")

    const filter = (reaction, user) => {
        return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    const choices = ['🗻', '✂', '📰']
    const me = choices[Math.floor(Math.random() * choices.length)]
    msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        async(collected) => {
            const reaction = collected.first()
            let result = new MessageEmbed()
            .setTitle("RESULT")
            .setColor(config.wrongcolor)
            .addField("Your choice", `${reaction.emoji.name}`)
            .addField("My choice", `${me}`)
        await msg.edit(result)
        await msg.reactions.removeAll();
            if ((me === "🗻" && reaction.emoji.name === "✂") ||
            (me === "📰" && reaction.emoji.name === "🗻") ||
            (me === "✂" && reaction.emoji.name === "📰")) {
                message.reply("You lost!");
        } else if (me === reaction.emoji.name) {
            return message.reply("It's a tie!");
        } else {
            return message.reply("You won!");
        }
    })
    .catch(collected => {
            message.reply('Process has been cancelled since you did not respond in time!');
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