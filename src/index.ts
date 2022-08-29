import 'dotenv/config';
import Bot from './Bot';

const bot = new Bot();

process.title = 'picontrolbot';

bot.telegraf.launch();
