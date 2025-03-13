import dotenv from 'dotenv'
import express from 'express'
import { db } from './connect.js'
import cors from 'cors'

dotenv.config({ path: '../.env' })

const app = express()
app.use(cors())

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World")
})
app.get("/products", async (req, res) => {
  res.send(await db.collection('products').find({}).toArray())
})

app.listen(port, () => {
  console.log(`Conectado na porta ${port}`);
})