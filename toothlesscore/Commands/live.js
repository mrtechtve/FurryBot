const twitchStreams = require("twitch-get-stream")("f2o1xgopf1l3pw8tk907q91mhiyh5q");

module.exports = class modLive {
    constructor(client) {
        this.client = client;
        this.name = "live";
        this.permissions = "everyone";
        this.info = {
            category: "Fluff",
            usage: "[stop]",
            info: "Live"
        };
    }
    command(msg, args) {
        twitchStreams.get("monstercat")
            .then(streams => {
                let sourceStream;
                for (let i = 0; i < streams.length; i++) {
                    if (streams[i] != null && streams[i].quality.toLowerCase() == "audio only") {
                        sourceStream = streams[i];
                    }
                }
                if (sourceStream != null) {
                    if (msg.member.voiceChannel) {
                        msg.member.voiceChannel.join()
                            .then(connection => {
                                msg.reply("I have successfully connected to the channel!");
                                connection.playArbitraryInput(sourceStream.url);
                            });
                    }
                }
            });
    }
};