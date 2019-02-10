module.exports = class modGay {
    constructor(client) {
        this.client = client;
        this.name = "gay";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "Gay"
        };
    }
    command(msg) {
        msg.channel.send('🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈');
    }
};