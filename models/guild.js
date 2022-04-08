const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': 'n!' },
    logChannel: { 'type': String, 'default': '953791490977595443' } 
});

module.exports = mongoose.model('Guild', guildSchema);