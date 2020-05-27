const { Telegraf } = require('telegraf');
const extra = require('telegraf/extra');
const markup = extra.markdown();
const commandParts = require('telegraf-command-parts');
const responses = require("./responses");
const speedTest = require('speedtest-net');
const getIP = require('external-ip')();
const { exec } = require("child_process");
const googleTTS = require('google-tts-api');
const QRCode = require("qrcode");
const fs = require('fs');
const si = require('systeminformation');
const ip = require("ip");
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const scenes = require("./src/scenes")

var Responses = new responses();
const stage = new Stage([scenes])

const bot = new Telegraf("1137560908:AAGFjqgqV8vsJC8fYeaM1zIuwacw_CAVdyQ");
bot.use(commandParts());
bot.use(session())
bot.use(stage.middleware())

let rawdata = fs.readFileSync('./data/bot.json');
let Bot = JSON.parse(rawdata);

bot.start((ctx) => { Responses.start(ctx, Bot, fs) })
bot.command('cpu', (ctx) => { Responses.getCpuTwo(ctx, si) })
bot.command('ip', (ctx) => { Responses.getIp(ctx, ip, getIP) })
bot.command('restart', (ctx) => { Responses.getRestart(ctx, Bot) })
bot.command('shutdown', (ctx) => { Responses.getShutdown(ctx, Bot) })
bot.command('speedtest', (ctx) => { Responses.getSpeedTest(ctx, speedTest) })
bot.command('upgrade', (ctx) => { Responses.getUpgrade(ctx) })
bot.command('logs', (ctx) => { ctx.reply("Command not avaible right now") })
bot.command('sms', (ctx) => { Responses.getSmsBomb(ctx, exec) })
bot.command('audio', (ctx) => { Responses.getAudio(ctx, googleTTS) })
bot.command("qr", (ctx) => { Responses.getQR(ctx, fs ,QRCode )})
bot.command("password", (ctx) => { ctx.scene.enter('super-wizard') });

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()