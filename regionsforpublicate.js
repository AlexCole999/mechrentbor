const regionsforpublicate = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Город ташкент', callback_data: 'Tashkent-p' }],
      [{ text: 'Ташкентская область', callback_data: 'TashkentDistrikt-p' }, { text: 'Андижан', callback_data: 'Andijon-p' }],
      [{ text: 'Бухара', callback_data: 'Bukhara-p' }, { text: 'Джизак', callback_data: 'Jizzakh-p' }],
      [{ text: 'Фергана', callback_data: 'Fergana-p' }, { text: 'Кашкадарья', callback_data: 'Kashkadarya-p' }],
      [{ text: 'Навои', callback_data: 'Navoi-p' }, { text: 'Наманган', callback_data: 'Namangan-p' }],
      [{ text: 'Самарканд', callback_data: 'Samarkand-p' }, { text: 'Сырдарья', callback_data: 'Syrdarya-p' }],
      [{ text: 'Сурхандарья', callback_data: 'Surkhandarya-p' }, { text: 'Фергана', callback_data: 'Fergana-p' }],
      [{ text: 'Хорезм', callback_data: 'Khorezm-p' }, { text: 'Каракалпакстан', callback_data: 'Karakalpakstan-p' }],
      [{ text: 'В меню', callback_data: 'ToMenu' }]
      ,
    ]
  })
}

module.exports.regionsforpublicate = regionsforpublicate;