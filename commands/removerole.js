module.exports = class modRemoveRole {
	constructor(client) {
		this.client = client;
		this.name = "removerole";
		this.permissions = "admin";
		this.info = {
			category: "Admin",
			usage: "<user> <role name>",
			info: "Removes a role from a user."
		};
	}
	async command(msg, args) {
		if (!args.length) return msg.channel.send(this.client.cmdInfo.getCommandInfo(this.name));
		const _args = args.split(/ +/);
		let u = _args[0];
		if (/<@[!]?[0-9]{17,18}>/.test(u)) {
			u = u.replace(/^<@[!]?/, "");
			u = u.replace(/>$/, "");
		}
		const user = msg.guild.members.get(u);
		let __args = "";
		for (let i = 1; i < _args.length; i++) __args += (_args[i] + " ");
		__args = __args.trim();
		const role = msg.guild.roles.find("name", __args);
		if (!role) return msg.channel.send(this.client.i18n.translate(msg, "role.error"));
		user.removeRole(role, "[RemoveRole]").then(() => {
			msg.channel.send(this.client.i18n.translate(msg, "removerole.success", role.name, user.user.username)).then(m => {
				m.delete(5000);
				msg.delete(5000);
			});
		}).catch(e => {
			msg.channel.send(this.client.i18n.translate(msg, "errors.generic"));
			this.client.events.log(e.stack, "error");
		});
	}
};
