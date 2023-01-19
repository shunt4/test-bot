const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createrole')
		.setDescription('Creates a new role with the specified name.')
		.addStringOption(option => 
			option
				.setName('name')
				.setDescription('The role\'s name')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
		const roleName = interaction.options.getString('name');
		await interaction.reply(`Creating new role ${roleName}...`);
		await interaction.guild.roles.create({
			name: roleName,
			permissions: [PermissionsBitField.Flags.SendMessages,
						  PermissionsBitField.Flags.ViewChannel,
						  PermissionsBitField.Flags.ReadMessageHistory,
						  PermissionsBitField.Flags.UseApplicationCommands,
						  PermissionsBitField.Flags.ChangeNickname,
						  PermissionsBitField.Flags.AddReactions, 
						  PermissionsBitField.Flags.AttachFiles],
			color: Math.floor(Math.random() * (0xFFFFFF + 1))
		});
		interaction.editReply(`Created role ${roleName} successfully!`);
	}	
};