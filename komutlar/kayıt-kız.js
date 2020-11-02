const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("kullanacağı rol id"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`kullanacağı rol isimi\` yetkisine sahip olmasınız.`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun kanka.");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.addRole("kadın rol id"); //verilecek rol
  lrowsmember.removeRole("erkek rol id"); //alınacak rol
  lrowsmember.removeRole("kayıtsız rol id"); //alınacak rol
  let lrowsembed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(                  //rol id buraya girin
      `${lrowskullanıcı} **üyesine** <@&kadın rol id> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("emoji id");//emoji id
  return message.channel.send(lrowsembed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "kadın",
  description: "Hadi kadın olalımm",
  usage: "kadın"
};
