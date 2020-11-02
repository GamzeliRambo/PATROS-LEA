const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {
  if (
    message.author.id !== ayarlar.sahip &&
    message.author.id !== "518794343256031234"//SAHIP ID GIRINIZ
  )
    return message.channel.send(
      "Sadece Sahibim Bu Komuta Erişebilir."
    );

  message.channel.send(`Botunuz yeniden başlatılıyor.`);
  message.delete({timeout: 60, reason: 'Yeniden Başladı'}).then(msg => {
    console.log(`Bot Yeniden Başlatılıyor Kısa Süre Sonra Aktif Olur...`);

    process.exit(0);
  });
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r", "reboot", "yenile", "yeniden başlat"],
  permLevel: 0
};

module.exports.help = {
  name: "reboot",
  description: "Botunuzu Yeniden Başlatmanızda İşe Yarayan Komudumuz //Lrows",
  usage: "reboot"
};
