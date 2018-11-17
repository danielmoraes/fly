import express from 'express'

import config from '@root/config'
import * as handlers from '@handlers'

const { port } = config

const app = express()

app.get('/search', handlers.search)

app.all('*', (req, res) => res.sendStatus(404))

app.use((err, req, res) => {
  console.error(err.stack)
  res.sendStatus(500)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
