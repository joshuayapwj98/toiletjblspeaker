const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	execute(message) {
        if (!message.author.bot) {
            message.channel.send("Welcome to Toilet JBL Speaker bot!");
		}

		const args = message.content.split(" ");
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {

		return message.channel.send(
			"You need to be in a voice channel to play music!"
			);
		}
	},
};