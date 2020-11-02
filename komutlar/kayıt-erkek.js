const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("772059661690994719"))// rol id buraya girmeniz gerekli 
    return message.channel.send(      //rol ismini aşağıya girin
      `Bu komutu kullanabilmek için \`Owner\` yetkisine sahip olmasınız.`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemen gerekli");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.roles.add("770996528729817138"); //verilecek rol
  lrowsmember.roles.remove("770996442818674715"); //alınacak rol
  lrowsmember.roles.remove("770996315676737537"); //alınacak rol
  let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      `${lrowskullanıcı} **üyesine** <@&770996528729817138> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("emoji id"); //emoji id
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
