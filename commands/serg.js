module.exports = class modSerg {
    constructor(client) {
        this.client = client;
        this.name = "serg";
        this.permissions = "everyone";
        this.info = {
            category: "Fun",
            usage: "",
            info: "Sergals are cheese!"
        };
    }
    command(msg) {
        msg.channel.send("🧀🧀🧀🧀🧀🧀🧀🧀🧀");
    }
};