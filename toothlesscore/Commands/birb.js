const birb = require("birb");
const {RichEmbed: Embed} = require("discord.js");

module.exports = class modBirb {
    constructor(client) {
        this.client = client;
        this.name = "birb";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "Birb."
        };
    }
    message(msg) {
        msg.channel.startTyping(10000);
        birb.random().then(url => {
            const embed = new Embed()
                .setDescription(":bird: Birb!")
                .setColor(0xDD2E44)
                .setImage(url)
                .setFooter("Powered by random.birb.pw");
            msg.channel.send(embed);
            msg.channel.stopTyping(true);
        });
    }
};