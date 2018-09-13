var socket = require('socket.io-client')('wss://prism.theak.io:443');

module.exports = {
    name: 'mc-live',
	description: 'mc-live',
	execute(message, args) {

        if(message.author.id != "187986160914661377") return;

        if(args.length >= 1 && args[0] == 'stop'){
            socket.off();socket.close();message.channel.send('MCTL Track Reporting Stopped');
        } else { 
            if(!socket.connected){
socket.open();
            } 
            if(socket.hasListeners('new-track')){
                console.log('Off');socket.off()
            }
            socket.on('new-track', function(data){
                mctl = data
                var track_artists = mctl.artists;
                var artist_collection = "";
 
                for (var i=0; i < track_artists.length; i++) {
                    if(i == 0) {
                     artist_collection = track_artists[i].name;
                    } else {
                        artist_collection = artist_collection + ", " + track_artists[i].name;
                    }
                }
 
                 if(mctl.youtube != undefined)
                     {message.channel.send({embed: {
                         title: `🎶 Now Playing on Monstercat FM: ${artist_collection} - ${mctl.title} `,
                         url: "http://twitch.tv/monstercat",
 
                         color: 0x000000,
                         thumbnail: {
                             url: mctl.album_cover,
                         },
                         description: `[Listen on Spotify](${mctl.track_shortlink}) \n[Listen on YouTube](${mctl.youtube})\n [MCTL Website](https://mctl.io/)`,
                         footer: {
                             icon_url: "https://images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png",
                             text: "Information provided by mctl.io"
                           }
                       }});}
                       else{ message.channel.send({embed: {
                         title: `🎶 Now Playing on Monstercat FM: ${artist_collection} - ${mctl.title} `,
                         url: "http://twitch.tv/monstercat",
         
                         color: 0x000000,
                         thumbnail: {
                             url: mctl.album_cover,
                         },
                         description: `[Listen on Spotify](${mctl.track_shortlink})\n [MCTL Website](https://mctl.io/)`,
                         footer: {
                             icon_url: "https://images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png",
                             text: "Information provided by mctl.io"
                           }
                       }});}
            });
            socket.on('disconnect', function(){});
            //socket.on('pong', function(ms){});
            socket.emit('last-track')
            //socket.on('connect', function(){socket.emit('last-track');console.log('Running');console.log(socket.id); console.log(socket.connected);});
           }

    }};
