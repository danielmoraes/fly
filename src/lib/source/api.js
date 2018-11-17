import airports from '@data/airports'
import { get, pick, reduce, toString } from 'lodash'

const SourceApiCreator = (mappings) => class SourceApi {
  static mapEndpoint (code) {
    const codeLower = code.toLowerCase()

    const airport = get(mappings, `airports.${codeLower}`)

    if (airport) {
      return { name: airport, isGroup: false }
    }

    const group = get(mappings, `groups.${codeLower}`)

    if (group) {
      return { name: group, isGroup: true }
    }

    throw Error(`${airports[code].name} is not supported by this airline`)
  }

  static mapFareType (fareType) {
    return get(mappings, `fareTypes.${fareType || 'cash'}`)
  }

  static mapTripType (tripType) {
    return get(mappings, `tripTypes.${tripType || 'oneWay'}`)
  }

  static parseOptions (options) {
    const fareType = this.mapFareType(get(options, 'fareType'))
    const tripType = this.mapTripType(get(options, 'tripType'))

    const passengerTypes = ['adults', 'children', 'infants']
    const passengers = reduce(passengerTypes,
      (a, v) => ({ ...a, [v]: toString(get(options, v, 0))}), {})

    passengers.adults = Math.max(passengers.adults, 1)

    return { fareType, tripType, passengers }
  }

  static getRequestData (originCode, destinationCode, date, options) {
    throw new Error('Not implemented')
  }

  static async search (originCode, destinationCode, date, options) {
    throw new Error('Not implemented')
  }
}

export default SourceApiCreator
