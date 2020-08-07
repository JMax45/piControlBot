class Bot{
	constructor(){
		// Configuration
		this.configuration = require('../config/config.json');

		// Telegraf
		this.Telegraf = require('telegraf');
		this.telegraf = new this.Telegraf(this.configuration.token);

		// JMongo
		const JMongo = require('jmongo');
		const jmongo = new JMongo(this.configuration.jmongo.url, this.configuration.jmongo.name);

		// Responses
		this.Responses = require('./Responses');
		this.telegraf = new this.Responses(this.telegraf, jmongo);
	}
}

module.exports = Bot;