const getIP = require('external-ip')();
const ipLocal = require("ip");
const os = require('os');

module.exports = {
    name: 'ip',
    execute(ctx){
        getIP((err, ip) => {
            if (err) {
                throw err;
            }
            ctx.replyWithMarkdown(`Local IP: ${ipLocal.address()}\nPublic IP: ${ip}\n\`ssh ${os.userInfo().username}@${ip}\``);
        });
    }
}