var googleTTS = require('google-tts-api');

module.exports = {
    name: 'audio',
    execute(ctx){
        googleTTS(ctx.state.command.args, 'it', 1)
            .then(function (url) {
                ctx.replyWithVoice({url: url, filename: 'piControlBot'});
            })
            .catch(function (err) {
                console.error(err.stack);
                ctx.reply('There was an error: ' + err.stack);
            });
    }
}