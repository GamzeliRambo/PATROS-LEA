const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("772059661690994719"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`Owner\` yetkisine sahip olmasınız.`
    );
  if (!message.member.voiceChannel) {
    return message.channel.send("Ses kanalında olman lazım!");
  }
  let lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı)
    return message.channel.send("**Kullanıcıyı etiketlemelisin.**");
  let lrowsrol = message.mentions.roles.first();
  let lrowsmember = message.guild.member(lrowskullanıcı);
  if (!lrowsmember.voiceChannel)
    return message.channel
      .send("Etiketlenen kullanıcı bir ses kanalında değil")
      .then(m => m.delete(5000));
  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  lrowsmember.setVoiceChannel(voiceChannel);
  message.react("tepki id");//emoji id buraya girmeniz gereklidir.
  const voiceChannel1 = message.member.voiceChannel.name;
  let lrowsembed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      message.author +
        " **Tarafından** " +
        lrowskullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
    .setTimestamp();
  message.channel.send(lrowsembed).then(m => m.delete(10000));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: " ",
  usage: "çek"
};
