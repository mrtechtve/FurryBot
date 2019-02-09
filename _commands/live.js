module.exports = {
	name: 'live',
	description: 'live',
	execute(message, args) {
        if(args.length >= 1 && args[0] == 'stop'){
            message.member.voiceChannel.leave();
            return false;
        } 

        var twitchStreams = require('twitch-get-stream')('f2o1xgopf1l3pw8tk907q91mhiyh5q');
        twitchStreams.get('monstercat')
            .then(function(streams) {
                //console.log(streams);
                const Discord = require('discord.js');
                const client = new Discord.Client();
                var sourceStream = null;
                for(var i = 0; i < streams.length; i++){
                    if(streams[i] != null && streams[i].quality.toLowerCase() == 'audio only'){
                        sourceStream = streams[i];
                    }
                }

                
                console.log(sourceStream);
                if(sourceStream != null){
                    if (message.member.voiceChannel) {
                    message.member.voiceChannel.join()
                      .then(connection => { // Connection is an instance of VoiceConnection
                        message.reply('I have successfully connected to the channel!');
                        connection.playArbitraryInput(sourceStream.url);
                      });
                    }
                }
            });


	},
};