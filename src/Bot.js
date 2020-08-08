class Bot{
	constructor(){
		// Dotenv
		require('dotenv').config();

		// Telegraf
		this.Telegraf = require('telegraf');
		this.telegraf = new this.Telegraf(process.env.TOKEN);

		// Command parts
		this.commandParts = require('telegraf-command-parts');
		this.telegraf.use(this.commandParts());

		// JMongo
		const JMongo = require('jmongo');
		const jmongo = new JMongo(process.env.JMONGO_URL, process.env.JMONGO_NAME);

		// Responses
		this.Responses = require('./Responses');
		this.telegraf = new this.Responses(this.telegraf, jmongo);
	}
}

module.exports = Bot;