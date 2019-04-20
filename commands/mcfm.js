const {RichEmbed: Embed} = require("discord.js");
const twitchStreams = require('twitch-get-stream')('f2o1xgopf1l3pw8tk907q91mhiyh5q');
    
module.exports = class modMCFM {
    constructor(client) {
        this.client = client;
        this.name = "mcfm";
        this.permissions = "everyone";
        this.info = {
            category: "Music",
            usage: "[leave]",
            info: "Listen to Monstercat Radio in a voice channel"
        };
    }
    command(msg, args) {
        console.log(args)
        if (args.length && args == "leave") {
            msg.member.voiceChannel.leave();
            return msg.channel.send("Disconnected from Voice Channel");
        }

        twitchStreams.get("monstercat").then(streams => {
            let sourceStream;
            for (let i in streams) {
                if (streams[i] != null && streams[i].quality.toLowerCase() == "audio only")
                    sourceStream = streams[i];
            }
            if (sourceStream) {
                if (msg.member.voiceChannel) {
                    msg.member.voiceChannel.join().then(conn => {
                        conn.playArbitraryInput(sourceStream.url);
                        msg.channel.send("`WARNING: This command is unfinished and contains bugs. The bot will not leave the voice channel until you issue the [leave] command, even if you disconnect`");
                        const embed = new Embed()
                            .setTitle("You are listening to:")
                            .setDescription("Monstercat Radio \n A 24/7 music stream of non stop Monstercat music! \n [Listen on the Monstercat Hub](https://live.monstercat.com/)")
                            .setColor(0x6441A4)
                        msg.channel.send(embed);
                    });
                } else {
                    msg.channel.send("You are not currently in a voice channel, please join a voice channel and try again.");
                }
            }
        });
    }
};