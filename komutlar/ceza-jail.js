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
        .setColor("Black")
    );
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Bir üye etiketlemen gerekiyor!")
        .setColor("Black")
    );
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  let reason = args.slice(1).join(" ");
  if (!reason)
    return message.channel
      .send("Lütfen Bir Sebep Yazınız.")
      .then(m => m.delete(5000));
  message.react("emoji id");
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
    message.guild.members.cache.get(member.id).roles.remove(r);
  });
  member.roles.add("772059659904876604");
  const kanal = message.guild.channels.find(c => c.id == "771743251950338091");
  const embed1 = new Discord.MessageEmbed()
    .setDescription(
      `${kullanıcı} adlı üye **${reason}** sebebi ile jaile atıldı!`
    )
    .setColor("RED")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();

  let embed = new Discord.MessageEmbed()
    .setDescription(`${kullanıcı} adlı üye sürgün edildi!`)
    .setImage(
      "https://cdn.discordapp.com/attachments/673224895756238848/673450899531628544/adalaett.gif"
    )
    .setFooter(`Justice is the basis of property..`)
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
