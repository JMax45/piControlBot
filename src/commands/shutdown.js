module.exports = {
    name: 'shutdown',
    execute(ctx){
        require('child_process').exec('sudo /sbin/shutdown now', function (msg) { ctx.reply(msg) });
    }
}