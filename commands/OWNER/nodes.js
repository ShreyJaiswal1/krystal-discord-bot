const {
    MessageEmbed
  } = require(`discord.js`);
  const config = require(`../../config.json`);

  module.exports = {
    name: `nodes`,
    category: `OWNER`,
    aliases: [``],
    description: `Gets the node stats`,
    ownerOnly: true,
    run: async ({client, message, args, text, prefix}) => {

        let all = []
  
          client.manager.nodes.forEach(node => {
              let info = []
              info.push(`Node: ${(node.options.identifier)}`)
              info.push(`Player: ${node.stats.players}`)
              info.push(`Playing Players: ${node.stats.playingPlayers}`)
              info.push(`Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
              info.push(`\nMemory`)
              info.push(`Reservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb`)
              info.push(`Used Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb`)
              info.push(`Free Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb`)
              info.push(`Allocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb`)
              info.push("\nCPU")
              info.push(`Cores: ${node.stats.cpu.cores}`)
              info.push(`System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`)
              info.push(`Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)
              all.push(info.join('\n'))
          });
  
          const embed = new MessageEmbed()
              .setAuthor('Lavalink Node', client.user.displayAvatarURL())
              .setColor(config.embedcolor)
              .setDescription(`\`\`\`${all.join('\n\n----------------------------\n\n')}\`\`\``)
          message.channel.send(embed)  
        }
    }