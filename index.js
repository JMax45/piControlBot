const { Telegraf } = require('telegraf')

const bot = new Telegraf("1137560908:AAGFjqgqV8vsJC8fYeaM1zIuwacw_CAVdyQ")

const si = require('systeminformation');
var ip = require("ip");
const publicIp = require('public-ip');
const speedTest = require('speedtest-net');
const { exec } = require("child_process");
const options = {
    acceptLicense: true,
    acceptGdpr: true
}
const commandParts = require('telegraf-command-parts');
bot.use(commandParts());
const responses = require("./responses");
var Responses = new responses();
var googleTTS = require('google-tts-api');

bot.start((ctx) => ctx.reply('Stai zitta puttana'))
bot.help((ctx) => ctx.reply('Lol vuoi aiuto crepa cojone'))

bot.command('cpu', (ctx) => { Responses.getCpuTwo(ctx, si) })
bot.command('ip', (ctx) => { Responses.getIp(ctx, ip, publicIp) })
bot.command('restart', (ctx) => { Responses.getRestart(ctx) })
bot.command('shutdown', (ctx) => { Responses.getShutdown(ctx) })
bot.command('speedtest', (ctx) => { Responses.getSpeedTest(ctx, speedTest, options) })
bot.command('upgrade', (ctx) => { Responses.getUpgrade(ctx) })
bot.command('sms', (ctx) => { Responses.getSmsBomb(ctx, exec) })
bot.command('audio', (ctx) => { Responses.getAudio(ctx, googleTTS) })

bot.on('text', ctx => { 
    if(ctx.state.command==undefined){
        ctx.reply("Unknown text");
    }
    else if(ctx.state.command.command=="logs"){
        ctx.reply("Command not available right now");
    }
    else{
        ctx.reply("Unknown command");
    }    
});

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()