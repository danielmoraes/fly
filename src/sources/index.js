import { map } from 'lodash'

import Azul from './azul'
import Avianca from './avianca'
import Gol from './gol'
import Latam from './latam'

const sources = { Avianca, Azul, Gol, Latam }

export const findLowestFares = async (origin, destination, date) =>
  Promise.all(map(sources, async ({ Api, Parser }, sourceName) => {
    try {
      const response = await Api.search(origin, destination, date)
      const lowestFare = Parser.getLowestFare(response)
      return { sourceName, lowestFare }
    } catch (err) {
      return { sourceName, error: err.message }
    }
  }))
