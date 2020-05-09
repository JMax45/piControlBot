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
var QRCode = require("qrcode")
const fs = require('fs');
let rawdata = fs.readFileSync('bot.json');
let Bot = JSON.parse(rawdata);

bot.start((ctx) => {
    if(Bot.adminId==ctx.from.id){
        ctx.reply("Hello Admin");
    }
    else if(Bot.adminId=="undefined"){
        Bot.adminId = ctx.from.id;
        let data = JSON.stringify(Bot);
        fs.writeFileSync('bot.json', data);
        ctx.reply("Admin id registered");
    }
    else{
        ctx.reply("Admin already registered");
    }
})

bot.command('cpu', (ctx) => { Responses.getCpuTwo(ctx, si) })
bot.command('ip', (ctx) => { Responses.getIp(ctx, ip, publicIp) })
bot.command('restart', (ctx) => { Responses.getRestart(ctx, Bot) })
bot.command('shutdown', (ctx) => { Responses.getShutdown(ctx, Bot) })
bot.command('speedtest', (ctx) => { Responses.getSpeedTest(ctx, speedTest, options) })
bot.command('upgrade', (ctx) => { Responses.getUpgrade(ctx) })
bot.command('sms', (ctx) => { Responses.getSmsBomb(ctx, exec) })
bot.command('audio', (ctx) => { Responses.getAudio(ctx, googleTTS) })
bot.command("qr", (ctx) => { Responses.getQR(ctx, fs ,QRCode )})

bot.on('text', ctx => { 
    if(ctx.state.command==undefined){
        ctx.reply("Unknown text");
    }
    else if(ctx.state.command.command=="logs"){
        ctx.reply("Command not available right now");
        console.log(ctx.from);
    }
    else{
        ctx.reply("Unknown command");
    }    
});

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()