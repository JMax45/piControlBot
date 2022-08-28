class defaultResponses {
  constructor(telegraf) {
    telegraf.on('new_chat_members', (ctx) => {
      if (ctx.botInfo.id === ctx.update.message.new_chat_member.id) {
        ctx.reply('Thanks for adding me to this group');
      }
    });

    return telegraf;
  }
}

// Define responses here
class myResponses {
  constructor(telegraf, storage) {
    // Default responses, comment out if not needed
    telegraf = new defaultResponses(telegraf);

    const admins = storage.getContainerSync('admins');

    // Dynamic commands
    const fs = require('fs');
    const files = fs
      .readdirSync('./src/commands')
      .filter((file) => file.endsWith('.js'));

    const commands = [];
    for (let i = 0; i < files.length; i++) {
      const command = require('./commands/' + files[i]);
      telegraf.command(command.name, (ctx) => {
        // If access is not private then just execute, else check if the user is an admin
        if (command.access !== 'private')
          return command.execute(ctx, { admins, storage });

        if (admins.has(ctx.from.id))
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

    return telegraf;
  }
}

class Responses {
  constructor(telegraf, storage) {
    telegraf = new myResponses(telegraf, storage);

    return telegraf;
  }
}

module.exports = Responses;
