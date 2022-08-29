import command from '../types/command';

const admin: command = {
  name: 'admin',
  execute(ctx, params) {
    const { admins } = params;
    if (!ctx.from) return;

    if (admins.has(ctx.from.id.toString()))
      return ctx.reply('An administrator is already registered.');

    admins.set(ctx.from.id.toString(), true);
    ctx.reply('You have been registered as an administrator.');
  },
};

export default admin;
