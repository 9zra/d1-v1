const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'utliser le menu contextuel de discord',
    examples: ['utliser le menu contextuel de discord'],
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://cdn.discordapp.com/attachments/946877052085219328/959861423759040582/unknown.png' : 'https://cdn.discordapp.com/attachments/946877052085219328/959860044118257796/unknown.png' })
            .setColor('#000001')
            .setImage(member.user.displayAvatarURL())
            .addFields(
                {name: 'Nom', value: `${member.displayName}`, inline: true },
                {name: 'Modérateur', value: `${member.kickable ? '❌' : '✅' }`, inline: true },
                {name: 'créé le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                {name: 'rejoint le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
                {name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ')}`},
            )

            
            

        interaction.reply({ embeds: [embed]});
    }
    
};