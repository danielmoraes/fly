import axios from 'axios'
import moment from 'moment'
import { omitBy, set } from 'lodash'

import { SourceApi } from '../../lib/source'

import mappings from './mappings'

class Api extends SourceApi(mappings) {
  // @override
  static getRequestData (originCode, destinationCode, date, options) {
    const origin = this.mapEndpoint(originCode)
    const destination = this.mapEndpoint(destinationCode)

    const { passengers } = this.parseOptions(options)

    const data = {
      country: 'BR',
      language: 'PT',
      home: 'pt_br',
      cabin: 'Y',
      origin: origin.name,
      destination: destination.name,
      departure: moment(date).format('YYYY-MM-DD')
    }

    if (passengers.adults > 0) {
      set(data, 'adult', passengers.adults)
    }

    if (passengers.children > 0) {
      set(data, 'child', passengers.children)
    }

    if (passengers.infants > 0) {
      set(data, 'infant', infants)
    }

    return data
  }

  // @override
  static async search (originCode, destinationCode, date, options = {}) {
    const data = this.getRequestData(originCode, destinationCode, date, options)
    const BASE_URL =
      'https://bff.latam.com/ws/proxy/booking-webapp-bff/v1/' +
      'public/revenue/recommendations/oneway'
    const response = await axios.get(BASE_URL, { params: data })
    return response.data
  }
}

export default Api
