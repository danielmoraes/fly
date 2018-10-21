const parser = {
  getLowestFare: data => {
    const flights = data.data.flights
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

export default parser
