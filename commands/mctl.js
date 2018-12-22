const got = require('got');

module.exports = {
	name: 'mctl',
	description: 'Provides track information from MCTL',
	execute(message) {
		(async () => {
            try {
                const response = await got('https://prism.theak.io/api/v3/tracklist?origin=TaurBot&l=1');
                mctl = JSON.parse(response.body);

               var track_artists = mctl.tracks[0].artists;
               var artist_collection = "";

               for (var i=0; i < track_artists.length; i++) {
                   if(i == 0) {
                    artist_collection = track_artists[i].name;
                   } else {
                       artist_collection = artist_collection + ", " + track_artists[i].name;
                   }
               }

                if(mctl.tracks[0].youtube != undefined)
                    {   message.channel.send('\`\`\`Monstercat changed their chat bot on December 14, 2018! this feature is currently not working for an unknown amount of time.\`\`\`'); 
                        message.channel.send({embed: {
                        title: `🎶 Now Playing on Monstercat FM: ${artist_collection} - ${mctl.tracks[0].title} `,
                        url: "http://twitch.tv/monstercat",

                        color: 0x000000,
                        thumbnail: {
                            url: mctl.tracks[0].album_cover,
                        },
                        description: `[Listen on Spotify](${mctl.tracks[0].track_shortlink}) \n[Listen on YouTube](${mctl.tracks[0].youtube})\n [MCTL Website](https://mctl.io/)`,
                        footer: {
                            icon_url: "https://images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png",
                            text: "Information provided by mctl.io"
                          }
                      }});}
                      else{message.channel.send('\`\`\`Monstercat changed their chat bot on December 14, 2018! this feature is currently not working for an unknown amount of time.\`\`\`');  
                          message.channel.send({embed: {
                        title: `🎶 Now Playing on Monstercat FM: ${artist_collection} - ${mctl.tracks[0].title} `,
                        url: "http://twitch.tv/monstercat",
        
                        color: 0x000000,
                        thumbnail: {
                            url: mctl.tracks[0].album_cover,
                        },
                        description: `[Listen on Spotify](${mctl.tracks[0].track_shortlink})\n [MCTL Website](https://mctl.io/)`,
                        footer: {
                            icon_url: "https://images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png",
                            text: "Information provided by mctl.io"
                          }
                      }});}
                //=> '<!doctype html> ...'
            } catch (error) {
                console.log(error.response.body);
                //=> 'Internal server error ...'
            }
        })();
	},
};

