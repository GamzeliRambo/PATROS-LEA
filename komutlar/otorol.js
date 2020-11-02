const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
let lrowsrol = message.mentions.roles.first()
let lrowskanal = message.mentions.channels.first()

if(!lrowsrol) return message.channel.send('Lütfen Bir Rol Etiketle. Örnek Kullanım : ``otorol @rol #kanal``')
if(!lrowskanal) return message.channel.send('Lütfen Bir Kanal Etiketle. Örnek Kullanım : ``otorol @rol #kanal``')
  
db.set(`otorolrol_${message.guild.id}`, lrowsrol.id)
db.set(`otorolkanal_${message.guild.id}` ,lrowskanal.id)
  
const lrowsembed = new Discord.MessageEmbed()


.setColor("BLACK")

.setDescription(`Otorol Rolü **@${lrowsrol.name}** Olarak, Bildirimin Gideceği Kanal İse **#${lrowskanal.name}** Olarak Ayarlandı. \n \n **Not: Botun Rolü En Üstte Olmaz İse Rol Vermez.**`)

message.channel.send(lrowsembed)
};
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};
exports.help = {
 name: 'otorol',
};