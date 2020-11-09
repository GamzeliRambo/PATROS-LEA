const Discord = require('discord.js');//sa marabalar
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ffmpeg = require("ffmpeg"); //bura
const express = require("express");

const ytdl = require("ytdl-core");
const db = require('quick.db');
const http = require('http');

require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');



const app = express();
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//OYNUYOR

//------------------------------------------------KOMUTLAR-----------------------------------------\\
//OTOTAG 
client.on('userUpdate', async (lrowsoldUser, lrowsnewUser) => {
  var lrowstag = "Ꮙ"//tagı buraya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `773264520340045914`)
  let rol = lrowssunucu.roles.cache.find(a => a.id === `773266333147463731`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsnewUser.id)
  if (lrowsnewUser.username.includes(lrowstag) && !lrowsoldUser.username.includes(lrowstag)) {
    lrowsuye.roles.add('773266333147463731')
    let lrowsembed = new Discord.MessageEmbed()
    .setColor(`#24e7bf`)
    .setDescription(` <@${lrowsnewUser.id}> **adlı üye** "Ꮙ" **tagımızı aldığı için** <@&773266333147463731> **rolü verildi!**`)
    client.channels.cache.get(`773266413112262706`).send (lrowsembed)

  }
}
          );
client.on('userUpdate', async (lrowsoldUser, lrowsnewUser) => {
  var lrowstag = "Ꮙ"//tagı braya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `773264520340045914`)
  let lrowsrol = lrowssunucu.roles.cache.find(a => a.id === `773266333147463731`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsoldUser.id)
  if (lrowsoldUser.username.includes(lrowstag) && !lrowsnewUser.username.includes(lrowstag)) {
    lrowsuye.roles.remove('773266333147463731')
    let lrowsembedd = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(` <@${lrowsoldUser.id}> **adlı üye** "Ꮙ" **tagımızı çıkardığı için** <@&773266333147463731> **rolü alındı!**`)
    client.channels.cache.get(`773266413112262706`).send (lrowsembedd)

  }
}
          ); 

//-------------------------------------------- OTO MESAJ -----------------------------------------////
client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === '!tag') {
    lrowstagmesaj.channel.send('<:go_right:773919887475212358> Ꮙ');//TAG
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('<:go_right:773919887475212358> Ꮙ');
  }
});

client.on('message', lrowsserverlinkmesaj => {
  if (lrowsserverlinkmesaj.content.toLowerCase() === '!link') {
    lrowsserverlinkmesaj.channel.send('<:go_right:773919887475212358>** İşte Sunucumuzun Davet Linki! :** https://discord.gg/B3eVAjDgfT ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!davet') {
    msg.channel.send('<:go_right:773919887475212358>** İşte Sunucumuzun Davet Linki! :** https://discord.gg/B3eVAjDgfT');
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
///HG MESAJI
//-------------------------------------------- HG MESAJI-----------------------------------------////
client.on('guildMemberAdd', (member, msg) => {
  const moment = require('moment')
	let günler = {
      "0": "Pazar",
      "1": "Pazartesi",
      "2": "Salı",
      "3": "Çarşamba",
      "4": "Perşembe",
      "5": "Cuma",
      "6": "Cumartesi",
	}
	  let aylar = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }
  let endAt = member.user.createdAt
      let gün = moment(new Date(endAt).toISOString()).format('DD')
      let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
     let yıl =  moment(new Date(endAt).toISOString()).format('YYYY')
     let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
let kuruluş = `${gün} ${ay} ${yıl} ${saat}`
   // let kuruluş = moment(user.author.createdAt).format('YYYY-MM-DD HH:mm:ss')
	//let kuruluş = user.createdAt.toDateString().replace("Sun","Pazar").replace("Mon","Pazartesi").replace("Tue","Salı").replace("Wed","Çarşamba").replace("Thu","Perşembe").replace("Fri","Cuma").replace("Sat","Cumartesi").replace("Jan","Ocak").replace("Feb","Şubat").replace("Mar","Mart").replace("Apr","Nisan").replace("May","Mayıs").replace("June","Haziran").replace("July","Temmuz").replace("Aug","Ağustos").replace("Sep","Eylül").replace("Oct","Ekim").replace("Nov","Kasım").replace("Dec","Aralık")   
	let oskobs = new Discord.MessageEmbed()
	.setColor("BLACK")
    .setDescription(` <:go_right:773919887475212358>** • <@${member.id}> Aramıza Hoşgeldin Seninle Birlikte** \` ${member.guild.memberCount}\` **Üyeye Ulaştık** \n <:tac:773903928596627456> • **Kaydının yapılması için sesli odaya gelip ses vermen gerekli. • { Ꮙ } Tagımızı alarak ekibimize katılabilirsin. **\n <:darwin:773903933251911720>** • <@&773266328785387570> Adı Rolüne Sahip Kişiler Kayıt İşlemlerinle İlgilenecektir**\n <:lolo:773903929611255839>**Hesap Kuruluş Tarihi :** \`${kuruluş}\``)
.setImage("https://cdn.discordapp.com/attachments/756969726034313406/762304211446005770/giphy.gif")  
client.channels.cache.get("773266406208307210").send(oskobs)//kanalid
})



// DM HOŞGELDİN
//-------------------------------------------- DM MESAJI-----------------------------------------////
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





// Botu Sesliye Sokma Komutudur.

client.on('ready', ()=>{
client.channels.cache.get('773266403750838303').join()//SESLI KANAL IDSINI GIRIN
})
//-------------KOMUTLAR-------\\
//-------------------------------------------- ROL Koruma Sistemi -----------------------------------------//
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
///////////////////////////////////////ready
client.on("ready", () => {
  console.log(`[buno] Bütün komutlar başarıyla yüklendi!`);
  client.user.setStatus("idle");
    client.user.setGame(`${prefix}yardım | ${client.guilds.size} Sunucu | ${client.users.size} Users!`);   //(botun oynuyor kısmı ramazan)
  console.log(`[Görkem Rewind] Bot AKTİF! Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.user + ` kullanıcıya hizmet veriliyor!`);
})
////////////////////////////////////////ready




//-------------------------------------------- Kanal Koruma Sistemi -----------------------------------------//

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
///////////////////////////////////////////////////////////////////
client.on("message", async msg => {
   if(!msg.guild) return
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapalii') return;
  if (saas == 'aciki') {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send(`<:tac:773903928596627456> Aleyküm Selam Hoşgeldin. ${msg.author} <:hg:773917400390828032>`);
  }
  }
});
////////////////////////////////////////////

client.on("message", async msg => {
   if(!msg.guild) return
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapalii') return;
  if (saas == 'aciki') {
  if (msg.content.toLowerCase() === 'selam') {
    msg.channel.send(`<:tac:773903928596627456> Aleyküm Selam Hoşgeldin. ${msg.author} <:hg:773917400390828032>`);
  }
  }
});

//-------------------------------------------- Küfür Sistemi -----------------------------------------//
client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "yarak","mk", "amk", "aq","pic", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","31","ananın amına yarak"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`Kufur Etme !`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })


//-------------------------------------------- Reklam Sistemi -----------------------------------------//
client.on("message", async message => {
  
  const lus = await db.fetch(`reklam_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.channel.send('Hey Dur! Bu Sunucuda Reklamı Engelliyorum')
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
//-------------------------------------------- MOD Sistemi -----------------------------------------//
client.on("messageDelete", async message => {
  let a = await db.fetch(`modlog_${message.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Mesaj Silindi')
    .setDescription(` **${message.author.tag}** a ait **${message.content}** adlı mesajı silindi`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelDelete", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Silindi')
    .setDescription(`**${channel.name}** Adlı Kanal Silindi!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelCreate", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Oluşturuldu')
    .setDescription(`**${channel.name}** Adlı Kanal Oluşturuldu!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
//-------------------- Otorol Sistemi --------------------//

client.on("guildMemberAdd", async member => {
  let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);

  let kanal = member.guild.channels.cache.get(kanal1);
  let rol = member.guild.roles.cache.get(rol1);

  if (!kanal) return;
  if (!rol) return;

  const embed = new Discord.MessageEmbed()

    .setColor("BLACK")
    .setDescription(
      `Sunucuya Katılan **${member}** Adlı Kullanıcıya Başarıyla \`${rol.name}\` Rolü Verildi.`
    );

  kanal.send(embed);
  member.roles.add(rol);
});

//-------------------- Otorol Sistemi --------------------//

