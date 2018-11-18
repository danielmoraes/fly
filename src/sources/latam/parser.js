import { SourceParser } from '../../lib/source'

class Parser extends SourceParser {
  // @override
  static getLowestFare (data) {
    const flights = data.data.flights

    if (flights.length === 0) {
      throw Error('No flights found for this trip')
    }

    const bestPrice =
      flights.reduce(
        (fa, fv) => Math.min(
          fv.cabins.reduce((ca, cv) => Math.min(cv.displayPrice, ca), Infinity),
          fa
        ),
        Infinity
      )

    return bestPrice
  }
}

export default Parser
