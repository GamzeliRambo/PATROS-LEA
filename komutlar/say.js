const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let tag = ayarlar.tag;
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let sesli = 0;
  for (const [id, voiceChannel] of voiceChannels)
    sesli += voiceChannel.members.size;

  const embedsay = new Discord.MessageEmbed()
    .setTitle(`\`• ${message.guild.name} Sunucu İstatistikleri \` `)
    .setDescription(
      ` 
         <:go_right:773263827559120946> • **__Sunucudaki üye sayısı__** \`${
           message.guild.memberCount
         }\`
         <:go_right:773263827559120946> • **__Çevrimiçi üye sayısı__** \`${
           message.guild.members.filter(
             m => !m.user.bot && m.user.presence.status !== "offline"
           ).size
         }\`
         <:go_right:773263827559120946> • **__Seslideki üye sayısı__** \`${sesli}\`
         <:go_right:773263827559120946> • **__Tagdaki üye sayısı__** \`${
           message.guild.members.filter(tag => tag.user.username.includes(tag))
             .size
         }\``
    )
    .setImage(
      `https://i.pinimg.com/originals/af/80/39/af8039261a387be71514bb4c2e5e54b5.gif`
    );
  message.channel.send(embedsay);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["total"],
  permLevel: 0
};

exports.help = {
  name: "say"
};
