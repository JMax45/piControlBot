module.exports = {
    name: 'restart',
    execute(ctx){
        require('child_process').exec('sudo /sbin/shutdown now -r', function (msg) { ctx.reply(msg) });
    }
}