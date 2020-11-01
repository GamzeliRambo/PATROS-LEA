const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`
    );
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun kanka.");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  member.roles.add("770996528729817138");
  member.roles.remove("772059659904876604");
  let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .addField(`Sunucu adınız`, `${kullanıcı} **adlı üyenin cezası kalktı! **`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("verilecek tepki id");
  return message.channel.send(embed);
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
}; //Cagin.
