import command from '../types/command';
import si from 'systeminformation';

const cpu: command = {
  name: 'cpu',
  description: 'Get cpu information',
  public: true,
  async execute(ctx) {
    const cpu = await si.cpu();
    const temperature = await si.cpuTemperature();
    const message = `\`${cpu.manufacturer} ${cpu.brand}\`\n\nAverage temperature: ${temperature.main}°C\nMaximum temperature: ${temperature.max}°C`;
    ctx.replyWithMarkdown(message);
  },
};

export default cpu;
