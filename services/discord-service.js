var fs = require('node:fs');
var path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

class DiscordService {
    constructor (clientId, guildId, token) {
        this.clientId = clientId;
        this.guildId = guildId;
        this.token = token;
        const client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
          ]});
        this.client = client;
    }

    init() {
        this.client.commands = new Collection();
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            this.client.commands.set(command.data.name, command);
        }
    }

    login() {
        this.client.login(this.token);
    }

    get getClient() {
        return this.client;
    }
}

module.exports = DiscordService;