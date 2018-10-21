import { get, has } from 'lodash'
import moment from 'moment'

export const airports = {
  'aju': 'AJU',
  'fln': 'FLN'
}

export const cities = {
  'bhz': 'BHZ',
  'rio': 'RIO',
  'sao': 'SAO',
}

const getAirport = code => {
  if (has(airports, code)) {
    return { name: airports[code], isCity: false }
  } else if (has(cities, code)) {
    return { name: cities[code], isCity: true }
  } else {
    throw Error('Invalid code')
  }
}

export const getData = (originCode, destinationCode, date, options) => {
  const origin = getAirport(originCode)
  const destination = getAirport(destinationCode)

  if (!date) {
    throw Error('Missing departure date')
  }

  const adults = '' + get(options, 'adults', 1)
  const children = '' + get(options, 'children', 0)
  const infants = '' + get(options, 'infant', 0)

  const data = {
    country: 'BR',
    language: 'PT',
    home: 'pt_br',
    cabin: 'Y',
    origin: origin.name,
    destination: destination.name,
    departure: moment(date).format('YYYY-MM-DD')
  }

  if (adults > 0) {
    data.adult = adults
  }

  if (children > 0) {
    data.child = children
  }

  if (infants > 0) {
    data.infant = infants
  }

  return data
}
