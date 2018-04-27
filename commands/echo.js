module.exports = {
	//echo is a test command that was used as an example of a command containing arguments.
	name: 'echo',
	description: 'Says what you say.',
	execute(message, args) {
        console.log(args);
        echostring = "";
        args.map(currentVal => echostring = echostring + " " + currentVal);
		message.channel.send((echostring  == "" || echostring == undefined || echostring == null) ? "You've whispered some sweet nothings there" : echostring);
	},
};