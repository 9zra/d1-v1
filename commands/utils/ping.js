const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'ping',
    description: 'ping',
    async run(client, message, args) {
        const tryPong = await message.channel.send("On esseye de pong... un instant!");

        const embed = new MessageEmbed()
            .setTitle('Pong :ping_pong:')
            .setColor('#000001')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Lantence BOT', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true}
            )
            .setTimestamp()
            .setFooter({
                text: message.author.username,
                iconURL: message.author.displayAvatarURL(),
            });


        tryPong.edit({content: ` `,embeds: [embed] });
    },
    async runInteraction(client, interaction) {
        const tryPong = await interaction.reply({content: "On esseye de pong... un instant!", fetchReply: true});

        const embed = new MessageEmbed()
            .setTitle('Pong :ping_pong:')
            .setColor('#000001')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Lantence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true}
            )
            .setTimestamp()
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });


        
        interaction.editReply({ content: ` `,embeds: [embed] });
    }
    
};