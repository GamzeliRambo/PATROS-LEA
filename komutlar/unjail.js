const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Etiketlemen Gerekli!");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.roles.add("770996528729817138");//üye rolü
  lrowsmember.roles.remove("772059659904876604");//jailli rolü
  let lrowsembed = new Discord.MessageEmbed()
    .setColor("RED")
    .addField(`Sunucu adınız`, `${lrowskullanıcı} **adlı üyenin cezası kalktı! **`)
    .setImage("https://cdn.glitch.com/65268d0d-753f-4596-8103-069b776714e4%2Findir.gif?v=1604270383088")
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("verilecek tepki id");
  return message.channel.send(lrowsembed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezaaç"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "unjail",
  description: "Cezalı rolünü kaldırır",
  usage: "Cezalı rolü açar"
};
