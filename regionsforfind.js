const regionsforfind = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Город ташкент', callback_data: 'Tashkent' }],
      [{ text: 'Ташкентская область', callback_data: 'TashkentDistrikt' }, { text: 'Андижан', callback_data: 'Andijon' }],
      [{ text: 'Бухара', callback_data: 'Bukhara' }, { text: 'Джизак', callback_data: 'Jizzakh' }],
      [{ text: 'Фергана', callback_data: 'Fergana' }, { text: 'Кашкадарья', callback_data: 'Kashkadarya' }],
      [{ text: 'Навои', callback_data: 'Navoi' }, { text: 'Наманган', callback_data: 'Namangan' }],
      [{ text: 'Самарканд', callback_data: 'Samarkand' }, { text: 'Сырдарья', callback_data: 'Syrdarya' }],
      [{ text: 'Сурхандарья', callback_data: 'Surkhandarya' }, { text: 'Фергана', callback_data: 'Fergana' }],
      [{ text: 'Хорезм', callback_data: 'Khorezm' }, { text: 'Каракалпакстан', callback_data: 'Karakalpakstan' }],
      [{ text: 'В меню', callback_data: 'ToMenu' }]
      ,
    ]
  })
}

module.exports.regionsforfind = regionsforfind;