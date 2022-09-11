import Byteroo from 'byteroo';
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import commandParts from './middlewares/commandParts';
import Responses from './Responses';

class Bot {
  telegraf: Telegraf<TelegrafContext>;
  constructor() {
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
