const si = require('systeminformation');

module.exports = {
    name: 'cpu',
    execute(ctx){
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
    }
}