import Byteroo from 'byteroo';
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import commandParts from './middlewares/commandParts';
import Responses from './Responses';

class Bot {
  telegraf: Telegraf<TelegrafContext>;
  constructor() {
    // Dotenv
    require('dotenv').config();

    try {
      const pmConfig = JSON.parse(process.env.PM_CONFIG!);
      const ProcessManager = require('jz-process-manager');
      const pm = new ProcessManager(
        pmConfig.server_url,
        pmConfig.application_id,
        pmConfig.auth_key,
        100
      );
    } catch (error) {
      console.log('Process manager skipped');
    }

    // Telegraf
    this.telegraf = new Telegraf(process.env.TOKEN!);

    // Command parts
    this.telegraf.use(commandParts);

    const storage = new Byteroo({
      name: 'piControlBot',
      autocommit: true,
    });

    // Responses
    new Responses(this.telegraf, storage);
  }
}

export default Bot;
