const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!"
        )
        .setColor("RED")
    );
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Bir üye etiketlemen gerekiyor!")
        .setColor("RED")
    );
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  let lrowsreason = args.slice(1).join(" ");
  if (!lrowsreason)
    return message.channel
      .send("Lütfen Bir Sebep Yazınız.")
      .then(m => m.delete(5000));
  message.react("emoji id");//emoji id girmeniz yeterli olacaktır
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
    message.guild.members.cache.get(member.id).roles.remove(r);
  });
  member.roles.add("772059659904876604");//jail rol id
  const kanal = message.guild.channels.cache.find(c => c.id == "771743251950338091");//JAIL-LOG KANAL ID
  const embed1 = new Discord.MessageEmbed()
    .setDescription(
      `${kullanıcı} Adlı Üye **${lrowsreason}** Yüzünden Jaile Atıldı!`
    )
    .setColor("RED")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();

  let embed = new Discord.MessageEmbed()
    .setDescription(`${kullanıcı} adlı üye sürgün edildi!`)
    .setImage(
      "https://cdn.glitch.com/65268d0d-753f-4596-8103-069b776714e4%2FPrison-Break.png?v=1604269626551"
    )
    .setFooter(`Lrows Jail Sistemi`)
    .setTimestamp();
  return message.channel
    .send(embed)
    .then(kanal.send(embed1))
    .then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza", "cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};

exports.help = {
  name: "jail",
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: "!jail @etiket sebep"
}; //Cagin.
