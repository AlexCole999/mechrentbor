const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const config = require('config')
const bot = new Telegraf(config.get('token'))
const axios = require('axios');
const { clientText } = require('./clientText.js');

bot.use(session())

function showMainMenu(ctx) {
  ctx.reply(
    'Меню:',
    Markup.keyboard([
      [{ text: "Кешбэк", request_contact: true, }, , 'Меню'],
      ['Акции', 'Контакты'],
      ['Оставить отзыв']
    ]).resize().extra()
  );
}


bot.start(
  async (ctx) => {
    showMainMenu(ctx);

    bot.on("contact", async (ctx) => {

      console.log('phone is:', ctx.message.contact.phone_number);

      const url = "https://api-ru.iiko.services/api/1/loyalty/iiko/customer/info";
      const urlapi = "https://api-ru.iiko.services/api/1/access_token";
      const headersapi = { Timeout: "60" };

      const bodyapi = { apiLogin: "74913501-9de" };
      let headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcGlMb2dpbklkIjoiYjUwOThmYzMtMjFjMC00YTUwLWFhNjctMzY0NzI0MDAwNzgxIiwibmJmIjoxNzA2MzUyNjM5LCJleHAiOjE3MDYzNTYyMzksImlhdCI6MTcwNjM1MjYzOSwiaXNzIjoiaWlrbyIsImF1ZCI6ImNsaWVudHMifQ.9MpPtPtHlllnZcpRfwTp-e4G6FP28fTk4znQoyzr7w0",
        "Timeout": "60",
        "Content-Type": "application/json",
      };
      const body = {
        phone: `${ctx.message.contact.phone_number}`,
        type: "phone",
        organizationId: "bbb98635-9a82-47d6-ac11-70e949865385",
      };

      let apikey = await axios.post(urlapi, bodyapi, { headersapi })

      headers.Authorization = `Bearer ${apikey?.data?.token}`;
      try {
        let result = await axios.post(url, body, { headers });
        ctx.reply(`
      Номер карты: ${ctx?.message?.contact?.phone_number}\nБаланс на счету: ${result?.data?.walletBalances[0]?.balance ? result?.data?.walletBalances[0]?.balance : '0'}`)
      }
      catch { ctx.reply(`Номер счета не найден в системе`) }




    });
  })


bot.hears('11', async (ctx) => { ctx.reply('Hey there'); })
bot.hears('Акции', async (ctx) => { ctx.reply(`${clientText.actions}`) })
bot.hears('Кешбэк', (ctx) => {
  ctx.reply('Предоставить номер телефона:', Markup.keyboard([Markup.contactRequestButton('Отправить номер')]).resize().extra());
});

bot.launch()
