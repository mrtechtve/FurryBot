module.exports = class modBeep {
    constructor(client) {
        this.client = client;
        this.name = "beep";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "Beep!"
        };
    }
    command(msg) {
        msg.channel.send("Boop.");
    }
};