const process = require('child_process');
const config = require("../../config.json");
//code is shitty
module.exports = {
    name: 'bash',
    description: 'Use Shell/CMD/Terminal Command Via Discord.',
    aliases: ['terminal', 'shell'],
    ownerOnly: true,
    category: "OWNER",
    run: async({message, args, client, prefix}) => {

        const msg = await message.channel.send({embed: {
            title: 'Running Shell Command.',
            description: "Please wait, 7 Second⏲.",
            color: config.embedcolor
        }})

        msg.delete({timeout: 7000});

        process.exec(args.join(" "), (error, stdout) => { let result = (stdout || error)
        message.channel.send(result, {code: "asciidoc", split: '\n'}).catch(err => message.channel.send({embed: {
            title: "Error was Found.",
            color: "RED",
            description: `${err}`
        }}))
        })
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