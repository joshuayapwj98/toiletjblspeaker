const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const ffmpeg = require("ffmpeg-static");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Get information about the music queue"),
    async execute(interaction, client) {
        try {
            const queue = await client.player.getQueue(interaction.guild);
            if (!queue) {
                await interaction.followUp({
                    content: `❌ | Queue does not exist!`,
                });
            } else {
                var result = '';
                const tracks = queue.tracks;
                console.log(tracks);
                for (let i = 0; i < tracks.length; i++) {
                    result += `${i+1}. ${tracks[i].title}\n`;
                }
                console.log(result);
                await interaction.followUp({
                    content: `Queue List\n${result}`,
                });
            }
        } catch {

        }
    }}
