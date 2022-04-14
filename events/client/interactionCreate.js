
module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande n\'existe pas!');

            if (cmd.ownerOnly) {
                if (interaction.user.id != ownerId) return message.reply('Commande reserver aux owners');
            }

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply(`Vous n'avez pas les permissions requises pour executer cette commande !`);

            cmd.runInteraction(client, interaction);
        }
    },

};