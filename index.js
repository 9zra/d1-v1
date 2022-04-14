const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 515 });
const mongoose = require('mongoose');
const Logger = require('./utils/Logger');

client.commands = new Collection();






['CommandUtil', 'EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});

process.on('exit', code => { Logger.client(`Le processus s'est arreter avec le code: ${code}`)});
process.on('uncaughtException', (err, origin) => { Logger.error(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`)});
process.on('unhandledRejection', (reason, promise) => { Logger.warn();(`UNHANDLED_REJECTIO: ${reason}\n-----\n , promise`)});
process.on('warning', (...args) => Logger.warn(...args));

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false, 
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
}).then(() => { Logger.client('- base de données conecté') })
.catch(err => { Logger.error(err) });

client.login(process.env.TOKEN);