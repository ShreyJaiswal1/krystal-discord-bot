const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "embed",
  description: "Embeds a message to a channel",
  aliases: [""],
  expectedArgs: "<title> + <description>",
  category: "ADMIN",
  permission: ["EMBED_LINKS"],
  callback: async ({message, client, prefix, instance, args, text}) => {
   try {
    const argsneu = message.content.slice(5 + prefix.length).split(`+`);
    if (!argsneu)
      return message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`:x: Error | Wrong Command Usage, please add arguments!`)
        .setDescription(`Useage: \`${prefix}embed <Title> + <Description>\``)
      );

    const Title = argsneu[0];
    if (Title.length > 256)
      return message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`:x: Error | Title is only allowed to be \`256\` Letters Long!`)
        .setDescription(`Useage: \`${prefix}embed <Title> + <Description>\``)
      );

    const Description = argsneu.slice(1).join(` `);
    if (Description.length > 2048)
      return message.channel.send(new MessageEmbed()
        .setColor(config.embedcolor)
        .setFooter(config.footertext, config.footericon)
        .setTitle(`:x: Error | Description is only allowed to be \`2048\` Letters Long!`)
        .setDescription(`Useage: \`${instance.getPrefix(message.guild)}embed <Title> + <Description>\``)
      );

    const embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setFooter(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))
      .setTimestamp();
    try {
      embed.setTitle(Title);
    } catch {
      /* */ }
    try {
      embed.setDescription(Description);
    } catch {
      /* */ }
    message.channel.send(embed).catch(e => console.log("Couldn't delete msg, this is for preventing a bug"));
    message.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug"));
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