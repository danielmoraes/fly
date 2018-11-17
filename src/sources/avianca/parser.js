import { min } from 'lodash'
import { SourceParser } from '@lib/source'

class Parser extends SourceParser {
  // @override
  static getLowestFare (data) {
    const re =
      /"amountWithoutTax":(\d+.\d+),"totalAmount":(\d+.\d+),"milesCost":(\d+)/g

    const prices = []

    let match = re.exec(data)

    while (match !== null) {
      const amountWithoutTax = match[1]
      prices.push(Number(amountWithoutTax))
      match = re.exec(data)
    }

    return min(prices)
  }
}

export default Parser
