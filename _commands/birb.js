const birb = require('birb');
var Discord = require(`discord.js`);

module.exports = {
	name: 'birb',
	execute(message) {
        message.channel.startTyping('10000');
        birb.random()
        .then(url => {
            const embed = new Discord.RichEmbed()
            .setDescription(':bird: Birb!')
            .setColor(0xDD2E44)
            .setImage(`${url}`)
            .setFooter('Powered by random.birb.pw')
        message.channel.send({embed: embed});
        message.channel.stopTyping(true);
        });
	},
};