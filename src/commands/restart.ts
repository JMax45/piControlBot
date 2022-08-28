module.exports = {
    name: 'restart',
    description: 'Restart the system',
    public: true,
    access: 'private',
    execute(ctx){
        require('child_process').exec('sudo /sbin/shutdown now -r', function (msg) { ctx.reply(msg) });
    }
}