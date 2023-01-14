const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	execute(message) {
        if (!message.author.bot) {
            message.channel.send("Welcome to Toilet JBL Speaker bot!");
            }
	},
};