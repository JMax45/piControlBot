import ipLocal from 'ip';
import os from 'os';
import command from '../types/command';
import getIP from '../helpers/getIP';

const ip: command = {
  name: 'ip',
  description: 'Get the ip of the system',
  public: true,
  async execute(ctx) {
    const ip = await getIP();
    ctx.replyWithMarkdown(
      `Local IP: \`${ipLocal.address()}\`\nPublic IP: \`${ip}\`\n\`ssh ${
        os.userInfo().username
      }@${ip}\``
    );
  },
};

export default ip;
