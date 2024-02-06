const Telegraf = require('telegraf')
const { Extra, Markup, Stage, session } = Telegraf
const config = require('config')
const bot = new Telegraf(config.get('token'))
const axios = require('axios');
const { clientText } = require('./clientText.js');
const SceneGenerator = require('./Scenes')

const curScene = new SceneGenerator()
const testimonialScene = curScene.GenTestimonialScene()
const nameScene = curScene.GenNameScene()
const priceScene = curScene.GenPriceScene()


const stage = new Stage([testimonialScene])

bot.use(session())
bot.use(stage.middleware())

function showMainMenu(ctx) {
  ctx.reply('Открыто главное меню',
    Markup.keyboard([
      [{ text: "Кешбэк", request_contact: true, }, 'Меню'],
      ['Акции', 'Контакты'],
      ['Оставить отзыв']
    ]).resize().extra()
  );
}

function showContactOptions(ctx) {
  ctx.reply('Выберите контакт', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Instagram', url: 'https://www.instagram.com/myata_platinum_tashkent' }, { text: 'Telegram', url: 'https://t.me/myataplatinum_uz' }],
        [{ text: 'Youtube', url: 'https://www.youtube.com/@myata_uz' }, { text: 'Web Site', url: 'https://taplink.cc/platinummyata' }]
      ],
    },
  });
}

function showTestimonialsMenu(ctx) {
  ctx.reply('Благодарим за ваш выбор! Пожалуйста, оцените качество сервиса и продукта от 1 до 5.',
    Markup.keyboard([
      ["🤩 Все чудесно, спасибо, 5⭐️⭐️⭐️⭐️⭐️"],
      ["😏 Все хорошо, но на 4⭐️⭐️⭐️⭐️"],
      ["😐 Удовлетворительно, на 3⭐️⭐️⭐️"],
      ["😒 Не понравилось, на 2⭐️⭐️"],
      ["😡 Оставить жалобу, 1⭐️"],
      ['↩️ Назад']
    ]).resize().extra()
  );
}

bot.start(async (ctx) => { showMainMenu(ctx); })

async function getToken() {
  const url = "https://api-ru.iiko.services/api/1/access_token";
  const body = { apiLogin: "74913501-9de" };
  const headers = { Timeout: "60" };
  let token = await axios.post(url, body, { headers });
  return token
}

bot.on("contact", async (ctx) => {
  const url = "https://api-ru.iiko.services/api/1/loyalty/iiko/customer/info";
  const body = { phone: `${ctx.message.contact.phone_number}`, type: "phone", organizationId: "bbb98635-9a82-47d6-ac11-70e949865385", };
  const headers = { "Authorization": "", "Timeout": "60", "Content-Type": "application/json", };
  const token = await getToken()
  headers.Authorization = `Bearer ${token?.data?.token}`;
  try {
    let result = await axios.post(url, body, { headers });
    await ctx.reply(`Номер карты: ${result?.data?.phone}\nБаланс на счету: ${result?.data?.walletBalances[0]?.balance ? result?.data?.walletBalances[0]?.balance : '0'}`)
  } catch { ctx.reply(`Номер счета не найден в системе`) }
});

bot.hears('1', async (ctx) => { let some = await getToken(); console.log(some.data.token) });

bot.hears('Кешбэк', (ctx) => { ctx.reply('Предоставить номер телефона:', Markup.keyboard([Markup.contactRequestButton('Отправить номер')]).resize().extra()); });

bot.hears('Меню', (ctx) => { ctx.reply('https://taplink.cc/platinummyata'); });

bot.hears('Акции', async (ctx) => { ctx.reply(`${clientText.actions}`) })

bot.hears(['Контакты'], (ctx) => { showContactOptions(ctx); });

bot.hears(['Оставить отзыв'], (ctx) => { ctx.scene.enter('testimonials'); showTestimonialsMenu(ctx); });

bot.hears('Главное меню', (ctx) => { showMainMenu(ctx); });

bot.hears('↩️ Назад', (ctx) => { showMainMenu(ctx); });

bot.launch()
