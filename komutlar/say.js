const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "∾" // tagınız
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("black")
        .addField("<a:rain_isaretleyici:677902492515958811> *Sunucudaki üye sayısı*", message.guild.memberCount)
        .addField("<a:rain_isaretleyici:677902492515958811> *Çevrimiçi üye sayısı*", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:rain_isaretleyici:677902492515958811> *Seslideki üye sayısı*", count)
        .addField("<a:rain_isaretleyici:677902492515958811> *Tagdaki üye sayısı*", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tagınız yoksa bu satrı silin
 .setThumbnail("https://cdn.discordapp.com/attachments/668611669705883688/675669671646593024/ezgif.com-video-to-gif_10.gif")
  .setFooter(`So come, let's watch the rain as it's falling down..`)


    message.channel.send(embed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
};

