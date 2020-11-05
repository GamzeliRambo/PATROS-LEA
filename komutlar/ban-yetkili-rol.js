const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')

    let rol = message.mentions.roles.first()
    if(!rol) return message.channel.send('Bir Rol Etiketlemelisin')
   db.set(`banrol_${message.guild.id}`, rol.id)
   return message.channel.send('Ban Yetkili Rolü <@&' + rol+ '> Olarak Ayarlandı')
} 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:[],
    permlevel: 0
};

exports.help = {
    name: "ban-yetkili-rol"
}
