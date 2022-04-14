const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const prefix = "n!";
const color = "#000001"

const contextDescription = {
    userinfo: 'Renvoie des informations sur l\'utilistaeur'
}



module.exports = {
    name: 'help',
    category: 'utils',
    ownerOnly: false,
    usage: 'help',
    examples: ['help'],
    permissions: ['SEND_MESSAGES'],
    description: 'Renvoie la liste des commandes par catégorie',
    async run(client, message, args) { 
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
                .setColor(`${color}`)
                .addField('liste des commandes', `liste de toutes les catégories disponible et leur commande. \nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLocaleLowerCase()). map(cmd => cmd.name).join(', ')}\``
                );
            }

            return message.channel.send({ embeds : [noArgsEmbed] });
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply('cette commande n\'existe pas !')

        return message.channel.send(`
\`\`\`makefile
[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? 'owner' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(', ')}
Utilistaion: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.exemples.join(` | ${prefix}`)} 

---


${prefix} = prefix utiliser pour le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = options(s) optionel(s)
Ne pas inclure ces caractéres -> {}, [], et <> dans vos commandes.
\`\`\``);
    },
    options: [
        {
           name: "command",
           description:"taper le nom de la commande",
           type: "STRING",
           required: false,
        },
    ],
    
    async runInteraction(client, interaction) {
        const cmdName = interaction.options.getString('command');

        if (!cmdName) {
            const noArgsEmbed = new MessageEmbed()
                .setColor('#000001')
                .addField('liste des commandes', `liste de toutes les catégories disponible et leur commande. \nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLocaleLowerCase()). map(cmd => cmd.name).join(', ')}\``
                );
            }

            return interaction.reply({ embeds : [noArgsEmbed], ephemeral: false });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({content: 'cette commande n\'existe pas!'});

        return interaction.reply({ content: `
\`\`\`makefile
[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? 'owner' : ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(', ')}
Utilistaion: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.exemples.join(` | ${prefix}`)} 

---


${prefix} = prefix utiliser pour le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = options(s) optionel(s)
Ne pas inclure ces caractéres -> {}, [], et <> dans vos commandes.
\`\`\``, ephemeral: false });
        }
    
};