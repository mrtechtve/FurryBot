const {RichEmbed: re} = require("discord.js");
const Constants = require("../Modules/Constants");

module.exports = class modInfo {
	constructor(client) {
		this.client = client;
		this.name = "info";
		this.permissions = "everyone";
		this.info = {
			category: "Info",
			usage: "[username | mention | id]",
			info: "Shows info about a current user, or yourself if used empty."
		};
	}
	command(msg, args) {
		if (!args) return this.getUser(msg, msg, "self");
		let u = args;
		if (/<@[!]?[0-9]{17,18}>/.test(u)) u = u.replace(/^<@[!]?/, "").replace(/>$/, "");
		if (parseInt(u)) {
			const user = msg.guild.members.get(u);
			if (!user) {
				try {
					this.client.fetchUser(u).then(m => {
						this.getUser(msg, m, "out_of_guild");
					}).catch(() => {
						return msg.channel.send(this.client.i18n.translate(msg, "info.not_found"));
					});
				} catch (_) {
					return msg.channel.send(this.client.i18n.translate(msg, "info.not_found"));
				}
			} else this.getUser(msg, user, "in_guild");
		} else {
			const user = msg.guild.members.find(m => m.user.tag.toLowerCase().includes(args.toLowerCase()));
			if (!user) return msg.channel.send(this.client.i18n.translate(msg, "info.not_found"));
			const usr = msg.guild.members.get(user.user.id);
			try {
				this.getUser(msg, usr, "in_guild");
			} catch (_) {
				return msg.channel.send(this.client.i18n.translate(msg, "info.not_found"));
			}
		}
	}
	getUser(msg, user, type) {
		switch (type) {
			case "in_guild": {
				const status = user.user.presence.status.toUpperCase();
				const embed = new re()
					.setTitle(this.client.i18n.translate(msg, "info.user_info_w", Constants.EMOTES[status]))
					.setColor(Constants.COLORS[status])
					.setThumbnail(user.user.avatarURL)
					.addField(this.client.i18n.translate(msg, "info.tag"), user.user.tag, true)
					.addField(this.client.i18n.translate(msg, "info.id"), user.user.id, true)
					.addField(this.client.i18n.translate(msg, "info.nickname"), user.nickname ? user.nickname : this.client.i18n.translate(msg, "info.none"), true)
					.addField(this.client.i18n.translate(msg, "info.joined"), user.joinedAt.toLocaleString(), true)
					.addField(this.client.i18n.translate(msg, "info.created"), user.user.createdAt.toLocaleString(), true);
				if (user.user.presence.game) {
					if (user.user.presence.game.type === 0)
						embed.addField(this.client.i18n.translate(msg, "info.game"), user.user.presence.game ? user.user.presence.game.name : this.client.i18n.translate(msg, "info.none"), true);
					if (user.user.presence.game.type === 1)
						embed.addField(this.client.i18n.translate(msg, "info.watching"), user.user.presence.game.name, true);
					if (user.user.presence.game.type === 2)
						embed.addField(this.client.i18n.translate(msg, "info.listening"), user.user.presence.game.name, true);
					if (user.user.presence.game.type === 3)
						embed.addField(this.client.i18n.translate(msg, "info.streaming"), `[${user.user.presence.game.name}](${user.user.presence.game.url})`);
				}
				msg.channel.send(embed);
				break;
			}
			case "out_of_guild": {
				const embed = new re()
					.setTitle(this.client.i18n.translate(msg, "info.user_info"))
					.setThumbnail(user.avatarURL)
					.addField("Tag", user.tag, true)
					.addField("ID", user.id, true);
				msg.channel.send(embed);
				break;
			}
			case "self": {
				const status = user.author.presence.status.toUpperCase();
				const embed = new re()
					.setTitle(this.client.i18n.translate(msg, "info.user_info_w", Constants.EMOTES[status]))
					.setColor(Constants.COLORS[status])
					.setThumbnail(user.author.avatarURL, true)
					.addField(this.client.i18n.translate(msg, "info.tag"), user.author.tag, true)
					.addField(this.client.i18n.translate(msg, "info.id"), user.author.id, true)
					.addField(this.client.i18n.translate(msg, "info.nickname"), user.member.nickname ? user.member.nickname : "None", true)
					.addField(this.client.i18n.translate(msg, "info.joined"), user.member.joinedAt.toLocaleString(), true)
					.addField(this.client.i18n.translate(msg, "info.created"), user.author.createdAt.toLocaleString(), true);
				if (user.author.presence.game) {
					if (user.author.presence.game.type === 0)
						embed.addField(this.client.i18n.translate(msg, "info.game"), user.author.presence.game ? user.author.presence.game.name : "None", true);
					if (user.author.presence.game.type === 1)
						embed.addField(this.client.i18n.translate(msg, "info.watching"), user.author.presence.game.name, true);
					if (user.author.presence.game.type === 2)
						embed.addField(this.client.i18n.translate(msg, "info.listening"), user.author.presence.game.name, true);
					if (user.author.presence.game.type === 3)
						embed.addField(this.client.i18n.translate(msg, "info.streaming"), `[${user.author.presence.game.name}](${user.author.presence.game.url})`);
				}
				msg.channel.send(embed);
				break;
			}
		}
	}
};
