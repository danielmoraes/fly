import express from 'express'
import moment from 'moment'

import { Azul } from './api'

const app = express()
const port = 3000

app.get('/azul', async (req, res) => {
  const response = await Azul.search('sao', 'aju', moment('2018-12-15'))
  res.send(response)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
