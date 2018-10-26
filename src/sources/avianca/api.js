import axios from 'axios'
import querystring from 'querystring'

import { getData } from './api-data'

const BASE_URL = 'https://wftc1.e-travel.com/plnext/AviancaBRDX'

const api = {
  search: async (originCode, destinationCode, date, options = {}) => {
    let response

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.avianca.com.br'
    }

    const requestOptions = { baseURL: BASE_URL }
    const data = getData(originCode, destinationCode, date, options)
    const dataString = querystring.stringify(data)

    response = await axios.post('/Override.action', dataString, {
      ...requestOptions,
      headers
    })

    return response.data
  }
}

export default api
