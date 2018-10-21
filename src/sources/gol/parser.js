import cheerio from 'cheerio'
import { map, min } from 'lodash'

const parser = {
  getLowestFare: data => {
    const $ = cheerio.load(data)

    let bestPrice =
      $('.listDates li.active a span.price span:nth-child(3)').text()

    bestPrice = bestPrice.replace('.', '')
    bestPrice = bestPrice.replace(',', '.')
    bestPrice = Number(bestPrice)

    return bestPrice
  }
}

export default parser
