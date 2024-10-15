const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const wiki = require("wikijs").default();

module.exports = {
  name: "wiki",
  description: "gets info about something on wikipedia",
  aliases: ["wikipedia"],
  expectedArgs: "<text>",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    if (!args[0]) return message.channel.send("**Enter A Query!**")
    let m = await message.channel.send({
        embed: {
            color: config.embedcolor,
            title: `Searching Wikipedia just for you ⌛`,
            description: `Please stand by...`,
        },
    });
    let result;
    const search = await wiki.search(args.join(' '));
    if (!search.results.length) {
        return m.edit({
            embed: {
                color: config.embedcolor,
                title: "What was that again? 📚🤓",
                description: "Even Wikipedia doesn't seem to know what you're talking about.",
                footer: {
                    text: "Check for typos or try searching for something else!",
                },
            },
        });
    }
    result = await wiki.page(search.results[0]);
    try {
        let description = await result.summary();
        if (description.length > 8192) {
            const FirstEmbed = new MessageEmbed()
                .setAuthor(result.raw.title)
                .setColor(config.embedcolor)
                .setDescription(`${description.substring(0, 1950)}...\nArticle is too long, click [**here**](${result.raw.fullurl}) to read more!`);
            return m.edit(FirstEmbed);
        } if (description.length < 2048) {
            const SecondEmbed = new MessageEmbed()
                .setAuthor(result.raw.title)
                .setColor(config.embedcolor)
                .setDescription(`${description.slice(0, 2048)}`)
            return m.edit('', SecondEmbed)
        } if (description.length > 2048) {
            const ThirdEmbed = new MessageEmbed()
                .setAuthor(result.raw.title)
                .setColor(config.embedcolor)
                .setDescription(description.slice(0, 2048))
            const FourthEmbed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(description.slice(2048, 4096))
            m.edit('', ThirdEmbed)
            message.channel.send('', FourthEmbed)
        } if (description.length > 4096 && description.length < 6144) {
            const FifthEmbed = new MessageEmbed()
                .setAuthor(result.raw.title)
                .setColor(config.embedcolor)
                .setDescription(description.slice(0, 2048))
            const SixthEmbed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(description.slice(2048, 4096))
            const SeventhEmbed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(description.slice(4096, description.length))
            await m.edit('', FifthEmbed)
            message.channel.send(SixthEmbed)
            message.channel.send(SeventhEmbed)
        } if (description.length > 6144 && description.length < 8192) {
            const EightEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(description.slice(0, 2048));
            const NinthEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(description.slice(2048, 4096));
            const TenthEmbed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(description.slice(4096, 6144));
            const EleventhEmbed = new MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(description.slice(6144, description.length))
            await m.edit('', EightEmbed);
            message.channel.send(NinthEmbed);
            message.channel.send(TenthEmbed);
            message.channel.send(EleventhEmbed);
        }
    } catch (e){
        return m.edit("Not Available!")
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