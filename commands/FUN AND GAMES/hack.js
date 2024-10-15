const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const randomtoken = [

  'mfa.5gELW1RPQBMbN37-bUDaPJX6zrIxFYyp_SwAKCyuhvlMiT_lT7LrkJg-Nhog-hg9xKgpGx46Ijv3345BVrnz',
  'mfa.tiEnkDcl5RWzaVdJ5SrTJFYp2iIojCdvBRxtxHLqzkskyaf6I8eAmno5GBLbyEGaQsZ2EijrnMHqN673NbAV',
  'mfa.83JIF1-8HrLYFAkgyFm95W-HnbUpSrxRfsg5885pWRzNQcacCEp4I_VOQqj3nnhxdIUSBOtgos1b3l1XWAfn',
  'mfa.dRjGHCDO1v4ZN5Dd_xi3L5_fGkJGQhUrHIovEDnQrv7_nZozsGlqFByTvjnRZJFIGwUktkkO1jFn8pVmXRNl',
  'mfa.Ywo8QH5qPSSLI-Iz3Om1LSpOjGQA5m3B58If223CnDW4gcW1JcgoZjq1KGTzd7qGhJZ61HCzFGhxBosKNecj',
  'mfa.5UMYCFQzOYcX_FRLOKPRcR_q39DYTmK2Y25LnhL-vk2HuumTharWE_4uZFzTIsIuBRDZf3t9BEzx2VhzCOWK',
  'mfa.H4xROSlKZ9BPqZUcxrhPFfqlD4N2yP2q3qDM8a7tD_IL91tZ5ornEl9nlDSCkyfD-C17aRd6L_R5ks1FPRnf',
  'mfa.AiN8KEaHw5gTADiYixocckenV293T9YkGwfhaabydNL1blRXKmBwQgPnShcCn3WLUiuIi_tHsCqDVmGvZz7O',
  'mfa.2_glZrYuwOpAF5hGZzhfdWnOGOILI1v39ApJxEZM9q92K-a71ZZuh_uUzvGyMpjqmWXJqkYzEVTuo6GpWiYF',
  'mfa.cc1y8siyfZZ_R9jJbnP_i7TmM_SEPQDUt8BYXUKGW9UrxbjxUehoDBV6pbD-V6wHadoGRA6IoCMqRHgQ8yIh',
  'mfa.CU2SmEkuWVeNrcCS9JK4IDD3MmbXIfTYfqKeVRfqxI8isC9XU7XZwgGHAceSFMaihukC14Qbpc-BdW3EUVpm',
  'mfa.92oB1AoFp3uW4nAW5YTNqHIWx1ebcR3RX9_rdgBHEhKSQcxKG1cffqbPFUFfpYaZTnjIorQUF_1kbZmdjvto',
  'mfa.h-BsWSEnBxwA6Ko5q-XrN9YhWwygledQZIL835XwI8SMBJIJHZLssz44M_xqAGOmLMtLGpFEIMW98UBIHLZq',
  'mfa.Y-DdagvnpvE2PMkUkJCJQlKmTACGLwm9-BlEHPKTDS6Xb1L3mfsxMaQc3sSw3ZdZSk76fl-Q5EuabjJfriEV',
  'mfa.FZbOvI5_nJzQelxLKzbTc_cnivX2cBuk7AvKwzURHiCJmd35rgT6hUGknnSbVVD_WzQdQKgezM-6RLRlrhaV',
  'mfa.9UyGffOqO2YzzmFiA_mOxi3ZUnOsZDvoDUPW_fRPLNu1buA6r3r2F3Qx2PpMItn792npMts51n42sENxVCas',
  'mfa.id33AHQfarbPs1XIpeGcgfEnDtoN_p4xbbNkPCN-q5kraD4iQUrTxRrAvbuLg-PUXvGKaQy47HD_D1w-TUWw',
  'mfa.HUJqHMO4S33eTAdYNVRcj6QKfy_G-Au3HHnojpKxQOcQaRpWFUNHPymh27HTrWvWyfnwrg_rDVjQ1i3U8wlL',
  'mfa.LkF8UlJ-BwvCoxaXJV_f2hjNzUYyQImCBEKEl5f8Y94hbcaTqtsGFjpmxpRmRz53L_PpdmHe5HQY8fzdviyr',
  'mfa.J_zsrMKA2xmIwWpJ28Sr3hPGYeBF1_hSB5NN-ERwcNBqu9H-FDivHxNCjIkrBg2ExyhYLPO7bHAEITYIp6Ei'
]
module.exports = {
  name: "hack",
  description: "hacks a user beaware!!",
  aliases: ["hackuser"],
  expectedArgs: "<user>",
  category: "FUN AND GAMES",
  callback: async ({message, client, prefix, args, text, instance, channel}) => {
   try {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.channel.send(`Please mention someone while using this command`);
    const random = Math.floor(Math.random() * 20);
    let msg = await message.channel.send(`Hacking ${target.user.tag} now!!`);
    setTimeout(() => {
      msg.edit(`Getting data from discord \`10%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting data from discord \`35%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting data from discord \`60%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting data from discord \`99%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting data from discord \`100%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting personal data .`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting personal data ..`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting personal data ...`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Uploading data to dark web \`20%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Uploading data to dark web \`45%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Uploading data to dark web \`60%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Uploading data to dark web \`99%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Uploading data to dark web \`100%\``);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting token data .`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting token data ..`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Getting token data ...`);
    }, 750);
    setTimeout(() => {
      msg.edit(`Converting binary data ...`);
    }, 750);
    setTimeout(() => {
      const embed = new MessageEmbed().setColor(config.embedcolor).setTitle(`SUCESSFULLY HACKED!!`).setDescription(`${target.user} is hacked and here is token \`${randomtoken[random]}\``)
      msg.edit(`Totally real and dangerous hack is completed!!`, embed);
    }, 1000);
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