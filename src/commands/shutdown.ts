module.exports = {
    name: 'shutdown',
    description: 'Shutdown the system',
    public: true,
    access: 'private',
    execute(ctx){
        require('child_process').exec('sudo /sbin/shutdown now', function (msg) { ctx.reply(msg) });
    }
}