const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const answers = [
    "Maybe.",
    "Certainly Not.",
    "I hope so.",
    "Not in your wildest dreams.",
    "There is a good chance.",
    "Quite likely.",
    "I think so.",
    "I hope so.",
    "I hope not.",
    "Never!",
    "Fuhgeddaboudit",
    "Ahaha! Really?",
    "Pfft.",
    "Sorry, bucko.",
    "Hell, yeah!",
    "Hell, yes.",
    "Hell to the no.",
    "The future is bleak.",
    "The future is uncertain.",
    "I would rather not say",
    "Who cares?",
    "Possibly.",
    "Never, ever, ever.",
    "There is a small chance.",
    "Yes!",
    "Y E S",
    "Ähem, no..",
    "No, straight up, no!",
];

module.exports = {
  name: "8ball",
  description: "Gets a random answer of your question",
  aliases: ["question"],
  expectedArgs: "<question>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
     if(args[0]==null) return message.channel.send('Please provide a Question');
     return message.reply(`${answers[Math.floor(Math.random() * answers.length)]}`);
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