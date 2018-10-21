import express from 'express'

import * as handlers from './handlers'

const app = express()
const port = 3000

app.get('/search', handlers.search)

app.listen(port, () => console.log(`Listening on port ${port}`))
