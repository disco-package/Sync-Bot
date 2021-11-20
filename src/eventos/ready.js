const {MessageEmbed} = require('discord.js')
const {red, blue, yellow, black, cyan, greenBright, green} = require('chalk');
module.exports = async client => {

   //-------------SLASH-COMMAND--------------//
    client.application.commands.create({
        name:'ping',
        description:'📡 | Look at my latency',
    })
    //-------------SLASH-COMMAND--------------//     

   let activities = [
     `Atualmente em ${client.guilds.cache.size} servidores | Prefix [s.]`,
     `Divertindo ${client.users.cache.size} usuários | Prefix [s.]`,
     `Possuo ${client.commands.size} comandos ainda | Prefix [s.]`
   ],
   i = 0;     
setInterval(()=>{
client.user.setPresence({ activities: [{ name: `${activities[i++ % activities.length]}`, status: 'dnd' }] });
   client.user.setStatus('dnd')
},2000)
   

   setInterval(()=>{
   client.users.cache.sweep(u=>u.bot)
   }, 10000)

    console.info(red(`[ SYNC ] CONECTADO NO: ${client.user.tag}`))
    client.fetchWebhook('911028847904968734', '5LNgKoB8kdMXGaCy2XnD9JGppx8nrwVz7A36CtPz0dlq0-Yx5GCXLRakXKS_qX5uKXNw').then(w => w.send(`🗺️ - Bot **\`${client.user.tag}\`** Foi ligado ( ou reiniciado ), Com **\`${client.commands.size}\`** Comandos, e com **\`${client.guilds.cache.size}\`** Servidores`))
};