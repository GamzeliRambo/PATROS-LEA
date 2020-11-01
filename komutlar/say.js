const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let tag = ""; // tagınız
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Sunucudaki üye sayısı", message.guild.memberCount)
    .addField(
      "Çevrimiçi üye sayısı",
      message.guild.members.cache.filter(
        m => !m.user.bot && m.user.presence.status !== "offline"
      ).size
    )
    .addField("Seslideki üye sayısı", count)
    .addField(
      "Tagdaki üye sayısı",
      message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
    ) // TAG KULLANMIYORSANIZ BU SATIRI SİLEBİLİRSİNİZ
    .setFooter(
      `${message.author.tag} tarafından istendi`,
      message.author.avatarURL()
    );
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Say",
  usage: "say"
};
