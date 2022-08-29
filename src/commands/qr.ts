import QRCode from 'qrcode';
import command from '../types/command';

const qr: command = {
  name: 'qr',
  execute(ctx) {
    QRCode.toDataURL((ctx as any).state.command.args, function (err, url) {
      ctx.replyWithPhoto({
        source: Buffer.from(
          url.replace('data:image/png;base64,', ''),
          'base64'
        ),
      });
    });
  },
};

export default qr;
