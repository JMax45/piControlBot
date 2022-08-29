import command from '../types/command';
import { exec } from 'child_process';

const shutdown: command = {
  name: 'shutdown',
  description: 'Shutdown the system',
  public: true,
  access: 'private',
  async execute(ctx) {
    await ctx.reply('Sending shutdown command');
    exec('sudo /sbin/shutdown now');
  },
};

export default shutdown;
