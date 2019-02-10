const Constants = require("./Constants");

module.exports = class i18n {
	constructor(client) {
		this.client = client;
		this.pattern = /({(\w+(\.?\w+?){0,})(\[[0..9]+\])*})/g;
	}

	translate(ctx, str, ...args) {
		let lang;
		let db;
		try {
			db = this.client.database.prepare("SELECT langCode FROM Language WHERE guildID = ?").get(ctx.guild.id);
		} catch (e) { this.client.events.log(e.stack, "error"); }
		if (db) lang = db.langCode;
		if (!lang) lang = Constants.DEFAULT_LANG;
		const langFile = require(`../Languages/${lang}.json`);
		if (!langFile[str]) return ":x: ERROR: String not found.";
		if (this.pattern.test(langFile[str])) {
			return this.parse(ctx, langFile[str], ...args);
		}
		return langFile[str];
	}

	parse(ctx, str, ...args) {
		let tr = str.match(this.pattern);
		console.log(args);
		if (!tr) return str;
		for (let m of tr) {
			let f = m.match(/(\w+(\.?\w+?){0,})(\[[0-9]+\])*/)[0];			
			if (/[0-9]+/.test(f)) {
				str = str.replace(m, args[+f]);
			} else {
				let func = eval(f);
				str = str.replace(m, func);
			}
		}
		return str;
	}
};