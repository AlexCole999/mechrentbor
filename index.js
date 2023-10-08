const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios');
const token = "6593497942:AAEXvOthtull92Zzq2-Iurpjlojxf4vPsdQ"
const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
  console.table(msg)
  if (msg.text = '/start') {
    // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    //   .then(json => bot.sendMessage(msg.chat.id, json.data.title))
    bot.sendMessage(msg.chat.id,
      `Hello
      \nID:${msg.message_id}
      \nLanguage: ${msg.from.language_code}
      \nFirst name: ${msg.from.first_name}
      \nLast name: ${msg.from.last_name}
      \nUser name: ${msg.from.username}
      \nDate: ${msg.date}
      `
    )
    bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')
  }


  // await bot.sendMessage(msg.chat.id, result)
})