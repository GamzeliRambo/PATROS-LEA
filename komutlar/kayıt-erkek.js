const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("kullanacağı rol id"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`kullanacağı rol isimi\` yetkisine sahip olmasınız.`
    );
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun kanka.");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  member.roles.add("erkek rol id"); //verilecek rol
  member.roles.remove("kadın rol id"); //alınacak rol
  member.roles.remove("kayıtsız rol id"); //alınacak rol
  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `${kullanıcı} **üyesine** <@&erkek rol id> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("emoji id"); // verilecek tepki
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "erkek",
  description: "Hadi erkek olalımm",
  usage: "erkek"
};
