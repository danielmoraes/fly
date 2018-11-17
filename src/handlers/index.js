import moment from 'moment'
import { findLowestFares } from '@sources'

import * as schema from './schema'

const parseQuery = async (data, schema) => {
  const valid = await schema.isValid(data)

  if (!valid) {
    throw Error('Invalid query data')
  }

  return schema.cast(data)
}

export const search = async (req, res) => {
  try {
    const { origin, destination, date } =
      await parseQuery(req.query, schema.search)
    const lowestFares = await findLowestFares(origin, destination, date)
    res.send(lowestFares)
  } catch (err) {
    console.error(err.stack)
    return res.sendStatus(400)
  }
}
