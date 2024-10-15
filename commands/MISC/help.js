const { MessageEmbed} = require('discord.js');
const { MessageMenuOption, MessageMenu, MessageActionRow, ButtonCollector } = require('discord-buttons');
const { Categorias } = require('../../handlers/categories.json');
const config = require('../../config.json');

module.exports = {
  name: 'help',
  aliases: 'commands',
  description: `shows you help about every command in the bot`,
  category: 'MISC',
  expectedArgs: '<command>',
  maxArg: 1,
  callback: async ({ client, message, prefix, instance, args }) => {
    // Check si tiene argumentos
    if (args.length == 1) {
      let select = instance.commandHandler.commands.find(x => x.names.includes(args[ 0 ]))
      if (select == undefined) {
        message.channel.send('No command found for ' + args[0]); 
      } else {
        const helpembed = new MessageEmbed()
          .setAuthor(`${client.user.username.toUpperCase()} COMMANDS`)
          .setDescription(`Command: **${select.names[ 0 ]}** \n ${select.description}\n`)
          .setFooter(config.footertext, config.footericon)
          .setColor(config.embedcolor);
        if (select.names.length > 1) {
          helpembed.addField('**Aliases**', `\`${select.names.join(' - ')}\``)
        }
        if (select.syntax) {
          helpembed.setDescription(`Command: **${select.names[ 0 ]}** \n ${select.description} \nUsage: \`\`\`${select.names[ 0 ]} ${select.syntax}\`\`\``)
        }
        message.channel.send(helpembed);
      }
      return
    }

    // Menu
    const Menu = new MessageMenu()
      .setID('help')
      .setPlaceholder('Select your help category');

    Categorias.forEach(category => {
      let option = new MessageMenuOption()
        .setLabel(category.name)
        .setValue(category.id)
        .setEmoji(category.emoji)
        .setDescription(category.description);
      Menu.addOption(option)
    });


    // Action Rows
    const Row1 = new MessageActionRow()
      .addComponent(Menu)

    const embed = new MessageEmbed()
      .setAuthor(client.user.username.toUpperCase())
      .setDescription(`Hi, i am ${client.user.username}. A multipurpose bot with more than 230 commands!!\nYou can use **\`${prefix}help <command>\`** for more help.\n\n**[INVITE ME](${config.invite}) | [SUPPORT SERVER](${config.support})**`)
      .setColor(config.embedcolor)
      .setFooter(config.footertext, config.footericon);

    // Build page
    function buildPage(categoria, Commands, message) {
      let list = [];
      const eachCommand = Commands.forEach(element => {
        list.push(`\`${element.names[ 0 ]}\``)
      });
      const newPage = new MessageEmbed()
        .setAuthor(client.user.username.toUpperCase())
        .setFooter(config.footertext, config.footericon)
        .setDescription(`Hi, i am ${client.user.username}. A multipurpose bot with more than 230 commands!!\nYou can use **\`${prefix}help <command>\`** for more help.\n\n**[INVITE ME](${config.invite}) | [SUPPORT SERVER](${config.support})**`)
        .addField(`CATEGORY ${categoria.name}`, `${list.join(', ')}`)
        .setColor(config.embedcolor);
      message.edit(newPage, { components: [ Row1 ] })

    }

    let filter = (menu) => {
      menu.clicker.id == message.author.id;
    }

    await message.channel.send(embed, { components: [ Row1 ] }).then(async msg => {
      let col = msg.createMenuCollector((b) => filter, { time: 60000 })

      col.on('collect', (b) => {
        let Commands = instance.commandHandler.commands.filter(m => m.category == b.values);
        let categ = Categorias.find(x => x.id == b.values)
        b.reply.defer()
        buildPage(categ, Commands, msg)
        b.resetTimer
      })

      col.on('end', () =>{
        msg.edit(msg.embeds[0],{components: null});
      })
      
    })

  }
}