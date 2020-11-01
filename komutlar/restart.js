const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {
  if (
    message.author.id !== ayarlar.sahip &&
    message.author.id !== "518794343256031234"
  )
    return message.channel.send(
      "🤪 `Geliştiricim değilsin`, yani bu kodu kullanamazsın!"
    );

  message.channel.send(` 😈 Başarılı! Bot yeniden başlatılıyor.`);
  message.delete({timeout: 60, reason: 'Yeniden Başladı'}).then(msg => {
    console.log(`Bot yeniden başlatılıyor...`);

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
  description: "orascoder",
  usage: "reboot"
};
