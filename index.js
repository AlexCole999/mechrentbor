const Telegraf = require('telegraf')
const {
  Extra,
  Markup,
  Stage,
  session
} = Telegraf
const config = require('config')
const bot = new Telegraf(config.get('token'))
const SceneGenerator = require('./Scenes')
const curScene = new SceneGenerator()
const ageScene = curScene.GenAgeScene()
const nameScene = curScene.GenNameScene()
const priceScene = curScene.GenPriceScene()

bot.use(Telegraf.log())

const stage = new Stage([ageScene, nameScene, priceScene])

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('echo', (ctx) => ctx.reply('Echo'))
bot.command('scenes', async (ctx) => {
  ctx.scene.enter('age')
})
bot.command('state', async (ctx) => {
  console.log(ctx.session)
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()