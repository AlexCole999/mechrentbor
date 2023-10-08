const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios');
const token = "6593497942:AAEXvOthtull92Zzq2-Iurpjlojxf4vPsdQ"
const bot = new TelegramBot(token, { polling: true })
const startactions = require('./startactions.js')

bot.setMyCommands([
  {
    command: '/start', description: 'Запустить бота'
  },
  {
    command: '/info', description: 'Информация о пользователе'
  }
]
)

const regionsForFind = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Город ташкент', callback_data: 'Tashkent' }],
      [{ text: 'Ташкентская область', callback_data: 'Tashkent distrikt' }, { text: 'Андижан', callback_data: 'Andijon' }],
      [{ text: 'Бухара', callback_data: 'Bukhara' }, { text: 'Фергана', callback_data: 'Fergana' }],
      [{ text: 'город', callback_data: 'город' }, { text: 'город', callback_data: 'город' }],
      [{ text: 'В меню', callback_data: 'ToMenu' }]
      ,
    ]
  })
}

const regionsForPublicate = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Город ташкент', callback_data: 'Tashkent-p' }],
      [{ text: 'Ташкентская область', callback_data: 'TashkentDistrikt-p' }, { text: 'Андижан', callback_data: 'Andijon-p' }],
      [{ text: 'Бухара', callback_data: 'Bukhara-p' }, { text: 'Фергана', callback_data: 'Fergana-p' }],
      [{ text: 'город', callback_data: 'город-p' }, { text: 'город', callback_data: 'город-p' }],
      [{ text: 'В меню', callback_data: 'ToMenu' }]
      ,
    ]
  })
}

bot.on('message', msg => {

  console.table(msg.text)

  if (msg.text == '/info') {
    // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    //   .then(json => bot.sendMessage(msg.chat.id, json.data.title))
    bot.sendMessage(
      msg.chat.id,
      `Hello
      \nID:${msg.message_id}
      \nLanguage: ${msg.from.language_code}
      \nFirst name: ${msg.from.first_name}
      \nLast name: ${msg.from.last_name}
      \nUser name: ${msg.from.username}
      \nDate: ${msg.date}
      `
    )
    // bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')
  }

  if (msg.text == '/start') {
    // axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    //   .then(json => bot.sendMessage(msg.chat.id, json.data.title))

    bot.sendMessage(
      msg.chat.id,
      "Выберите интересующее действие",
      startactions.startactions
    )
    // bot.sendPhoto(msg.chat.id, 'https://example1.onlinestores.uz/wp-content/uploads/2023/10/icons8-small-60.png')
  }

  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    // console.log(data, chatId)

    if (data == "Find") {
      return bot.sendMessage(chatId, 'Выберите регион', regionsForFind)
    }
    if (data == "Publicate") {
      return bot.sendMessage(chatId, 'Выберите регион публикации', regionsForPublicate)
    }
    if (data == "ToMenu") {
      return bot.sendMessage(chatId, "Выберите интересующее действие", startactions.startactions)
    }
    bot.sendMessage(chatId, data)
  })

})