module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		message.channel.send('Pinging...').then(sent => {
    	sent.edit(`:bird: Pong! ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});

	},
};
