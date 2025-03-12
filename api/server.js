import dotenv from 'dotenv'
import express from 'express'
import stripe from 'stripe'
import {db} from './connect.js'
import cors from 'cors'

dotenv.config({path: '../.env'})

const stripeKey = stripe(process.env.STRIPE_KEY_TEST)

const app = express()
app.use(cors())
app.use(express.static('public'))
const port = process.env.PORT;

app.get("/", (req, res)=>{
    res.sendfile('index.html')
})
app.get("/products", async (req, res)=>{
    res.send(await db.collection('products').find({}).toArray())
})
app.get("/success", (req, res)=>{
    res.send("Compra realizada com sucesso")
})
app.get("/cancel", (req, res)=>{
    res.send("Solicitação cancelada")
})

app.post('/create-checkout-session/:priceid', async (req, res) => {
    const session = await stripeKey.checkout.sessions.create({
      line_items: [
        {
          price: req.params.priceid,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: '/success',
      cancel_url: '/cancel',
    });
  
    res.redirect(303, session.url);
  });

app.listen(port, ()=>{
    console.log(`Conectado na porta ${port}`);
})