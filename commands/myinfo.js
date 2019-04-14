const {RichEmbed: Embed} = require("discord.js");
const moment = require("moment");

module.exports = class modmyinfo {
    constructor(client) {
        this.client = client;
        this.name = "myinfo";
        this.permissions = "everyone";
        this.info = {
            category: "Utility",
            usage: "",
            info: "Provides information about your Discord"
        };
    }
	/* eslint-disable no-unused-vars */
	async command(msg, args) {

        var hrolecolor = msg.member.highestRole.hexColor

        var hroleis = `- Highest role is <@&${msg.member.highestRole.id}>`


if(msg.member.presence.status == "dnd"){
    var statusemoji = ("<:dnd:567109797799788546>")
} else  if(msg.member.presence.status == "online"){
    var statusemoji = ("<:online:567109772856393738>")
} else  if(msg.member.presence.status == "offline"){
    var statusemoji = ("<:offline:567109374896766978>|")
} else  if(msg.member.presence.status == "idle"){
    var statusemoji = ("<:idle:567109046105145345>")
};


if(msg.member.highestRole.name == "@everyone"){
    var hrolecolor = "#34363C"
    var hroleis = ("")
}
        const embed = new Embed()
        .setTitle(`${statusemoji} ${msg.author.username}#${msg.author.discriminator}`)
        .setDescription(`<@${msg.author.id}> | \`${msg.author.id}\`

        - Registered ${moment(msg.author.createdAt, "YYYYMMDD").fromNow()} on \`${moment(msg.author.createdAt).format('MMM Do, YYYY')}\` 
        - Joined ${moment(msg.member.joinedAt, "YYYYMMDD").fromNow()} on \`${moment(msg.member.joinedAt).format('MMM Do, YYYY')}\`
        ${hroleis}`)
        .setColor(hrolecolor)
        .setThumbnail(msg.author.avatarURL);
    msg.channel.send(embed);
      }}
