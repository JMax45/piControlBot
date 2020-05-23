const { Telegraf } = require('telegraf');
const extra = require('telegraf/extra');
const markup = extra.markdown();
const commandParts = require('telegraf-command-parts');
const responses = require("./responses");
const speedTest = require('speedtest-net');
const publicIp = require('public-ip');
const { exec } = require("child_process");
const googleTTS = require('google-tts-api');
const QRCode = require("qrcode");
const fs = require('fs');
const si = require('systeminformation');
const ip = require("ip");
const passGenerator = require('generate-password');
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const bot = new Telegraf("1137560908:AAGFjqgqV8vsJC8fYeaM1zIuwacw_CAVdyQ");
bot.use(commandParts());

var Responses = new responses();

let rawdata = fs.readFileSync('./data/bot.json');
let Bot = JSON.parse(rawdata);

const stepHandler = new Composer()
stepHandler.action('yesNumbers', (ctx) => {
  ctx.wizard.state.data.numbers = true;
  ctx.reply("/next")
  return ctx.wizard.next()
})
stepHandler.action('noNumbers', (ctx) => {
    ctx.wizard.state.data.numbers = false;
    ctx.reply("/next")
    return ctx.wizard.next()
})
stepHandler.action('yesSymbols', (ctx) => {
    ctx.wizard.state.data.symbols = true;
    ctx.reply("/next")
    return ctx.wizard.next()
  })
stepHandler.action('noSymbols', (ctx) => {
    ctx.wizard.state.data.symbols = false;
    ctx.reply("/next")
    return ctx.wizard.next()
})
stepHandler.action('upperCase', (ctx) => {
    ctx.wizard.state.data.upperCase = true;
    ctx.wizard.state.data.lowerCase = false;
    ctx.reply("/next")
    return ctx.wizard.next()
})
stepHandler.action('lowerCase', (ctx) => {
    ctx.wizard.state.data.upperCase = false;
    ctx.wizard.state.data.lowerCase = true;
    ctx.reply("/next")
    return ctx.wizard.next()
})
stepHandler.action('upperLowerCase', (ctx) => {
    ctx.wizard.state.data.upperCase = true;
    ctx.wizard.state.data.lowerCase = true;
    ctx.reply("/next")
    return ctx.wizard.next()
})

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.replyWithMarkdown("*Benvenuto nel generatore di password*");
    ctx.reply("Quanti caratteri deve contenere la password?");
    ctx.wizard.state.data = {};
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.wizard.state.data.characters = ctx.message.text;
    ctx.replyWithMarkdown('*Vuoi che la password contenga dei numeri?*', Markup.inlineKeyboard([
        Markup.callbackButton('Si', 'yesNumbers'),
        Markup.callbackButton('No', 'noNumbers')
      ]).extra())
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.replyWithMarkdown('*Vuoi che la password contenga dei simboli?*', Markup.inlineKeyboard([
        Markup.callbackButton('Si', 'yesSymbols'),
        Markup.callbackButton('No', 'noSymbols')
      ]).extra())
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.replyWithMarkdown('*Vuoi che la password contenga lettere maiuscole e minuscole?*', Markup.inlineKeyboard([
        Markup.callbackButton('Maiuscole', 'upperCase'),
        Markup.callbackButton('Minuscole', 'lowerCase'),
        Markup.callbackButton('Entrambe', 'upperLowerCase')
      ]).extra())
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.replyWithMarkdown(`Ecco le caratteristiche della password che verrà generata:\n*caratteri*: ${ctx.wizard.state.data.characters}\n*numeri*: ${ctx.wizard.state.data.numbers}\n*simboli*: ${ctx.wizard.state.data.symbols}\n*maiuscole*: ${ctx.wizard.state.data.upperCase}\n*minuscole*: ${ctx.wizard.state.data.lowerCase}`)
    Responses.getPassword(ctx, passGenerator, markup, ctx.wizard.state.data);
    return ctx.scene.leave()
  }
)

bot.start((ctx) => { Responses.start(ctx, Bot, fs) })
bot.command('cpu', (ctx) => { Responses.getCpuTwo(ctx, si) })
bot.command('ip', (ctx) => { Responses.getIp(ctx, ip, publicIp) })
bot.command('restart', (ctx) => { Responses.getRestart(ctx, Bot) })
bot.command('shutdown', (ctx) => { Responses.getShutdown(ctx, Bot) })
bot.command('speedtest', (ctx) => { Responses.getSpeedTest(ctx, speedTest) })
bot.command('upgrade', (ctx) => { Responses.getUpgrade(ctx) })
bot.command('logs', (ctx) => { ctx.reply("Command not avaible right now") })
bot.command('sms', (ctx) => { Responses.getSmsBomb(ctx, exec) })
bot.command('audio', (ctx) => { Responses.getAudio(ctx, googleTTS) })
bot.command("qr", (ctx) => { Responses.getQR(ctx, fs ,QRCode )})
const stage = new Stage([superWizard])
bot.use(session())
bot.use(stage.middleware())
bot.command("password", (ctx) => { ctx.scene.enter('super-wizard') });

bot.on('text', ctx => { Responses.text(ctx, passGenerator) });

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()