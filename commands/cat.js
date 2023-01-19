const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Get a random picture of a cat'),
        async execute(interaction) {
            await interaction.deferReply();
            const catResult = await request('https://aws.random.cat/meow'); // Send GET request to random.cat, random file url as a JSON object in stringified form, undici receives response
            const { file } = await catResult.body.json(); // Parse body to a JSON object, which has a file property
            const embed = new EmbedBuilder()
                .setColor(0xEFFF00)
                .setTitle('Meow!')
                .setURL(file)
                .setImage(file)
            interaction.editReply({ embeds: [embed] }); // Attaches embed
        },
};