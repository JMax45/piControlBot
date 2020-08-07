class defaultResponses{
	constructor(telegraf){
		telegraf.on('new_chat_members', (ctx) => {
			if(ctx.botInfo.id===ctx.update.message.new_chat_member.id){
				ctx.reply('Thanks for adding me to this group');
			}	
		})

		return telegraf;
	}
}

// Define responses here
class myResponses{
	constructor(telegraf, jmongo){
		// Default responses, comment out if not needed
		telegraf = new defaultResponses(telegraf);

		// Basic answers stored in the database
		this.basicAnswers;
		jmongo.loadAll('responses', (result) => this.basicAnswers = result);

		telegraf.command('start', (ctx) => {
			const index = this.basicAnswers.map(e => e.keyword).indexOf('start');
			ctx.replyWithMarkdown(this.basicAnswers[index].text)
		});
		telegraf.command('admin', (ctx) => {
			jmongo.load('config', { type: 'config' }, (result) => {
				if(result.admin==undefined){
					jmongo.changeDocument('config', { type: 'config' }, { admin: ctx.from.id });
					ctx.reply('You have been registered as an administrator.');
				}
				else{
					ctx.reply('An administrator is already registered.');
				}
			})
		})

		return telegraf;
	}
}

class Responses{
	constructor(telegraf, jmongo){
		telegraf = new myResponses(telegraf, jmongo);
		
		return telegraf;
	}
}

module.exports = Responses;