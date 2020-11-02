const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.author.bot || message.channel.type === "dm") return;

  if (!message.member.roles.has("772059661690994719"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`MANAGE_NICKNAMES\` yetkisine sahip olmasınız.`
    );
  let lrowsmember = message.mentions.members.first();
  let lrowsisim = args.slice(1).join(" ");
  if (!lrowsmember) return message.channel.send("Üye Etiketlemen Gerekli");
  if (!lrowsisim) return message.channel.send("İsim Belirtmen Gerekli");
  lrowsmember.setNickname(`• ${lrowsisim}`);
  const embed = new Discord.RichEmbed()
    .addField(
      `• Kullanıcının takma adı değiştirildi.`,
      `Kullanıcı adını başarıyla \`• ${lrowsisim}\` olarak ayarladım!`
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)
    .setThumbnail(client.user.avatarURL);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim"],
  permLevel: 0
};
exports.help = {
  name: "nick",
  description: "Birinin nickini değiştirir.",
  usage: "nick <yeni nick>"
};
