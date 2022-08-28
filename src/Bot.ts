const Byteroo = require('byteroo').default;

class Bot {
  constructor() {
    // Dotenv
    require('dotenv').config();

    try {
      const pmConfig = JSON.parse(process.env.PM_CONFIG);
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
    this.Telegraf = require('telegraf');
    this.telegraf = new this.Telegraf(process.env.TOKEN);

    // Command parts
    this.commandParts = require('telegraf-command-parts');
    this.telegraf.use(this.commandParts());

    const storage = new Byteroo({
      name: 'piControlBot',
      autocommit: true,
    });

    // Responses
    this.Responses = require('./Responses');
    this.telegraf = new this.Responses(this.telegraf, storage);
  }
}

module.exports = Bot;
