import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import Byteroo from 'byteroo';
import fs from 'fs';
import path from 'path';

class defaultResponses {
  constructor(telegraf: Telegraf<TelegrafContext>) {
    telegraf.on('new_chat_members', (ctx) => {
      if (!ctx.botInfo) return;
      if (ctx.botInfo.id === (ctx.update.message as any).new_chat_member.id) {
        ctx.reply('Thanks for adding me to this group');
      }
    });
  }
}

// Define responses here
class myResponses {
  constructor(telegraf: Telegraf<TelegrafContext>, storage: Byteroo) {
    // Default responses, comment out if not needed
    new defaultResponses(telegraf);

    const admins = storage.getContainerSync('admins');

    // Dynamic commands
    const files = fs
      .readdirSync(path.join(__dirname, 'commands'))
      .filter((file) => file.endsWith('.js'));
    const commands = [];
    for (let i = 0; i < files.length; i++) {
      const command = require(path.join(
        __dirname,
        'commands',
        files[i]
      )).default;
      telegraf.command(command.name, (ctx) => {
        // If access is not private then just execute, else check if the user is an admin
        if (command.access !== 'private')
          return command.execute(ctx, { admins, storage });

        if (ctx.from && ctx.from.id && admins.has(ctx.from.id.toString()))
          return command.execute(ctx, { admins, storage });
        ctx.reply('You must be an admin to execute this command');
      });
      if (command.public === true) {
        commands.push({
          command: command.name,
          description: command.description,
        });
      }
    }
    telegraf.telegram.setMyCommands(commands);
  }
}

class Responses {
  constructor(telegraf: Telegraf<TelegrafContext>, storage: Byteroo) {
    new myResponses(telegraf, storage);
    return telegraf;
  }
}

export default Responses;
