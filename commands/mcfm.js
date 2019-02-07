var socket = require('socket.io-client')('wss://prism.theak.io:443');
var moment = require('moment');
var Discord = require(`discord.js`);
require('moment-recur');

module.exports = {
    name: 'mcfm',
	description: 'mcfm',
	execute(message, args) {

        if(args.length >= 1 && args == 'leave'){
            message.member.voiceChannel.leave();
            message.channel.send('Disconnected from Voice Channel');
            return false;
        } else 

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
                if(sourceStream != null){
                    if (message.member.voiceChannel) {
                        message.member.voiceChannel.join()
                        .then(connection => { // Connection is an instance of VoiceConnection


                            connection.playArbitraryInput(sourceStream.url);
                            const embed = new Discord.RichEmbed()
                
                            .setTitle('You are Listening to:')
                            .setDescription(`Monstercat Radio \n A 24/7 music stream of non stop Monstercat music! \n [Listen on the Monstercat Hub](https://live.monstercat.com/)`)
                            .setColor(0x6441A4)
                            .setThumbnail(`https://images-ext-2.discordapp.net/external/MTnKJPFo7Xr1hmLHZamfnGMyBv3yarKfEh4vn1f-j6s/https/images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png`)
                        message.channel.send({embed: embed});

                        });
                    } else {
                        message.channel.send('You are not currently in a voice channel, please join a voice channel and try again.');


                    }
                }
            })}}