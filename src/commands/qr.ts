var QRCode = require('qrcode');

module.exports = {
    name: 'qr',
    execute(ctx){
        QRCode.toDataURL(ctx.state.command.args, function (err, url) {
            ctx.replyWithPhoto( {source: Buffer.from(url.replace('data:image/png;base64,', ''), 'base64')} );
        })
    }
}