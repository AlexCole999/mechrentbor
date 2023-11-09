const Scene = require('telegraf/scenes/base')


class SceneGenerator {
    GenAgeScene() {
        const age = new Scene('age')
        age.enter(async (ctx) => {
            await ctx.reply('Привет! Ты вошел в сцену возраста. Укажи его')
        })
        age.on('text', async (ctx) => {
            const currAge = Number(ctx.message.text)
            if (currAge && currAge > 0) {
                await ctx.reply('Спасибо за возраст!!')
                ctx.scene.enter('name')
                ctx.session.state = { age: currAge }
                console.log(ctx.session)
            } else {
                await ctx.reply('Меня не проведешь! Напиши пожалуйста возраст цифрами и больше нуля')
                ctx.scene.reenter()
            }
        })
        age.on('message', (ctx) => ctx.reply('Давай лучше возраст'))
        return age
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
            await ctx.reply('Привет! Ты вошел в сцену цены. ЦЕНУ СУКА!')
        })
        price.on('text', async (ctx) => {
            const price = Number(ctx.message.text)
            if (price && price > 0) {
                await ctx.reply('уранахой!!')
                ctx.session.state = { ...ctx.session.state, price: price }
                console.log(ctx.session)
                await ctx.scene.leave()
            } else {
                await ctx.reply('ценудалнахуй')
                ctx.scene.reenter()
            }
        })
        price.on('message', (ctx) => ctx.reply('Давай лучше возраст'))
        return price
    }

}

module.exports = SceneGenerator