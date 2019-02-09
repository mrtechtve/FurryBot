const got = require("got");
const { RichEmbed: Embed } = require("discord.js");

module.exports = class modMCTL {
    constructor(client) {
        this.client = client;
        this.name = "mctl";
        this.permissions = "everyone";
        this.info = {
            category: "Music",
            usage: "",
            info: "Provides track information from MCTL"
        };
    }
    async message(msg) {
        try {
            const { body } = await got("https://prism.theak.io/api/v3/tracklist?origin=TaurBot&l=1");
            let mctl = JSON.parse(body);

            let trackArtists = mctl.tracks[0].artists;
            let artistCollection = "";

            for (let i in trackArtists) {
                if (i == 0) {
                    artistCollection = trackArtists[i].name;
                } else {
                    artistCollection += ", " + trackArtists[i].name;
                }
            }
            if (mctl.tracks[0].youtube) {
                msg.channel.send("```Monstercat changed their chat bot on December 14, 2018! this feature is currently not working for an unknown amount of time.```");
                const embed = new Embed()
                    .setTitle(`🎶 Now Playing on Monstercat FM: ${artistCollection} - ${mctl.tracks[0].title}`)
                    .setURL("https://twitch.tv/monstercat")
                    .setColor(0)
                    .setThumbnail(mctl.tracks[0].album_cover)
                    .setDescription(`[Listen on Spotify](${mctl.tracks[0].track_shortlink}) \n[Listen on YouTube](${mctl.tracks[0].youtube})\n [MCTL Website](https://mctl.io/)`)
                    .setFooter("Information provided by mctl.io", "https://mctl.io/assets/img/mctl-logo-square.png");
                msg.channel.send(embed);

            } else {
                msg.channel.send("```Monstercat changed their chat bot on December 14, 2018! this feature is currently not working for an unknown amount of time.```");
                const embed = new Embed()
                    .setTitle(`🎶 Now Playing on Monstercat FM: ${artistCollection} - ${mctl.tracks[0].title}`)
                    .setURL("http://twitch.tv/monstercat")
                    .setColor(0)
                    .setThumbnail(mctl.tracks[0].album_cover)
                    .setDescription(`[Listen on Spotify](${mctl.tracks[0].track_shortlink})\n [MCTL Website](https://mctl.io/)`)
                    .setFooter("Information provided by mctl.io", "https://mctl.io/assets/img/mctl-logo-square.png");
                msg.channel.send(embed);
            }
        } catch (err) {
            console.log(err.response.body);
        }
    }
};