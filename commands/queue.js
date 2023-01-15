const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const ffmpeg = require("ffmpeg-static");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Get information about the music queue"),
    async execute(interaction, client) {
        await interaction.deferReply();
        try {
            const queue = await client.player.getQueue(interaction.guild);
            console.log(queue);
            if (!queue) {
                await interaction.followUp({
                    content: `❌ | Queue does not exist`,
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
                    content: `🎶 | Playing: ${queue.previousTracks[0].title}\n📖 | Queue List\n${result}`,
                });
            }
        } catch {

        }
    }}
