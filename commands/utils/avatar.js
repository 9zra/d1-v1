module.exports = {
    name: 'avatar',
    description: 'pp',
    run: (client, message, args) => {
        message.channel.send(message.author.displayAvatarURL() + "?size=2048");
    },
    runSlash: (client, interaction) => {
        interaction.reply(interaction.user.displayAvatarURL() + "?size=2048");
    }
};