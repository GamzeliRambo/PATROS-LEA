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
//-------------KOMUTLAR-------\\
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
    lrowstagmesaj.channel.send('Ꮙ');//TAG
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('Ꮙ');
  }
});

client.on('message', lrowsserverlinkmesaj => {
  if (lrowsserverlinkmesaj.content.toLowerCase() === '!link') {
    lrowsserverlinkmesaj.channel.send('**İşte Sunucumuzun Davet Linki! :** https://discord.gg/B3eVAjDgfT **');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!davet') {
    msg.channel.send('**İşte Sunucumuzun Davet Linki! :** https://discord.gg/B3eVAjDgfT');
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
  var lrowstag = "Ꮙ"; // Sunucu Tagınızı Girin
  const lrowslogChannel = lrowsmember.guild.channels.cache.find(
    lrowschannel => lrowschannel.id === "773266406208307210" //regiser-chat id 
  );
  const lrowsembed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setImage("https://media.giphy.com/media/JD1us8gMWOdlVVJuxh/giphy.gif")
    .setDescription(                                                                                                                                                    //tam altına kurallar kanal idsi
      `${lrowstag} <:beyinsiz:773278167221141554> ${lrowsmember} **Hoş Geldin , Seninle Beraber** \`${lrowsmember.guild.memberCount}\` **Üyeye Ulaştık.**\n${lrowstag} **Sunucumuzun** \`Kurallarına\` <#773875422454480916> **Odasından Bakabilirsin.** **\n${lrowstag} Kayıt olmak istersen ismini ve yaşını yaz <@&773266340387356693> bekle.**`
    );
   
  
  lrowslogChannel.send(lrowsembed);
}); 

// DM HOŞGELDİN

client.on(`guildMemberAdd`, async lrowsmember => {
let lrowstag = 'Ꮙ';
  const e = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/JD1us8gMWOdlVVJuxh/giphy.gif`)
    .addField(
      `Sunucumuza hoş geldin!`,
      `Tagımızı Alarak Bize Destek Olabilirsin.`
    )
.addField("İşte tagımız:", lrowstag)
  lrowsmember.send(e);
}); 


//AFK KOMUT


// Botu Sesliye Sokma Komutudur.

client.on('ready', ()=>{
client.channels.cache.get('773266403750838303').join()//SESLI KANAL IDSINI GIRIN
})
//-------------KOMUTLAR-------\\
client.on("roleDelete", async role => {
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol Açıldı.'})
})
client.on("roleCreate", async role => {
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
  }) 
///////////////////////////

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})