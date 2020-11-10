const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('GREEN')
 .setTitle(`\`• PATROSİLEA Sunucu Yardım Menüsü \` `)
.setDescription(`
<:okmavi:773974158169735239> **=**  \`!stat\`:  **Stat Kac Kisi Kayıt Etini Gösterir**
<:okmavi:773974158169735239> **=**  \`!erkek\`:  **Erkek Rol verir (teyit yetkili özel)**
<:okmavi:773974158169735239> **=**  \`!kız\`:  **kız Rol verir (teyit yetkili özel)**
<:okmavi:773974158169735239> **=**  \`!ban\`: **Belirttiğiniz Kişiyi Sunucudan Banlarsınız**
<:okmavi:773974158169735239> **=**  \`!unban\`:  **Belirttiğiniz Kişinin Banını Kaldırırsınız**
<:okmavi:773974158169735239> **=**  \`!temizle\`:  **Belirttiğiniz Sayıda Mesajı Siler**
<:okmavi:773974158169735239> **=**  \`!say\`:  **Sunucu üye Durumu**
<:okmavi:773974158169735239> **=**  \`!avatar\`:  **Avatarınızı Atar**
<:okmavi:773974158169735239> **=**  \`!jail\`:  **Jail atar**
<:okmavi:773974158169735239> **=**  \`!unjail\`:  **Jaildan cıkarır**
<:okmavi:773974158169735239> **=**  \`!vipver\`: **Vip Rol verilir**
<:okmavi:773974158169735239> **=**  \`!vipal\`: **Vip Rol alır**
<:okmavi:773974158169735239> **=**  \`!kullanıcıbilgim \`: **kullanıcı bilgim gösterir**

`)
.setThumbnail("https://media.tenor.com/images/5a8496cf0faf284d514a8cedc3f7332d/tenor.gif")
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'yardım'
};