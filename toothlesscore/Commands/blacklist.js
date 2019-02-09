module.exports = class modBlacklist {
	constructor(client) {
		this.client = client;
		this.name = "blacklist";
		this.permissions = "owner";
		this.info = {
			category: "Hidden",
			usage: "<user>",
			info: "Blacklist a user from the bot."
		};
	}
	async command(msg, args) {
		if (!args.length) return msg.channel.send(this.client.cmdInfo.getCommandInfo(this.name));
		const _args = args.split(/ +/);
		let __args = "";
		for (let i = 1; i < _args.length; i++) __args += (_args[i] + " ").trim();
		if (_args[0] === "add") {
			if (/<@[!]?[0-9]{17,18}>/.test(__args)) {
				__args = __args.replace(/^<@[!]?/, "");
				__args = __args.replace(/>$/, "");
			}
			const user = this.client.users.get(__args);
			const blacklisted = this.client.database.prepare("SELECT * FROM Blacklist WHERE ID = ?").get(__args);
			if (!blacklisted) {
				this.client.database.prepare("INSERT INTO Blacklist VALUES (?)").run(__args);
				return msg.channel.send(this.client.i18n.translate(msg, "blacklist.add", user.tag));
			} else return msg.channel.send(this.client.i18n.translate(msg, "blacklist.blacklisted", user.tag));
		}
		if (_args[0] === "remove") {
			if (/<@[!]?[0-9]{17,18}>/.test(__args)) {
				__args = __args.replace(/^<@[!]?/, "");
				__args = __args.replace(/>$/, "");
			}
			const user = this.client.users.get(__args);
			const blacklisted = this.client.database.prepare("SELECT * FROM Blacklist WHERE ID = ?").get(__args);
			if (blacklisted) {
				this.client.database.prepare("DELETE FROM Blacklist WHERE ID = ?").run(__args);
				return msg.channel.send(this.client.i18n.translate(msg, "blacklist.remove", user.tag));
			} else return msg.channel.send(this.client.i18n.translate(msg, "blacklist.not_blacklisted", user.name));
		}
	}
};
