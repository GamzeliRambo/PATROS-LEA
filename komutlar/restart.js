const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {
  if (
    message.author.id !== ayarlar.sahip &&
    message.author.id !== "668605277817274368"
  )
    return message.channel.send(
      "🤪 `Geliştiricim değilsin`, yani bu kodu kullanamazsın!"
    );

  message.channel.sendMessage(` 😈 Başarılı! Bot yeniden başlatılıyor.`);
  message.delete(60).then(msg => {
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
