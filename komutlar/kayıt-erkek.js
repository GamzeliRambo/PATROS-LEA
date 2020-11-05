const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {//yetkili rol id
   if(!message.member.roles.cache.has('773266328785387570')) return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin : `rôl adı`')
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
   let erkek = message.guild.roles.cache.find(r => r.id === '773266337396162572')//erkek rol id
   let kayıtsız = message.guild.roles.cache.find(r => r.id === '773266340387356693')//kayıtsız rol id

   if(!erkek) {
       return message.channel.send('Erkek rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   if(!kayıtsız) {
       return message.channel.send('kayıtsız rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   let kayıt = message.guild.member(member)
   let isim = args[1]
   let yas = args[2]

   if(!isim) return message.channel.send('İsim belirtmelisin')
   if(isNaN(yas)) return message.channel.send('Yaş belirtmelisin')

   kayıt.setNickname(`${isim} • ${yas}`)
   kayıt.roles.add(erkek)
   kayıt.roles.remove(kayıtsız)
   let embed = new Discord.MessageEmbed()
   .setColor('Blue')
   .setThumbnail(
      `https://cdn.discordapp.com/attachments/647020372964802583/701525793167245386/Screenshot_1.png`)
   .setTitle('Kayıt Tamamlandı')
   .addField('Kayıt edilen kullanıcı',member)
   .addField('Adı :', isim)
   .addField('Yaşı :', yas)
   .addField('Kayıt eden yetkili', message.author)
   client.channels.cache.get('LOG KANAL İD YAZMALISIN').send(embed)///LOG KANAL İD YAZMALISIN
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['erkek','e','bay'],
    permLevel: 0
};

exports.help = {
    name: 'erkek',
    description: 'erkek ',
    usage: 'erkek'
};