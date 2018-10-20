import axios from 'axios'
import querystring from 'querystring'

import { getData } from './data'

const BASE_URL =
  'https://bff.latam.com/ws/proxy/booking-webapp-bff/v1/' +
  'public/revenue/recommendations/oneway'

const Latam = {
  search: async (originCode, destinationCode, date, options = {}) => {
    const data = getData(originCode, destinationCode, date, options)
    const response = await axios.get(BASE_URL, { params: data })
    return response.data
  }
}

export default Latam