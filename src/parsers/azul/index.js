import cheerio from 'cheerio'
import { map, min } from 'lodash'

const AzulParser = {
  findBestPrice: data => {
    const $ = cheerio.load(data)
    const prices = map($('.area-radio .price .fare-price'), element => {
      let price = element.children[0].data
      price = price.replace('.', '')
      price = price.replace(',', '.')
      return Number(price)
    })
    return min(prices)
  }
}

export default AzulParser
