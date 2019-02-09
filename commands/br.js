module.exports = class modBulkRemove {
    constructor(client) {
        this.client = client;
        this.name = "bulkdelete";
        this.permissions = "admin";
		this.aliases = ["br"];
        this.info = {
			category: "Admin",
			usage: "<number>",
			info: "Bulk deletes messages."
		};
    }
	async command(msg, args) {
		if (!args.length) return msg.channel.send(this.client.cmdInfo.getCommandInfo(this.name));
		if (!parseInt(args)) return msg.channel.send(this.client.i18n.translate(msg, "bulkdelete.invalid"));
		if (parseInt(args) > 100) return msg.channel.send(this.client.i18n.translate(msg, "bulkdelete.too_high")).then(async m => {
			await msg.delete(5000);
			await m.delete(5000);
		});
		await msg.delete();
		msg.channel.bulkDelete(parseInt(args)).then(msgs => {
			msg.channel.send(this.client.i18n.translate(msg, "bulkdelete.delete", msgs.size)).then(m => {
				m.delete(5000);
			});
		});
	}
};
