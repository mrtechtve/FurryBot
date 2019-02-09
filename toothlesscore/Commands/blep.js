module.exports = class modBlep {
    constructor(client) {
        this.client = client;
        this.name = "blep";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "Blep"
        };
    }
    message(msg) {
        msg.channel.send("🇧 🇱 🇪 🇵");
    }
};