const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 515 });
const mongoose = require('mongoose')

client.commands = new Collection();


['CommandUtil', 'EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});

process.on('exit', code => { console.log(`Le processus s'est arreter avec le code: ${code}`)});
process.on('uncaughtException', (err, origin) => { console.log(`UNCAUGHT_EXCEPTION: ${errr}`, `Origine: ${origin}`)});
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDLED_REJECTIO: ${reason}\n-----\n , promise`)});
process.on('warning', (...args) => console.log(...args));

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false, 
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
}).then(() => { console.log('Le client est connecté à la base de données ! ') })
.catch(err => { console.log(err) })

client.login(process.env.TOKEN);