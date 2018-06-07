const birb = require('birb');

module.exports = {
	name: 'birb',
	execute(message) {
        birb.random()
        .then(url => {
            message.channel.send({ files: [ `${url}`] });
        });
	},
};