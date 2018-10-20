const LatamParser = {
  findBestPrice: ({ data }) => {
    const flights = data.flights
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

export default LatamParser
