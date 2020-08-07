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

// Packages that are used by myResponses
const si = require('systeminformation');

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
		});
		telegraf.command('cpu', (ctx) => {
			si.cpu((data) => {
				const info = {};
				info.manufacturer = data.manufacturer;
				info.brand = data.brand;
				si.cpuTemperature((data) => {
					info.average = data.main;
					info.maximum = data.max;
					info.message = `\`${info.manufacturer} ${info.brand}\`\n\nAverage temperature: ${info.average}°C\nMaximum temperature: ${info.maximum}°C`;
					ctx.replyWithMarkdown(info.message);
				})
			})
		});
		telegraf.command('ip', (ctx) => {
			const getIP = require('external-ip')();
			const ipLocal = require("ip");
			const os = require('os');
			getIP((err, ip) => {
				if (err) {
					throw err;
				}
				ctx.replyWithMarkdown(`Local IP: ${ipLocal.address()}\nPublic IP: ${ip}\n\`ssh ${os.userInfo().username}@${ip}\``);
			});
		});

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