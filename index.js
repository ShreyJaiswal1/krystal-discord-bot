
// IMPORTING LIBRARIES


const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
const smartestchatbot = require("smartestchatbot");
const config = require("./config.json");
require("dotenv").config();
require("discord-reply");
const scb = new smartestchatbot.Client(config.chatbot);
const client = new DiscordJS.Client({
    
    partials: ['MESSAGE', 'REACTION']
});
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const colors = require("colors");
require('discord-buttons')(client);
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const { MessageButton, MessageActionRow } = require("discord-buttons");
// KEEP ALIVE
/**
const express = require(`express`);
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send("Hey i'm online :D"));
app.listen(port, () =>
 console.log(`KEEPING PROJECT ALIVE!!`)
);
**/

console.log("LOADING BOT...");
// READY EVENT

client.on('ready', () => {

// STATUS 
setInterval(() => {
client.user.setActivity(`${config.PREFIX}help | GUILDS - ${client.guilds.cache.size} | USERS - ${client.users.cache.size}`, {type: "LISTENING"});
}, 2000);

// command handler


   let wok = new WOKCommands(client, {
        commandsDir: 'commands',
        del: 5,
        defaultLangauge: "english",
        ignoreBots: true,
        dbOptions: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }, disabledDefaultCommands: [
            'help',
          //  'command',
              'language',
          //    'prefix',
          //  'requiredrole'
        ] })
        .setDefaultPrefix(config.PREFIX)
        .setColor(config.embedcolor)
        .setMongoPath(process.env.mongodb)
        .setBotOwner(config.OWNER)
        .on("databaseConnected", async (connection, state) => {
          console.log(`CONNECTED TO DATABASE!!`.green);
          console.log(`${client.user.tag.toUpperCase()} IS ONLINE!!`.green);
        });

// snipe eventthe
client.snipes = new DiscordJS.Collection();
client.on('messageDelete', message => {
  client.snipes.set(message.channel.id, message)
});
//message event 

client.on("message", async(message) => {
  
  //smartestchatbot
  
  try { 
    if(db.has(`_${message.guild.id}`)){
  let chatchannel = db.get(`_${message.guild.id}`);
   if(message.author.bot) return;
   if(message.channel.id === chatchannel){
    message.channel.startTyping();
   scb.chat({message: message.content, name: client.user.username, owner:"shrey", user: message.author.username, language:"en"}).then(reply => {
    message.lineReply(reply);
    message.channel.stopTyping();
    
   });
   }
    } else
    
  //pingEmbed
    if(message.content.includes(client.user.id)) {
  
    let pingEmbed = new MessageEmbed()
    .setAuthor(client.user.username.toUpperCase(), client.user.displayAvatarURL())
    .setColor(config.embedcolor)
    .setDescription(`<a:Hey:951935416595017858> Hey, i am **${client.user.username}** my prefix on this server is **${wok.getPrefix(message.guild)}**\nPlease type \`${wok.getPrefix(message.guild)}help\` to get started`);
    message.channel.send(pingEmbed);
  } else return;
  } catch(error) {
    console.log(error);
  }
});
});
 // welcome message_embed
 client.on("guildMemberAdd", async member => {
  let chx = db.get(`wel_img_${member.guild.id}`);
  let text = db.get(`wel_${member.guild.id}`);
  let greet = db.get(`wel_g_${member.guild.id}`);
  let embed = db.get(`wel_e_${member.guild.id}`);

  //image welcome
  if (db.has(`wel_img_${member.guild.id}`)){
 let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/861318201157091368/873171779923873802/images.jpeg",blur: true }) 
 const attachment = new DiscordJS.MessageAttachment(data, "welcome-image.png");
 member.guild.channels.cache.get(chx).send(`<a:welcome:873182380607823872> Hey ${member.user} welcome to **${member.guild.name}** You are our **${member.guild.memberCount}th** Member.\nHope you have great time and make a lot of friends here <a:welcome:873182380607823872>`, attachment);
  }

  // text welcome
  if (db.has(`wel_${member.guild.id}`)){
  member.guild.channels.cache.get(text).send(`<a:welcome:873182380607823872> Hey ${member.user} welcome to **${member.guild.name}** You are our **${member.guild.memberCount}th** Member <a:welcome:873182380607823872>`);
  }

  //embed welcome
  if (db.has(`wel_e_${member.guild.id}`)){
    let msgembed = new DiscordJS.MessageEmbed()
    .setTitle(`WELCOME ${member.user.tag}`)
    .setColor(config.embedcolor)
    .setAuthor(`WELCOME TO ${member.guild.name}`, member.user.displayAvatarURL({dynamic: true}))
    .setDescription(`<a:welcome:873182380607823872> Hey ${member.user} welcome to **${member.guild.name}** You are our **${member.guild.memberCount}th** Member <a:welcome:873182380607823872>`)
    .setTimestamp()

    member.guild.channels.cache.get(text).send(msgembed);
    }
  
  //greet welcome
  if (db.has(`wel_g_${member.guild.id}`)){
    member.guild.channels.cache.get(greet).send(`<a:welcome:873182380607823872> Hey ${member.user} welcome to **${member.guild.name}** You are our **${member.guild.memberCount}th** Member <a:welcome:873182380607823872>`).then(m => m.delete({timeout: 150000}));
    } else {
    return;
  }
});

client.on("guildMemberRemove", async member => {
  let chx = db.get(`bye_img_${member.guild.id}`);
  let text = db.get(`bye_${member.guild.id}`);
  
  if (db.has(`bye_img_${member.guild.id}`)){
 let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/861318201157091368/873896564215677018/images_1.jpeg",blur: true }) 
 const attachment = new DiscordJS.MessageAttachment(data, "bye-image.png");
 member.guild.channels.cache.get(chx).send(`${member.user} just left **${member.guild.name}** we have now **${member.guild.memberCount}** Members.`, attachment);
  }
if (db.has(`bye_${member.guild.id}`)) {
 member.guild.channels.cache.get(text).send(`**${member.user.tag}** just left server we have now **${member.guild.memberCount}** member.`)
} else {
  return;
}
});

client.on("guildCreate", async guild => {
  const channel = client.channels.cache.get(config.createguild);
  //This Gets The Guild Owner
  let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
  let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 });

  const embed = new DiscordJS.MessageEmbed()
     .setTitle('I Joined A Guild!')
     .addField(`GUILD NAME`, guild.name, true)
     .addField(`GUILD ID`, guild.id, true)
     .addField(`GUILD MEMBERCOUNT`, guild.memberCount, true)
     .addField(`GUILD OWNER`, guild.owner.user.tag, true)
     .addField(`GUILD LINK`, invite.url, true)
     .setTimestamp()
     .setColor(config.embedcolor)
     .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
 channel.send(embed);

  const button = new MessageButton()
  .setLabel('Support Server')
  .setStyle('url')
  .setURL(config.support)
  .setEmoji('828738580826292244');
  const button2 = new MessageButton()
  .setLabel('Invite me')
  .setStyle('url')
  .setURL(config.invite)
  .setEmoji('828738580826292244');
  const row = new MessageActionRow()
  .addComponent(button)
  .addComponent(button2);

 let greet = new DiscordJS.MessageEmbed()
 .setTitle(`:heart: THANKS FOR INVITING ME!!`)
 .setDescription(`Hey ${guild.owner.user} thanks for adding me into your guild **${guild.name}** i hope that you will like and promote me!! My default prefix is **\`${config.PREFIX}\`**\nPlease join support server for future support and please add me in all your other servers too!!`)
 .setColor(config.embedcolor)
 .setFooter(config.footertext, config.footericon)
 .setThumbnail(guild.iconURL({dynamic: true}));
 guild.owner.send({embed: greet, component: row});

});

client.on("guildDelete", async guild => {
  db.delete(`mute_${guild.id}`);
  db.delete(`wel_${guild.id}`);
  db.delete(`wel_g_${guild.id}`);
  db.delete(`wel_e_${guild.id}`);
  db.delete(`wel_img_${guild.id}`);
  db.delete(`bye_${guild.id}`);
  db.delete(`bye_img_${guild.id}`);
  db.delete(`_${guild.id}`);
  db.delete(`nsfw_${guild.id}`);

  const channel = client.channels.cache.get(config.deleteguild);

  const embed = new DiscordJS.MessageEmbed()
     .setTitle('I Left A Guild!')
     .addField(`GUILD NAME`, guild.name, true)
     .addField(`GUILD ID`, guild.id, true)
     .addField(`GUILD MEMBERCOUNT`, guild.memberCount, true)
     .addField(`GUILD OWNER`, guild.owner.user.tag, true)
     .setTimestamp()
     .setColor(config.embedcolor)
     .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
 channel.send(embed);

 const button = new MessageButton()
 .setLabel('Support Server')
 .setStyle('url')
 .setURL(config.support)
 .setEmoji('828738580826292244');
 const button2 = new MessageButton()
 .setLabel('Invite me')
 .setStyle('url')
 .setURL(config.invite)
 .setEmoji('828738580826292244');
 const row = new MessageActionRow()
 .addComponent(button)
 .addComponent(button2);

 let greet = new DiscordJS.MessageEmbed()
 .setTitle(`:slight_frown: I AM SORRY`)
 .setDescription(`Hey ${guild.owner.user} i left your guild **${guild.name}** i am really sorry if you dont like me :(\nPlease join support server and report your problem, we will view your issues!!`)
 .setColor(config.embedcolor)
 .setFooter(config.footertext, config.footericon)
 .setThumbnail(guild.iconURL({dynamic: true}));
 guild.owner.send({embed: greet, component: row});

});


["command"].forEach(handler => {
  try{
    require(`./handlers/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});
["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  try{
    require(`./handlers/lavalink/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});


// error handler  xD

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection'.toUpperCase().red);
  console.log('Promise: ', p , 'Reason: ', reason.stack ? reason.stack : reason);
  console.log(`-----------------------------------`.red)
});
process.on("uncaughtException", (err, origin) => {
  console.log('Exeption Error'.toUpperCase());
  console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
  console.log(`-----------------------------------`.red)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Exeption Monitor'.toUpperCase().red);
  console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
  console.log(`-----------------------------------`.red)
});
process.on('beforeExit', (code) => {
  console.log('Before Exit'.toUpperCase().red);
  console.log('Code: ', code);
  console.log(`-----------------------------------`.red)
});
process.on('exit', (code) => {
  console.log('Exit'.toUpperCase().red);
  console.log('Code: ', code);
  console.log(`-----------------------------------`.red)
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log('Multiple Resolves'.toUpperCase().red);
  console.log(type, promise, reason);
  console.log(`-----------------------------------`.red)
});

// logging into the bot for using it for usage
client.login(process.env.token);

/* 

ORIGNAL CODE IS WRITTEN BY SHREY 
 
PLEASE MENTION HIM WHILE USING THIS CODE 

DON'T FORGET TO ADD MY BOTS TO YOUR SERVER 

LINK - https://github.com/ShreyJaiswal1 
DISCORD - https://discord.com/users/694480378769178645

*/