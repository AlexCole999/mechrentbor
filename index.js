const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios');
const token = "6593497942:AAEXvOthtull92Zzq2-Iurpjlojxf4vPsdQ"
const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
  if (msg.text = '/start') {
    // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    //   .then(json => bot.sendMessage(msg.chat.id, json.data.title))
    bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')
  }


  // await bot.sendMessage(msg.chat.id, result)
})