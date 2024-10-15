const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "unban",
   description: "Unbans the user from its id",
   aliases: ["deban", "uban"],
   category: "MODERATION",
   expectedArgs: "<user_id> [reason]",
   callback: async ({message, client, prefix, args, instance}) => {
     try {
      if (message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`:x: You need \`ADMINISTRATOR\` permission to use this command`)
  let target = args[0];
if(!target){
  message.channel.send("Please provide me a user id/username or use \`unban all\`")
}
if(args[0] === "all") {
  message.guild.fetchBans().then(bans => {
    if (bans.size == 0) {message.reply("There are no banned users.");};
    bans.forEach(ban => {
        message.guild.members.unban(ban.user.id);
    });
}).then(() => message.reply("Unbanned all users.")).catch(e => console.log(e))
} 
        let bannedMemberInfo = await message.guild.fetchBans();
        let dmsend = client.users.cache.get(args[0]);
  let bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**User id not banned.**")

        let reason = args.slice(1).join(" ");
   message.guild.members.unban(bannedMember.user.id, reason);
   
   let unban = new MessageEmbed()
   .setTitle("USER UNBANNED SUCCESSFULLY!!")
   .setDescription(`**${bannedMember.user.tag}** has been unbanned for **\`${reason || "NO REASON"}\`**`)
   .setFooter(config.footertext, config.footericon)
   .setColor(config.embedcolor);
  message.channel.send(unban);
  
      try{
     let banEmbed = new MessageEmbed()
     .setTitle(`YOU HAVE BEEN UNBANNED`)
     .setColor(config.embedcolor)
     .setDescription(`Guild Name: **${message.guild.name}**\nModerator: **${message.author.tag}**\nReason: **${reason || "No reason given"}**`);
     target.user.send(banEmbed);
     
      } catch(err) {
        message.channel.send("I could not dm user because their dm is off");
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