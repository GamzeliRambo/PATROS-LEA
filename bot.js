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
  var lrowstag = "Ꮙ"//tagı buraya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `752170350472724580`)
  let rol = lrowssunucu.roles.cache.find(a => a.id === `772814848521666570`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsnewUser.id)
  if (lrowsnewUser.username.includes(lrowstag) && !lrowsoldUser.username.includes(lrowstag)) {
    lrowsuye.roles.add('772814848521666570')
    let lrowsembed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(` <@${lrowsnewUser.id}> **adlı üye** "Ꮙ" **tagımızı aldığı için** <@&772814848521666570> **rolü verildi!**`)
    client.channels.cache.get(`772815188185186334`).send (lrowsembed)

  }
}
          );
client.on('userUpdate', async (lrowsoldUser, lrowsnewUser) => {
  var lrowstag = "Ꮙ"//tagı braya girmeniz yeterli olacaktır
  let lrowssunucu = client.guilds.cache.find(e => e.id === `752170350472724580`)
  let lrowsrol = lrowssunucu.roles.cache.find(a => a.id === `772814848521666570`)
  let lrowsuye = lrowssunucu.members.cache.get(lrowsoldUser.id)
  if (lrowsoldUser.username.includes(lrowstag) && !lrowsnewUser.username.includes(lrowstag)) {
    lrowsuye.roles.remove('772814848521666570')
    let lrowsembedd = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setDescription(` <@${lrowsoldUser.id}> **adlı üye** "Ꮙ" **tagımızı çıkardığı için** <@&772814848521666570> **rolü alındı!**`)
    client.channels.cache.get(`772815188185186334`).send (lrowsembedd)

  }
}
          ); 
//OTO ROL



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
///HG MESAJI
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
    .setDescription(`<:tac:773903928596627456>** <@${member.id}> Aramıza Hoşgeldin Seninle Birlikte** \`${member.guild.memberCount}\` **Üyeye Ulaştık** \n <:tac:773903928596627456>**Kaydının yapılması için sesli odaya gelip ses vermen gerekli. **\n <:darwin:773903933251911720>** <@&773266328785387570> Adı Rolüne Sahip Kişiler Kayıt İşlemlerinle İlgilenecektir**\n <:lolo:773903929611255839>**Hesap Kuruluş Tarihi :** \`${kuruluş}\``)
.setImage("https://cdn.discordapp.com/attachments/756969726034313406/762304211446005770/giphy.gif")  
client.channels.cache.get("773266406208307210").send(oskobs)//kanalid
})



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





// Botu Sesliye Sokma Komutudur.

client.on('ready', ()=>{
client.channels.cache.get('773266403750838303').join()//SESLI KANAL IDSINI GIRIN
})
//-------------KOMUTLAR-------\\
////////////////////////////////////////ROL KORUMA/////////////////////////////////////////////////////////////////////////


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
///////////////////////////////////////////////////////////////////
client.on("message", async msg => {
   if(!msg.guild) return
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapalii') return;
  if (saas == 'aciki') {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send(`Aleyküm Selam Hoşgeldin. ${msg.author} <a:577677056876347403:708395193484968038>`);
    await msg.react('🇦');
    await msg.react('🇸');
  }
  }
});