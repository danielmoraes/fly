import express from 'express'
import moment from 'moment'

const yup = require('yup')

import { Azul, Gol, Latam } from './api'
import { AzulParser, GolParser, LatamParser } from './parsers'

const app = express()
const port = 3000

app.get('/azul', async (req, res) => {
  const schema = yup.object().shape({
    origin: yup.string().required(),
    destination: yup.string().required(),
    date: yup.date().default(() => moment().add(15, 'd'))
  })

  try {
    const data  = await schema.cast(req.query)
    const response = await Azul.search(data.origin, data.destination, data.date)
    const bestPrice = AzulParser.findBestPrice(response)
    res.send({ bestPrice })
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
})

app.get('/gol', async (req, res) => {
  const schema = yup.object().shape({
    origin: yup.string().required(),
    destination: yup.string().required(),
    date: yup.date().default(() => moment().add(15, 'd'))
  })

  try {
    const data  = await schema.cast(req.query)
    const response = await Gol.search(data.origin, data.destination, data.date)
    const bestPrice = GolParser.findBestPrice(response)
    res.send({ bestPrice })
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
})

app.get('/latam', async (req, res) => {
  const schema = yup.object().shape({
    origin: yup.string().required(),
    destination: yup.string().required(),
    date: yup.date().default(() => moment().add(15, 'd'))
  })

  try {
    const data  = await schema.cast(req.query)
    const response = await Latam.search(data.origin, data.destination, data.date)
    const bestPrice = LatamParser.findBestPrice(response)
    res.send({ bestPrice })
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
