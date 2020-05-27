const WizardScene = require('telegraf/scenes/wizard')
const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const responses = require('../responses')
const passGenerator = require('generate-password');
const extra = require('telegraf/extra');
const markup = extra.markdown();

var Responses = new responses();
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

module.exports = superWizard;