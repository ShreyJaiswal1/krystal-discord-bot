module.exports = {
  name: `getinvite`,
  category: `OWNER`,
  aliases: [`getinv`],
  ownerOnly: true,
  description: `Gets the invite link of the guild where bot is in`,
  usage: `<guild_id>`,
  run: async ({client, message, args, cmduser, text, prefix}) => {

        if (!args[0]) return message.channel.send("Enter Guild Name or Guild ID of where you want Invite Link.")

        if(args[0]){
            let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
            let found = client.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("That's the Invalid Guild Name");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Sorry, I doesn't have CREATE_INSTANT_INVITE Permission There!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - I'm not in that Server.`);
        }

    }

}
/**
 * @INFO
 BOT CODED BY SHREY#5420 
 PLEASE MENTION HIM WHILE USING THIS CODE
 PLEASE DONT MISUSE CODE FOR RESELLING OR GIVEAWAY
 * @INFO
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/