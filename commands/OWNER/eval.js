const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
const ee = require(`../../config.json`);

const {
  inspect
} = require(`util`);

module.exports = {
  name: `eval`,
  minArgs: 1,
  ownerOnly: true,
  category: `OWNER`,
  aliases: [`evaluate`],
  description: `eval Command`,
  expectedArgs: `<CODE>`,
  run: async ({client, message, args, text, instance, prefix}) => {
    let evaled;
    try {
      if (args.join(` `).includes(`token`)) return console.log(`ERROR NO TOKEN GRABBING ;)`);

      evaled = await eval(args.join(` `));
      //make string out of the evaluation
      let string = inspect(evaled);
      //if the token is included return error
      if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`);
      //define queueembed
      let evalEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Evaluation`)
        .setColor(ee.embedcolor);
      //split the description
      const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      });
      //For every description send a new embed
      splitDescription.forEach(async (m) => {
        //(over)write embed description
        evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);
        //send embed
        message.channel.send(evalEmbed);
      });
    } catch (e) {
      console.log(String(e.stack))
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`:x: ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 BOT CODED BY SHREY#5420 
 PLEASE MENTION HIM WHILE USING THIS CODE
 PLEASE DONT MISUSE CODE FOR RESELLING OR GIVEAWAY
 * @INFO
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/