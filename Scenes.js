const Scene = require('telegraf/scenes/base')
const Telegraf = require('telegraf')
const { Markup } = Telegraf
const { clientText } = require('./clientText.js');
const nodemailer = require('nodemailer')

function showMainMenu(ctx) {
    ctx.reply('Открыто главное меню',
        Markup.keyboard([
            [{ text: "Кешбэк", request_contact: true, }, 'Меню'],
            ['Акции', 'Контакты'],
            ['Оставить отзыв']
        ]).resize().extra()
    );
}

function showTestimonialOptions(ctx) {
    ctx.reply('Благодарим вас за обратную связь.\nМы очень ценим, что у нас есть отзывчивые и благодарные гости, как вы.\nНе хотели бы вы оставить отзыв про нас в наших платформах?', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Yandex', url: 'https://yandex.uz/maps/org/240485800004/?ll=69.246831%2C41.298951&z=17' }],
                [{ text: '2gis', url: 'https://2gis.uz/tashkent/firm/70000001080995918' }],
                [{ text: 'Google', url: 'https://www.google.com/maps/place/Мята+Platinum+Seoul+Mun,+1%2F1+Улица+Баходира,+Tashkent+100000/data=!4m2!3m1!1s0x38ae8b63d2fd1653:0xb3ec36b2e22b0b2a?utm_source=mstt_1&entry=gps&lucs=47068615,,47075915&g_ep=CAESCjExLjEwMS4xMDIYACCIJyoSNDcwNjg2MTUsLDQ3MDc1OTE1QgJVWg%3D%3D' }],
                [{ text: 'Tripadvisor', url: 'https://www.tripadvisor.ru/Restaurant_Review-g293968-d26545722-Reviews-Myata_Platinum_Seoul_Mun-Tashkent_Tashkent_Province.html' }]
            ],
        },
    });
}

const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'myata.platinum.tashkent@gmail.com',
        pass: '560DE1217307AA88717ADD4C4823F6D13ACA'
    }
})

class SceneGenerator {

    GenTestimonialScene() {

        const testimonials = new Scene('testimonials')

        testimonials.enter(async (ctx) => {
            console.log('Testimonials enter')
        })

        testimonials.hears("🤩 Все чудесно, спасибо, 5⭐️⭐️⭐️⭐️⭐️", async (ctx) => {
            ctx.session.state = { ...ctx?.session?.state, rating: '5' };
            console.log('testimonials click 5');
            ctx.reply('Вы поставили оценку 5!\nПожалуйста, напишите нам, что вы думаете о нас!')
        })
        testimonials.hears("😏 Все хорошо, но на 4⭐️⭐️⭐️⭐️", async (ctx) => {
            ctx.session.state = { ...ctx?.session?.state, rating: '4' };
            console.log('testimonials click 4');
            ctx.reply('Вы поставили оценку 4!\nПожалуйста, напишите нам, что вы думаете о нас!')
        })
        testimonials.hears("😐 Удовлетворительно, на 3⭐️⭐️⭐️", async (ctx) => {
            ctx.session.state = { ...ctx?.session?.state, rating: '3' };
            console.log('testimonials click 3');
            ctx.reply('Вы поставили оценку 3!\nПожалуйста, напишите нам, что вы думаете о нас!')
        })
        testimonials.hears("😒 Не понравилось, на 2⭐️⭐️", async (ctx) => {
            ctx.session.state = { ...ctx?.session?.state, rating: '2' };
            console.log('testimonials click 2');
            ctx.reply('Вы поставили оценку 2!\nПожалуйста, напишите нам, что вы думаете о нас!')
        })
        testimonials.hears("😡 Оставить жалобу, 1⭐️", async (ctx) => {
            ctx.session.state = { ...ctx?.session?.state, rating: '1' };
            console.log('testimonials click 1');
            ctx.reply('Вы поставили оценку 1!\nПожалуйста, напишите нам, что вы думаете о нас!')
        })

        testimonials.on('text', async (ctx) => {

            const testimonial = ctx.message.text;
            console.log('entered testimonian text');

            if (testimonial !== "↩️ Назад") {

                if (!ctx?.session?.state?.rating) {

                    console.log('testimonial entered text before rating');
                    await ctx.reply('Вы не выбрали оценку. Пожалуйста, перед написанием отзыва выберите один из вариантов')
                    await ctx.scene.reenter()

                } else {

                    ctx.session.state = { ...ctx.session.state, testimonial: testimonial }

                    const resultResponseForUser = `Вы поставили оценку: ${ctx.session.state.rating}!\nТекст отзыва: ${ctx.session.state.testimonial}`
                    const resultResponseForOwner = `Вам поставили оценку: ${ctx.session.state.rating}!\nТекст отзыва: ${ctx.session.state.testimonial}`

                    console.log('testimonial text entered');

                    await transporter.sendMail({
                        from: 'myata.platinum.tashkent@gmail.com',
                        to: 'myatatashkent@yandex.ru',
                        subject: `Гость поставил оценку ${ctx.session.state.rating}`,
                        text: `${resultResponseForOwner}`
                    }).then(() => { ctx.reply(`${resultResponseForUser}\n\n Отзыв успешно отправлен!`); console.log('testimonial sended to clients mail') })

                    await showMainMenu(ctx)

                    if (ctx.session.state.rating > 3) { await ctx.replyWithHTML(clientText.TestimonialMsg) }

                    ctx.session.state = {}
                    await ctx.scene.leave()

                }

            } else {
                console.log('click testimonial назад');
                ctx.session.state = {}
                await ctx.scene.leave();
                await showMainMenu(ctx);
            }
        })

        return testimonials

    }

    GenNameScene() {
        const name = new Scene('name')
        name.enter((ctx) => ctx.reply('Теперь ты в сцене имени. Представься'))
        name.on('text', async (ctx) => {
            const name = ctx.message.text
            if (name) {
                await ctx.reply(`Привет, ${name}`)
                ctx.session.state = { ...ctx.session.state, name: name }
                console.log(ctx.session)
                ctx.scene.enter('price')
            } else {
                await ctx.reply('Я так и не понял, как тебя зовут')
                await ctx.scene.reenter()
            }
        })
        name.on('message', (ctx) => ctx.reply('Это явно не твое имя'))
        return name
    }

    GenPriceScene() {
        const price = new Scene('price')
        price.enter(async (ctx) => {
            await ctx.reply('Привет! Ты вошел в сцену цены!')
        })
        price.on('text', async (ctx) => {
            const price = Number(ctx.message.text)
            if (price && price > 0) {
                await ctx.reply('ура!!')
                ctx.session.state = { ...ctx.session.state, price: price }
                console.log(ctx.session)
                await ctx.scene.leave()
            } else {
                await ctx.reply('цену')
                ctx.scene.reenter()
            }
        })
        price.on('message', (ctx) => ctx.reply('Давай лучше возраст'))
        return price
    }

}

module.exports = SceneGenerator