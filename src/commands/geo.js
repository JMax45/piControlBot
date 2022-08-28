const geoip = require('geoip-lite');
const { promisify } = require('util');

const getIP = promisify(require('external-ip')());

module.exports = {
  name: 'geo',
  description: 'Get location',
  public: true,
  async execute(ctx) {
    var ip = await getIP();
    var geo = geoip.lookup(ip);
    await ctx.reply(JSON.stringify(geo, null, 4));
    await ctx.replyWithLocation(geo.ll[0], geo.ll[1]);
  },
};
