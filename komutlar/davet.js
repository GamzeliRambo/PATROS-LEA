const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (client, message, args) => {
    let mcdksr = client.guilds.get(args[0])
    if (!mcdksr) return message.channel.send(`**Botun Ekli Olduģ Sunucu ID Giriniz**`)
    mcdksr.channels.random().createInvite().then(a => message.channel.send(a.toString()))
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'iddavet',
}