const startactions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Фильтр по регионам', callback_data: 'Find' }, { text: 'Подать объявление', callback_data: 'Publicate' }]
      ,
    ]
  })
}

module.exports.startactions = startactions;