const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.cache.has('773266328785387570')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "773266340387356693"; ///alınacak rol idsi
  let ver = "773266337396162572"; ///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`Ꮙ ${isim} | ${yaş}`);
  
    member.roles.add(ver);
    member.roles.remove(al);
  

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("<:tac:773903928596627456> Kayıt işlemi başarılı <:tac:773903928596627456>")
    .setThumbnail("https://media.tenor.com/images/5a8496cf0faf284d514a8cedc3f7332d/tenor.gif")
    .setDescription(`
**Kayıt Edilen Kullanıcı** : ${member.user.username}
**Kayıt Eden Yetkili** : ${message.author.username}

**Kayıt İşleminde Verilen Rol** : 
<@&773266337396162572>

**Kayıt İşleminde Alınan Rol** :
<@&773266340387356693>
`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  permLevel: 0
}
exports.help = {
  name: 'Erkek',
  description: "Erkek Kayıt Sıstemı",
  usage: 'Erkek isim yaş'
}