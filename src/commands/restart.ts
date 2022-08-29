import command from '../types/command';
import { exec } from 'child_process';

const restart: command = {
  name: 'restart',
  description: 'Restart the system',
  public: true,
  access: 'private',
  async execute(ctx) {
    await ctx.reply('Sending restart command');
    exec('sudo /sbin/shutdown now -r');
  },
};

export default restart;
