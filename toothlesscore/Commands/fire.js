module.exports = class modFire {
    constructor(client) {
        this.client = client;
        this.name = "fire";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "🔥"
        };
    }
    message(msg) {
        msg.channel.send('🔥🔥‍🔥🔥🔥🔥🔥🔥🔥');
    }
};