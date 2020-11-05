const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("__Bu komutu kullanma yetkisine sahip değilsin.__");
  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;

  if (!args[0] || (args[0] !== "aç" && args[0] !== "ac" && args[0] !== "kapat"))
    return message.channel.send(`__**Aç** veya **kapat** yazmalısın.__`);

  if (args[0] == "aç" || args[0] === "ac") {
    message.channel.send(
      "__Rol koruması başarıyla **aktif edildi**.Artık sunucunuzdaki roller silinebilecek.__"
    );
    db.set(`rol_${message.guild.id}`, "acik");
  }
  if (args[0] == "kapat") {
    message.channel.send(
      "__Bot koruması başarıyla **deaktif edildi**.Artık sunucunuzdaki roller silinebilecek .__"
    );
    db.delete(`rol_${message.guild.id}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rk"],
  permLevel: 0
};

exports.help = {
  name: "rol-koruması",
  description: "Sunucuya eklenen botları otomatik olarak sunucudan yasaklar.",
  usage: "oto-botban aç/kapat",
  kategori: "yetkili"
};
