import { filter, get } from 'lodash'
import { map } from 'lodash'
import { parseData } from '@lib/util'

import Azul from './azul'
import Avianca from './avianca'
import Gol from './gol'
import Latam from './latam'

import * as schema from './schema'

const sources = { Avianca, Azul, Gol, Latam }

export const findLowestFares = async (origin, destination, date) => {
  const data = await parseData({ origin, destination, date }, schema.search)

  const responses =
    await Promise.all(map(sources, async ({ Api, Parser }, sourceName) => {
      try {
        const response =
          await Api.search(data.origin, data.destination, data.date)
        const lowestFare = Parser.getLowestFare(response)
        return { sourceName, lowestFare }
      } catch (err) {
        console.error(err)
        return { sourceName, error: err.message }
      }
    }))

  const validResponses = filter(responses, r => r.lowestFare)

  const lowestFare = (validResponses.length === 0)
    ? -1
    : validResponses.reduce((a, v) => Math.min(v.lowestFare, a), Infinity)

  return { sources: responses, lowestFare }
}
