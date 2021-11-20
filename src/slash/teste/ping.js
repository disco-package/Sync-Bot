const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data:{
    'name':'ping',
    'description':'pong'
  },
  run: async (client, interaction) => {

        interaction.reply({ content: `📡 **|** My latency is in \`${Math.round(client.ws.ping)}ms\`` })

  },
};