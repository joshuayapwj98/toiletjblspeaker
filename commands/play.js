const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const ffmpeg = require("ffmpeg-static");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music")
    .addStringOption((option) =>
      option.setName("query").setDescription("The song name").setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();
    const query = interaction.options.get("query").value;
    const searchResult = await client.player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch(() => {});
    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({ content: "No results were found!" });
    const queue =
      (await client.player.getQueue(interaction.guild)) ??
      (await client.player.createQueue(interaction.guild, {
        metadata: interaction.channel,
      }));

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      void client.player.deleteQueue(interaction.guildId);
      return void interaction.followUp({
        content: "Could not join your voice channel!",
      });
    }

    await interaction.followUp({
      content: `⏱ | Loading your ${
        searchResult.playlist ? "playlist" : "track"
      }...`,
    });
    searchResult.playlist
      ? await queue.addTracks(searchResult.tracks)
      : await queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
  },
};
