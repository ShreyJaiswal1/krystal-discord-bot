const Discord = require("discord.js");
const config = require("../../config.json");
let os = require("os");
let cpuStat = require("cpu-stat");
const { duration } = require('../../handlers/functions');

module.exports = {
  name: "botinfo",
  description: "gets the info about the bot",
  aliases: ["bot"],
  expectedArgs: "",
  category: "MISC",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    cpuStat.usagePercent(function (e, percent, seconds) {
        if (e) {
            return console.log(String(e.stack).red);
        }
        let coder = client.users.cache.get("694480378769178645");
        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map((guild) => guild);
        for (let i = 0; i < guilds.length; i++) {
            if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
        }
        if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
        const botinfo = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle(`**${client.user.username} Stats:**`)
            .setColor(config.embedcolor)
            .addField("Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
            .addField("Uptime ", `\`${duration(client.uptime)}\``, true)
            .addField("Users", `\`Total: ${client.users.cache.size} Users\``, true)
            .addField("Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
            .addField("Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
            .addField("Text-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "text").size}\``, true)
            .addField("Emojis", `\`${client.emojis.cache.size}\``, true)
            .addField("Connected Channels", `\`${connectedchannelsamount}\``, true)
            .addField("Discord.js", `\`v${Discord.version}\``, true)
            .addField("Node", `\`${process.version}\``, true)
            .addField("CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
            .addField("CPU usage", `\`${percent.toFixed(2)}%\``, true)
            .addField("Arch", `\`${os.arch()}\``, true)
            .addField("Platform", `\`${os.platform()}\``, true)
            .addField("API Latency", `\`${client.ws.ping}ms\``, true)
            .addField("Developer", `Tag: ${coder.tag}\nMention: ${coder}`, true)
            .setFooter(config.footertext, config.footericon);
        message.channel.send(botinfo);
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