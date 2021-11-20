const { MessageEmbed, Collection } = require("discord.js");
const Timeout = new Collection();
module.exports = async (client, message) => {
  
    let prefix = client.db.get(`prefix_${message.guild.id}`);
    if (prefix === null  || prefix === undefined) {
      prefix = 's.'
    }

    let embed = new MessageEmbed().setDescription(`fazendo`)
  
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return message.reply({ embeds: [embed], content: `${message.author}` });

  
    if(message.author.bot) return
    if(message.channel.type === 'dm') return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(!message.guild) return;
      
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd))
      
    if(command){
      command.run(client, message, args)
    }
} 