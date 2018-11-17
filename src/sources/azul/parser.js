import cheerio from 'cheerio'
import { map, min } from 'lodash'
import { SourceParser } from '@lib/source'

class Parser extends SourceParser {
  // @override
  static getLowestFare (data) {
    const $ = cheerio.load(data)
    const prices = map($('span.fare-price'), element => {
      let price = element.children[0].data
      price = price.replace('.', '')
      price = price.replace(',', '.')
      return Number(price)
    })
    return min(prices)
  }
}

export default Parser
