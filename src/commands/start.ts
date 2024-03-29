import command from '../types/command';

const welcomeMessage = `
Hi there!. I can send you info about your Raspberry Pi and I also offer some useful commands. 
If this is your first time using the bot, please type /admin so I will register you as an administrator.
`;

const start: command = {
  name: 'start',
  execute(ctx) {
    ctx.reply(welcomeMessage);
  },
};

export default start;
