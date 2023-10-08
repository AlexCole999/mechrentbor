const TelegramBot = require('node-telegram-bot-api')
const token = "6593497942:AAEXvOthtull92Zzq2-Iurpjlojxf4vPsdQ"
const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
  console.log(msg)
})