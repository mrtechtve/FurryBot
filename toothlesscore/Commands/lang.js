const fs = require("fs");

module.exports = class modLang {
	constructor(client) {
		this.client = client;
		this.name = "language";
		this.aliases = ["lang"];
		this.permissions = "admin";
		this.info = {
			category: "Admin",
			usage: "<xx_XX language code>/<list>/<reset>",
			info: "Sets or resets the bot's language for the server, or lists them all."
		};
	}
	command(msg, args) {
		if (!args.length) return msg.channel.send(this.client.cmdInfo.getCommandInfo(this.name));
		if (args.match(/[a-z]{2}_[A-Z]{2}/g)) {
			let langs = fs.readdirSync("./Languages");
			let langlist = [];
			for (let i of langs) {
				langlist.push(i.substring(0, i.length - 5));
			}
			if (langlist[langlist.indexOf(args)]) {
				this.client.database.prepare("INSERT INTO Language VALUES (?, ?)").run(langlist[langlist.indexOf(args)], msg.guild.id);
				msg.channel.send(this.client.i18n.translate(msg, "lang.changed_to", langlist[langlist.indexOf(args)]));
			} else return msg.channel.send(this.client.i18n.translate(msg, "lang.not_exist"));
		} else {
			if (args == "list") {
				const langs = fs.readdirSync("./Languages");
				let list = [];
				for (let l of langs) {
					console.log(`Lang: ${l}, type: ${typeof l}`);
					const i = l.substring(0, l.length - 5);
					console.log(i);
					list.push(i.toString());
					console.log(list);
				}
				const final = list.join(", ");
				console.log(final);
				msg.channel.send(final);
				return msg.channel.send(this.client.i18n.translate(msg, "lang.list", final));
			} else if (args == "reset") {
				const exists = this.client.database.prepare("SELECT * FROM Language WHERE guildID = ?").get(msg.guild.id);
				if (exists) {
					this.client.database.prepare("DELETE FROM Language WHERE guildID = ?").run(msg.guild.id);
					return msg.channel.send(this.client.i18n.translate(msg, "lang.reset_success"));
				} else return msg.channel.send(this.client.i18n.translate(msg, "lang.reset_failure"));
			} else return msg.channel.send(this.client.cmdInfo.getCommandInfo(this.name));
		}
	}
};