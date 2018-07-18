const birb = require('birb');
var Discord = require(`discord.js`);

module.exports = {
	name: 'birb',
	execute(message) {
        birb.random()
        .then(url => {
            const embed = new Discord.MessageEmbed()
            .setDescription(':bird:')
            .setColor(0xDD2E44)
            .setImage(`${url}`)
        message.channel.send({embed: embed});
        });
	},
};