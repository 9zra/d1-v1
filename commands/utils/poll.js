const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'poll',
    description: 'sondage',
    async run(client, message, args) {
        if (!args[0]) return message.reply('entrer du contenu pour le sondage');

        const embed = new MessageEmbed()
        .setTitle('Sondage')
        .setColor('#0509C6')
        .setDescription(args.slice(0).join(' '))
        .setTimestamp()
        .setFooter({ text: `Nouveau sondage de ${message.author.tag}`});
        

        const poll = await message.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅');
        poll.react('❌');
        
    },
    options: [
        {
           name: "title",
           description:"donner le titre du sondage",
           type: "STRING",
           required: true,
        },
        {
            name: "content",
            description:"donner la question de votre sondage",
            type: "STRING",
            required: true,
        },
    ],
    
    async runSlash(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
        .setTitle(pollTitle)
        .setColor('#0509C6')
        .setDescription(pollContent)
        .setTimestamp()
        .setFooter({ text: `Nouveau sondage de ${interaction.user.tag}`});
        

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅');
        poll.react('❌');

        
    }
    
};