const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios');
const token = "6593497942:AAEXvOthtull92Zzq2-Iurpjlojxf4vPsdQ"
const bot = new TelegramBot(token, { polling: true })
const userinfo = require('./userinfo.js')
const startactions = require('./startactions.js')
const regionsforfind = require('./regionsforfind.js')
const regionsforpublicate = require('./regionsforpublicate.js')

bot.setMyCommands([
  {
    command: '/start', description: 'Запустить бота'
  },
  {
    command: '/info', description: 'Информация о пользователе'
  }
]
)

bot.on('message', msg => {

  console.table(msg)
  if (msg.text == '/info') {
    bot.sendMessage(msg.chat.id, userinfo.userinfo(msg))
  }

  if (msg.text == '/start') {
    bot.sendMessage(msg.chat.id, "Выберите интересующее действие", startactions.startactions)
  }

  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data == "Find") {
      return bot.sendMessage(chatId, 'Выберите регион', regionsforfind.regionsforfind)
    }
    if (data == "Publicate") {
      return bot.sendMessage(chatId, 'Выберите регион публикации', regionsforpublicate.regionsforpublicate)
    }
    if (data == "ToMenu") {
      return bot.sendMessage(chatId, "Выберите интересующее действие", startactions.startactions)
    }
    bot.sendMessage(chatId, data)
  })

})

// bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')
// axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
//   .then(json => bot.sendMessage(msg.chat.id, json.data.title))

// axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
//   .then(json => bot.sendMessage(msg.chat.id, json.data.title))

// bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')