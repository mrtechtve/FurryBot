const fs = require('fs');
const Discord = require('discord.js');
const token = require('./settings.json').token;
const prefix = require('./settings.json').prefix;
const download = require('image-downloader');
const client = new Discord.Client();
const omnichat = client.channels.get('372011399720861718')
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const chalk = require('chalk');
const server_id = require('./settings.json').server_id
const log_channel_id = require('./settings.json').log_channel_id; 

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log('TaurBot');

client.on('ready', () => {
	console.log(chalk.green('Ready!'));
	`client.user.setActivity('with friends', { type: 'PLAYING' });`

});

client.on('message', message => {
	const Attachment = (message.attachments).array();

	if(message.author.bot | message.channel.id == '335458962470076416' | message.channel.id == '372011399720861718') return;
	if(message.guild.id !== server_id) return;
	if(message.channel.id == log_channel_id) return;



	client.channels.get(log_channel_id).send(
		`${message.cleanContent} by ${message.author.username} in ${message.channel}`);
	Attachment.forEach(function(attachment) {
		client.channels.get(log_channel_id).send({ files: [ `${attachment.url}`] });


		const options = {
			url: `${attachment.url}`,
			dest: './Images',
		};

		if(message.channel.id == '347006532321411074') {
			download.image(options)
				.then(({ filename, image }) => {
					console.log(chalk.white('File saved to', filename))
				}).catch((err) => {
					throw err;
				});
		}

	});
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
