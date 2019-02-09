const moment = require('moment');
const socket = require('socket.io-client')('wss://prism.theak.io:443');
const {RichEmbed: Embed} = require("discord.js");
const twitchStreams = require('twitch-get-stream')('f2o1xgopf1l3pw8tk907q91mhiyh5q');
require("moment-recur");

module.exports = class modMCFM {
    constructor(client) {
        this.client = client;
        this.name = "mcfm";
        this.permissions = "everyone";
        this.info = {
            category: "music",
            usage: "[leave]",
            info: ""
        };
    }
    command(msg, args) {
        if (args.length >= 1 && args[0] == "leave") {
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
                        const embed = new Embed()
                            .setTitle("You are listening to:")
                            .setDescription("Monstercat Radio \n A 24/7 music stream of non stop Monstercat music! \n [Listen on the Monstercat Hub](https://live.monstercat.com/)")
                            .setColor(0x6441A4)
                            .setThumbnail("https://images-ext-2.discordapp.net/external/MTnKJPFo7Xr1hmLHZamfnGMyBv3yarKfEh4vn1f-j6s/https/images-ext-1.discordapp.net/external/gJnNg5O5sQtjxqjfbPJxsteW3slu549UJ2sF7XQCYP0/https/mctl.io/assets/img/mctl-logo-square.png");
                        msg.channel.send(embed);
                    });
                } else {
                    msg.channel.send("You are not currently in a voice channel, please join a voice channel and try again.");
                }
            }
        });
    }
};