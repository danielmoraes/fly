import cheerio from 'cheerio'
import { map, min } from 'lodash'
import { SourceParser } from '@lib/source'

class Parser extends SourceParser {
  // @override
  static getLowestFare (data) {
    const $ = cheerio.load(data)

    let bestPrice =
      $('.listDates li.active a span.price span:nth-child(3)').text()

    bestPrice = bestPrice.replace('.', '')
    bestPrice = bestPrice.replace(',', '.')
    bestPrice = Number(bestPrice)

    if (!bestPrice) {
      throw Error('No flights found for this trip')
    }

    return bestPrice
  }
}

export default Parser
