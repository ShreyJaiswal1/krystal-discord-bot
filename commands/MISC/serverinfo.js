const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const moment = require('moment');

module.exports = {
  name: "serverinfo",
   description: "Gets info about server",
   aliases: ["server"],
   category: "MISC",
   callback: async ({message, client, prefix, args}) => {
     try {
       
    let owner = [];
        await client.users.fetch(message.guild.ownerID).then(o => owner.push(o.tag));
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setTitle("**Server Info**")
            .setColor(config.embedcolor)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**Name:** ${message.guild.name}`,
                `**ID:** ${message.guild.id}`,
                `**Owner:** ${owner} (${owner.id})`,
                `**Region:** ${regions[message.guild.region]}`,
                `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
                '\u200b'
            ])
            .addField('Statistics', [
                `**Role Count:** ${roles.length}`,
                `**Emoji Count:** ${emojis.size}`,
                `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**Member Count:** ${message.guild.memberCount}`,
                `**Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**Bots:** ${members.filter(member => member.user.bot).size}`,
                `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
    .setFooter(config.footertext, config.footericon)
            .setTimestamp();
        message.channel.send(embed);


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