module.exports = {
  name: "kick",
  category: "moderation",
  permissions: ["KICK_MEMBERS"],
  ownerOnly: false,
  usage: "kick [@member] [reason]",
  examples: ["kick @user raison"],
  description: "Kick un utilisateur avec une raison",
  async run(client, message, args) {
      if (!args[0]) return message.reply("mentionner le membre a kick !");
      
      
      const target = message.mentions.members.find(m => m.id);
      const reason = args.slice(1).join(' ');

      if (!target.kickable) return message.reply('vous navez pas les permission ');

      target.kick(reason);
      message.channel.send(`${target} a été kick !`)
  },
  options: [
    {
      name: "target",
      description: "L'utilisateur a kick",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "La raison du kick",
      type: "STRING",
      required: false
    },
  ],
  async runInteraction(client, interaction) {
      const target = interaction.options.getMember('target');
      const reason = interaction.options.getString('reason');

      
      if(!target.kickable) return interaction.reply('');

      target.kick(reason);
      interaction.reply(`${target} a été kick !`)
   
  },
};