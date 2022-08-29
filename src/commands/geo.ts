import command from '../types/command';
import geoip from 'geoip-lite';
import { promisify } from 'util';

const getIP = promisify(require('external-ip')());

const geo: command = {
  name: 'geo',
  description: 'Get location',
  public: true,
  async execute(ctx) {
    const ip = await getIP();
    const geo = geoip.lookup(ip);
    if (!geo) return await ctx.reply('Failed geoip lookup');
    await ctx.reply(JSON.stringify(geo, null, 4));
    await ctx.replyWithLocation(geo.ll[0], geo.ll[1]);
  },
};

export default geo;
