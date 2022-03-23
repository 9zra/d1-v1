module.exports = {
    name: 'emit',
    description: 'emettre un evenement',
    run(client, message, args) {
        if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply('Merci d\'entrer un événement valide (\`guildMemberAdd\`/\`guildMemberRemove\`)');

        if (args[0] == 'guildMemberAdd') {
            client.emit('guildMemberAdd', message.member);
            message.reply('Event guildMemberAdd émit!');
        } else if (args[0] == 'guildCreate') {
            client.emit('guildCreate', message.guild);
            message.reply('Event guilCreate émit!');
        } else {
            client.emit('guildMemberRemove', message.member);
            message.reply('Event guildMemberRemove émit!');
        }
    },
    options: [
        {
            name: 'event',
            description: 'choisir un evenement',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                }
            ],
        }
    ],
    
    runSlash(client, interaction) {
        const evtChoices = interaction.options.getString('event');

        if (evtChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd émit!', ephemeral: true });
        } else if (evtChoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Event guildCreate émit!', ephemeral: true });
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove émit!', ephemeral: true });
        }
    },
    
};