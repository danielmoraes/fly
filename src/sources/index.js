import { map } from 'lodash'

import * as azul from './azul'
import * as gol from './gol'
import * as latam from './latam'

const sources = { azul, gol, latam }

export const findLowestFares = async (origin, destination, date) => {
  const lowestFares = map(sources, async (source, sourceName) => {
    const lowestFare = await source.findLowestFare(origin, destination, date)
    return { source: sourceName, lowestFare }
  })
  return Promise.all(lowestFares)
}
