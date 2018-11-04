import moment from 'moment'
import { findLowestFares } from '@sources'

import * as schema from './schema'

export const search = async (req, res) => {
  try {
    const { origin, destination, date }  = await schema.search.cast(req.query)
    const lowestFares = await findLowestFares(origin, destination, date)
    res.send(lowestFares)
  } catch (err) {
    console.error(err.stack)
    return res.sendStatus(400)
  }
}
