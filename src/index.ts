const Bot = require('./src/Bot');
const bot = new Bot();

process.title = 'picontrolbot';

bot.telegraf.launch();