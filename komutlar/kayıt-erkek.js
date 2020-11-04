const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("773266328785387570"))// rol id buraya girmeniz gerekli 
    return message.channel.send(      //rol ismini aşağıya girin
      `Bu komutu kullanabilmek için \`Owner\` yetkisine sahip olmasınız.`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemen gerekli");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.roles.add("773266337396162572"); //verilecek rol
  lrowsmember.roles.remove("773266340387356693"); //alınacak rol
  lrowsmember.roles.remove("773266340387356693"); //alınacak rol
  let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      `${lrowskullanıcı} **üyesine** <@&773266337396162572> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("<:sevaphocam:773278198271967233>"); //emoji id
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "erkek",
  description: "Hadi erkek olalımm",
  usage: "erkek"
};
