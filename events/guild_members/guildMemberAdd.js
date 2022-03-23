const dayjs = require("dayjs");
const { MessageEmbed, Formatters } = require("discord.js");


module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {
        const creationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor("#21f852")
            .setDescription(`
            • Nom d'utilisateur: ${member} - \`${member.user.tag}\` (${member.id})
            • Créé le : ${creationTimestamp} (${relativeCreationTimestamp})
            • Rejoint le: ${joinTimestamp} (${relativeCreationTimestamp})
            `)
            .setTimestamp()
            .setFooter({ text: 'L\'utilisateur a quitté!' });


        const logChannel = client.channels.cache.get('953791490977595443');
        logChannel.send({ embeds: [embed] });
    },

};
