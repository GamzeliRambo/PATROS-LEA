const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./util/eventLoader')(client);

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`Botta Küçük Bir Problem Var Reboot Atabilirsiniz!`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//OYNUYOR

client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `Lrowsxrd Public Register`,
            type: 'PLAYING',
            // PLAYING:Oynuyor//WATCHING:İzliyor// LISTENING:Dinliyor//STREAMING:Yayında
        },
              status: 'idle'// online:Çevrimiçi// dnd :Rahatsız Etmeyin // idle:Boşta
    })
})
//OTOTAG 
client.on('userUpdate', async (lrowsoldUser, lrowsnewUser) => {
  var lrowstag = "ω"//tagı buraya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `752170350472724580`)
  let rol = lrowssunucu.roles.cache.find(a => a.id === `772814848521666570`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsnewUser.id)
  if (lrowsnewUser.username.includes(lrowstag) && !lrowsoldUser.username.includes(lrowstag)) {
    lrowsuye.roles.add('772814848521666570')
    let lrowsembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(` <@${lrowsnewUser.id}> **adlı üye** "ω" **tagımızı aldığı için** <@&772814848521666570> **rolü verildi!**`)
    client.channels.cache.get(`772815188185186334`).send (lrowsembed)

  }
}
          );
client.on('userUpdate', async (lrowsoldUser, lrowsnewUser) => {
  var lrowstag = "ω"//tagı braya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `752170350472724580`)
  let lrowsrol = lrowssunucu.roles.cache.find(a => a.id === `772814848521666570`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsoldUser.id)
  if (lrowsoldUser.username.includes(lrowstag) && !lrowsnewUser.username.includes(lrowstag)) {
    lrowsuye.roles.remove('772814848521666570')
    let lrowsembedd = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setDescription(` <@${lrowsoldUser.id}> **adlı üye** "ω" **tagımızı çıkardığı için** <@&772814848521666570> **rolü alındı!**`)
    client.channels.cache.get(`772815188185186334`).send (lrowsembedd)

  }
}
          ); //OTO ROL
/*
client.on('guildMemberAdd', async lrowsmember => {
  
let lrowskanal1 = await db.fetch(`otorolkanal_$lrowsmember.guild.id}`);
let lrowskanal2 = lrowsmember.guild.channels.cache.get(lrowskanal1)

let lrowsrol1 = await db.fetch(`otorolrol_${lrowsmember.guild.id}`);
let lrowsrol2 = lrowsmember.guild.roles.cache.get(lrowsrol1)

if (!lrowskanal2) return;
if (!lrowsrol2) return;
  
const lrowsembed = new Discord.MessageEmbed()

.setColor("BLACK")

.setDescription(`Sunucuya Katılan **${lrowsmember}** Adlı Kullanıcıya Başarıyla \`${lrowsrol2.name}\` Rolü Verildi.`)

lrowskanal2.send(lrowsembed)
  
lrowsmember.roles.add(lrowsrol2)
});
*/
//İSİM AYARLAMA
client.on('guildMemberAdd', lrowsmember => {
  lrowsmember.setNickname(`${lrowsmember.user.username}`)//Sunucuya Katılanın İsmini Değiştirir
 });
// OTO MESAJ
client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === '!tag') {
    lrowstagmesaj.channel.send('ω');//TAG
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('ω');
  }
});

client.on('message', lrowsserverlinkmesaj => {
  if (lrowsserverlinkmesaj.content.toLowerCase() === '!link') {
    lrowsserverlinkmesaj.channel.send('**İşte Sunucumuzun Davet Linki! :** `https://discord.gg/wenzy`');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!davet') {
    msg.channel.send('**İşte Sunucumuzun Davet Linki! :** `https://discord.gg/wenzy`');
  }
});

client.on("ready", () => {
  console.log(`Bot aktif!`);
  setInterval(function() {
    let lrowskanal = client.channels.cache.get("772814626948907038  ");//kanal id girmeniz yeterli olacaktır
    if (lrowskanal) {
      lrowskanal.send(
        "Kanala atacak mesajınızı giriniz"
      );
    }
  }, 7200000);
});
// HOŞ GELDİN
// KANALLI HOŞGELDİN

client.on("guildMemberAdd", lrowsmember => {
  var lrowstag = "ω"; // Sunucu Tagınızı Girin
  const lrowslogChannel = lrowsmember.guild.channels.cache.find(
    lrowschannel => lrowschannel.id === "772814727390429214" //regiser-chat id 
  );
  const lrowsembed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setImage("https://cdn.glitch.com/65268d0d-753f-4596-8103-069b776714e4%2Fwenzy.png?v=1604341793534")
    .setDescription(                                                                                                                                                    //tam altına kurallar kanal idsi
      `${lrowstag} <:wenzy_hypesquad:759829742349451294> ${lrowsmember} **Hoş Geldin , Seninle Beraber** \`${lrowsmember.guild.memberCount}\` **Üyeye Ulaştık.**\n${lrowstag} **Sunucumuzun** \`Kurallarına\` <#773103720384823298> **Odasından Bakabilirsin.** **\n${lrowstag} Kayıt olmak istersen ismini ve yaşını yaz <@&770996527350677526> bekle.**`
    );
   
  
  lrowslogChannel.send(lrowsembed);
}); 

// DM HOŞGELDİN

client.on(`guildMemberAdd`, async lrowsmember => {
let lrowstag = 'ω';
  const e = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://cdn.glitch.com/65268d0d-753f-4596-8103-069b776714e4%2Findir.gif?v=1604270383088`)
    .addField(
      `Sunucumuza hoş geldin!`,
      `Tagımızı Alarak Bize Destek Olabilirsin.`
    )
.addField("İşte tagımız:", lrowstag)
  lrowsmember.send(e);
}); 


// BOT MESAJ SİLİCİ
client.on("message",message => {
  if(!message.author.bot) return;
  db.get(`lrowssohbet_${message.channel.id}`).then(lrowsdurum => {
    if(!lrowsdurum || lrowsdurum === 'pasif') return;
    else {
      message.delete({timeout: 6000}) // 6000 = 6 Saniye Eder Buna Göre Editleyebilirsiniz.
    }
})}) 




//AFK KOMUT

const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`lrowsafk_${message.author.id}`);
    db.delete(`lrowsafk_süre_${message.author.id}`);

    const lrowsembed = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`Afk Modundan Çıkış Yaptın`);

    message.channel.send(lrowsembed);
  }

  var lrowskullanıcı = message.mentions.users.first();
  if (!lrowskullanıcı) return;
  var lrowssebep = await db.fetch(`afk_${lrowskullanıcı.id}`);

  if (lrowssebep) {
    let lrowssüre = await db.fetch(`lrowsafk_süre_${lrowskullanıcı.id}`);
    let timeObj = ms(Date.now() - lrowssüre);

    const lrowsafk = new Discord.MessageEmbed()

      .setColor("RED")//lrowsxrd
      .setDescription(
        `**BU KULLANICI AFK**\n\n**Afk Olan Kullanıcı :** \`${lrowskullanıcı.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${lrowssebep}\``
      );

    message.channel.send(lrowsafk);
  }
});


// Botu Sesliye Sokma Komutudur.

client.on('ready', ()=>{
client.channels.cache.get('773107497820094494').join()//SESLI KANAL IDSINI GIRIN
})