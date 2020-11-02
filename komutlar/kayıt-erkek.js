const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("kullanacağı rol id"))// rol id buraya girmeniz gerekli 
    return message.channel.send(      //rol ismini aşağıya girin
      `Bu komutu kullanabilmek için \`kullanacağı rol isimi\` yetkisine sahip olmasınız.`
    );
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun kanka.");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  lrowsmember.roles.add("erkek rol id"); //verilecek rol
  lrowsmember.roles.remove("kadın rol id"); //alınacak rol
  lrowsmember.roles.remove("kayıtsız rol id"); //alınacak rol
  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `${lrowskullanıcı} **üyesine** <@&erkek rol id> **rolü verildi!**`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  message.react("emoji id"); //emoji id
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
