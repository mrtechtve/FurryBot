module.exports = {
	name: 'time',
	description: 'Tells you the current time',
	execute(message) {
		message.channel.send(`Current Time: ${new Date()}`);
	},
};