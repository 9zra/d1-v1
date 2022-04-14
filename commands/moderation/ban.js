module.exports = {
    name: "ban",
    category: "moderation",
    permissions: ["BAN_MEMBERS"],
    ownerOnly: false,
    usage: "ban [@member] [reason]",
    examples: ["ban @user raison"],
    description: "ban un utilisateur avec une raison",
    async run(client, message, args) {
        if (!args[0]) return message.reply('mentionner le membre a ban!');
        
        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');
  
        if (!target.bannable) return message.reply('vous navez pas les permission ');
  
        target.ban({ reason });
        message.channel.send(`${target} a été ban !`)
    },
    options: [
      {
        name: "target",
        description: "L'utilisateur a ban",
        type: "USER",
        required: true,
      },
      {
        name: "reason",
        description: "La raison du ban",
        type: "STRING",
        required: false,
      },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');
  
        
        if(!target.bannable) return interaction.reply('');
  
        target.ban({ reason });
        interaction.reply(`${target} a été ban !`)
     
    },
  };