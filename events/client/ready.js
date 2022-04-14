const Logger = require('../../utils/Logger')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client('- connect');

        const devGuild = await client.guilds.cache.get('860622260292550656');
        client.user.setActivity("n!help")
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },

};