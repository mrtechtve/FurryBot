module.exports = class modTester {
    constructor(client) {
        this.client = client;
        this.name = "tester";
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