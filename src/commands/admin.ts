module.exports = {
  name: 'admin',
  execute(ctx, params) {
    const { admins } = params;
    if (admins.has(ctx.from.id))
      return ctx.reply('An administrator is already registered.');

    admins.set(ctx.from.id, true);
    ctx.reply('You have been registered as an administrator.');
  },
};
