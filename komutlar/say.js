const Discord = require("discord.js");
const { oneLine, stripIndents } = require("common-tags");
module.exports.run = async (client, message, args) => {
  let guild = "707994845029072986";
  const bir = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "bir")
  const iki = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "iki")
  const uc = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "uc")
  const dort = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "dort")
  const bes = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "bes")
  const alti = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "alti")
  const yedi = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "yedi")
  const sekiz = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "sekiz")
  const dokuz = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "dokuz")
  const sifir = client.guilds.get(`707994845029072986`).emojis.find(e => e.name === "sifir")
  
  client.premium_subscription_count == 0;
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  var msg = message;
  var üyesayısı = msg.guild.members.size.toString().replace(/ /g, "     ");
  var üs = üyesayısı.match(/([0-9])/g);
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`
      }[d];
    });
  }
  /////////////////////////////////////
  var sessayı = count.toString().replace(/ /g, "     ");
  var üs2 = sessayı.match(/([0-9])/g);
  sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs2) {
    sessayı = sessayı.replace(/([0-9])/g, d => {
      return {
        "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`
      }[d];
    });
  }
  /////////////////////////////////////////
  var tagdakiler = 0;
  let tag = ["☤",];
  message.guild.members.forEach(member => {
    if (member.user.username.includes(tag)) {
      tagdakiler = tagdakiler + 1;
    }
  });
  var tagdakilerr = tagdakiler.toString().replace(/ /g, "     ");
  var üs3 = tagdakilerr.match(/([0-9])/g);
  tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs3) {
    tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {
      return {
       "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`
      }[d];
    });
  }
  //////////////////////////////////////////
  var onlayn = message.guild.members
    .filter(m => m.presence.status !== "offline")
    .size.toString()
    .replace(/ /g, "     ");
  var üs4 = onlayn.match(/([0-9])/g);
  onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs4) {
    onlayn = onlayn.replace(/([0-9])/g, d => {
      return {
        "1": `${bir}`,
        "2": `${iki}`,
        "3": `${uc}`,
        "4": `${dort}`,
        "5": `${bes}`,
        "6": `${alti}`,
        "7": `${yedi}`,
        "8": `${sekiz}`,
        "9": `${dokuz}`,
        "0": `${sifir}`
      }[d];
    });
  }
  //////////////////////////////////////////////////
  const embed = new Discord.RichEmbed()
    .setColor("Random")
    .setDescription(
      stripIndents`
 ** ___Sunucuda Bulunan Üye sayısı___: _${üyesayısı.toString()}_

    ___Ses Kanallarındaki Aktif Sayısı___: _${sessayı}_
                                                                       
  ___Tagımızda Bulunan Kişi Sayısı___: _${tagdakilerr}_                          

  ___Sunucuda bulunan Aktif Üye Sayısı___:_ ${onlayn}_
 ** `
    )
    .setThumbnail(
      `https://cdn.discordapp.com/attachments/647020372964802583/701525793167245386/Screenshot_1.png`
    )
    .setFooter(`Komutu Kullanan: ${msg.author.tag}  `)
    .setAuthor(msg.guild.name, msg.guild.iconURL);
  msg.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"],
  permLevel: 0
};



exports.help = {
  name: "say"
};
