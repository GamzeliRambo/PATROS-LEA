const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('GREEN')
 .setTitle(`\`• ${message.guild.name} Sunucu Yardım Menüsü \` `)
.setDescription(`
<:go_right:773919887475212358> **=**  \`!erkek\`:  **Erkek Rol verir (teyit yetkili özel)**
<:go_right:773919887475212358> **=**  \`!kız\`:  **kız Rol verir (teyit yetkili özel)**
<:go_right:773919887475212358> **=**  \`!ban\`: **Belirttiğiniz Kişiyi Sunucudan Banlarsınız**
<:go_right:773919887475212358> **=**  \`!unban\`:  **Belirttiğiniz Kişinin Banını Kaldırırsınız**
<:go_right:773919887475212358> **=**  \`!temizle\`:  **Belirttiğiniz Sayıda Mesajı Siler**
<:go_right:773919887475212358> **=**  \`!say\`:  **Sunucu üye Durumu**
<:go_right:773919887475212358> **=**  \`!avatar\`:  **Avatarınızı Atar**
<:go_right:773919887475212358> **=**  \`!jail\`:  **Jail atar**
<:go_right:773919887475212358> **=**  \`!unjail\`:  **Jaildan cıkarır**
<:go_right:773919887475212358> **=**  \`!vipver\`: **Vip Rol verilir**
<:go_right:773919887475212358> **=**  \`!vipal\`: **Vip Rol alır**

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