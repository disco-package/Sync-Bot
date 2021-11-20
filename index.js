//****************************[ 24/7 ]*********************************//
const express = require('express');
const app = express();
app.get("/", (req, res) => {
  res.send('Online')
});
app.listen(process.env.PORT)
//*****************************[ BOT ]*********************************//
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [32767] });
//****************************[ NPM's ]********************************//
const {readdirSync,readFileSync}= require('fs');
const {red, blue, yellow, black, cyan, greenBright, green} = require('chalk');
const simp = require('simpl.db')
const clientId = '893187379630837792';
//****************************[ LOGIN ]********************************//
client.login(process.env['token']);
//**************************[ COLLECTION ]*****************************//
client.db = new simp()
client.commands = new Collection();
client.aliases = new Collection();
client.slash = new Collection();
//***************************[ HANDLER ]*******************************//
readdirSync("./src/comandos/").forEach(dir => {
  const commands = readdirSync(`./src/comandos/${dir}/`).filter(file => file.endsWith(".js"))
  for(let file of commands) {
      let pull = require(`./src/comandos/${dir}/${file}`)
      if(pull.name) {
          client.commands.set(pull.name, pull)
      } else {
          continue;
      } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
}
});
const eventFile = readdirSync('./src/eventos/').forEach(f => {
const name = f.split('.')[0]
const content = require(`./src/eventos/${f}`)
client.on(name, content.bind(null, client))
});
readdirSync("./src/slash/").forEach(pasta => {
  const commands = readdirSync(`./src/slash/${pasta}/`).filter(arquivo => arquivo.endsWith(".js"))
  for(let arquivo of commands) {
      let command = require(`./src/slash/${pasta}/${arquivo}`)
      if(command.data) {
          client.slash.set(command.data.name, command)
      } 
}
});
//****************************[ SLASH ]*******************************//
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.run(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Não foi possível carregar este comando!', ephemeral: true });
	}
});
//****************************[ SYNC LOGS ]*******************************//  
process.on('uncaughtException', e => {
    client.fetchWebhook('911028847904968734', '5LNgKoB8kdMXGaCy2XnD9JGppx8nrwVz7A36CtPz0dlq0-Yx5GCXLRakXKS_qX5uKXNw').then(w => w.send(`📮 - Bot **\`${client.user.tag}\`** Ocorreu um erro: ${e.message}`))
});

process.on('unhandledRejection', e => {
client.fetchWebhook('911028847904968734', '5LNgKoB8kdMXGaCy2XnD9JGppx8nrwVz7A36CtPz0dlq0-Yx5GCXLRakXKS_qX5uKXNw').then(w => w.send(`📮 - Bot **\`${client.user.tag}\`** Ocorreu um erro: ${e.message}`))
});   