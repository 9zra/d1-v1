module.exports = {
    name: 'owner',
    description: 'd',
    run: (client, message, args) => {
        message.channel.send('$');
    },
    runSlash: (client, interaction) => {
        interaction.reply("$");
    }
};