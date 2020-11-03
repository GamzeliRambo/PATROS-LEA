const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("772059661690994719"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`kullanacağı rol isimi\` yetkisine sahip olmasınız.`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun kanka.");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.roles.add("770996442818674715"); //verilecek rol
  lrowsmember.roles.remove("770996528729817138"); //alınacak rol
  lrowsmember.roles.remove("770996315676737537"); //alınacak rol
  let lrowsembed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(                
      `${lrowskullanıcı} **üyesine** <@&770996442818674715> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("emoji id");//emoji id
  return message.channel.send(lrowsembed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "kadın",
  description: "Kadın Üye Rolü Verir",
  usage: "kadın"
};
