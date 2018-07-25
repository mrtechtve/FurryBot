const fs = require('fs');
const Discord = require('discord.js');
const token = require('./settings.json').token;
const prefix = require('./settings.json').prefix;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const chalk = require('chalk');
const server_id = require('./settings.json').server_id

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log('FurryBot');

client.on('ready', () => {
	console.log(chalk.green('Ready!'));
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/\s+/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('guildDelete', guild=>{
	console.log(chalk.green(`Left guild ${guild.name} at ${new Date()}`));

});

client.on('guildCreate', guild =>{
	console.log(chalk.green(`Joined Guild ${guild.name} at ${new Date()}`));

});

client.login(token);
