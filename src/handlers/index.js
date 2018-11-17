import moment from 'moment'
import { findLowestFares } from '@sources'
import { filter, get } from 'lodash'

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
    const sources = await findLowestFares(origin, destination, date)
    const validSources = filter(sources, s => s.lowestFare)
    const lowestFare = (validSources.length === 0)
      ? -1
      : validSources.reduce((a, v) => Math.min(v.lowestFare, a), Infinity)
    res.send({ lowestFare, sources })
  } catch (err) {
    console.error(err.stack)
    return res.sendStatus(400)
  }
}
