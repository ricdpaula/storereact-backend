import stripe from 'stripe'

const stripeKey = stripe('sk_test_51R1UOVGlZxAZZY3y930TYkXus9CVhm60QN3TUCGiQ9IMeim8mktLm7VDdHCSZBvAStyc0KaVDLG9LwfVKiVgV5Eg00vRBTFW07')

stripeKey.products.create({
    name: "Fire TV Stick HD | Com controle remoto por voz com Alexa",
    description: "Faça streaming em full HD - Curta streaming rápido em full HD. Controle tudo por voz com o controle remoto por voz com Alexa. Pressione e peça para Alexa - Use a sua voz para facilmente buscar e iniciar filmes e séries em diversos aplicativos."
}).then((product) => {
    stripeKey.prices.create({
        unit_amount: 0,
        currency: 'brl',
        product: product.id
    }).then((price) => {
        console.log('Success! Here is your starter subscription product id: ' + product.id);
        console.log('Success! Here is your starter subscription product id: ' + price.id);
    })
})