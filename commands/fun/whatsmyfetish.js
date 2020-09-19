//author ef1500
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "whatsmyfetish",
  category: "fun",
  description: "What's your fetish?",
  usage: `whatsmyfetish`,
  run: async (client, message, args) => {
    console.log(
      "ACTIVITY: " +
        message.author.username +
        " ran the command: " +
        message.content
    );
    message.delete();

    //make fetish list (dear lord this is gonna be painful)
    var fetish = ["group","sole female","lolicon","stockings","anal","sole male","schoolgirl uniform","glasses","nakadashi","shotacon","blowjob","full color","bondage","rape","ahegao","yaoi","incest","tankoubon","mosaic censorship","double penetration","milf","paizuri","defloration","futanari","males only","dark skin","x-ray","sex toys","yuri","swimsuit","ffm threesome","full censorship","femdom","netorare","impregnation","dilf","pantyhose","sister","collar","tentacles","mind break","crossdressing","schoolboy uniform","cheating","bbm","lactation","bikini","maid","hairy","mmf threesome","big ass","tomgirl","teacher","big penis","muscle","masturbation","ponytail","mind control","twintails","footjob","pregnant","females only","exhibitionism","sweating","catgirl","unusual pupils","lingerie","mother","harem","garter belt","gender bender","uncensored","huge breasts","gag","urination","small breasts","kemonomimi","drugs","handjob","scat","condom","prostitution","tanlines","blindfold","piercing","demon girl","fingering","bloomers","elf","bunny girl","inflation","kissing","cunnilingus","stomach deformation","virginity","sleeping","rimjob","strap-on","school swimsuit","beauty mark","monster","military","bestiality","filming","thigh high boots","big areolae","replaced","nurse","gyaru","enema","monster girl","business suit","dick growth","leotard","bodysuit","inverted nipples","urethra insertion","inseki","dickgirl on dickgirl","apron","daughter","cervix penetration","gloves","sole dickgirl","bald","slave","horns","breast expansion","magical girl","birth","tomboy","latex","hairy armpits","dickgirl on male","corruption","snuff","guro","fox girl","spanking","prostate massage","old man","bike shorts","drunk","fisting","oppai loli","tiara","smell","eyepatch","bdsm","wings","male on dickgirl","crotch tattoo","shemale","tail","masked face","tribadism","transformation","pegging","torture","big nipples","leg lock","nipple fuck","humiliation","squirting","chloroform","breast feeding","tracksuit","facesitting","blood","cosplaying","bisexual","blowjob face","waitress","tall girl","twins","orgasm denial","hotpants","foot licking","cousin","double vaginal","large insertions","human pet","vore","tail plug","nun","piss drinking","triple penetration","body modification","possession","voyeurism","shimapan","scar","cbt","dog","frottage","feminization","yandere","cheerleader","giantess","amputee","robot","dog girl","eggs","double anal","sumata","chastity belt","demon","lab coat","solo action","body swap","armpit sex","gaping","low lolicon","milking","bride","brother","aunt"];

    //choose a random fetish
    const yourfetish = fetish[Math.floor(Math.random() * chooseArr.length)]; //pick your poison

    //make an embed
    const fetishResult = new MessageEmbed()
      .setTitle(`**FETISH RESULTS**`)
      .setDescription(yourfetish)


  message.channel.send(fetishResult);
  },
};
