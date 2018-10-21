import axios from 'axios'
import querystring from 'querystring'

import { getData } from './api-data'

const BASE_URL = 'https://compre2.voegol.com.br'

const api = {
  search: async (originCode, destinationCode, date, options = {}) => {
    let response

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Connection': 'keep-alive',
      'Origin': 'https://compre2.voegol.com.br'
    }

    const requestOptions = { baseURL: BASE_URL }

    const data = getData(originCode, destinationCode, date, options)
    const dataString = querystring.stringify(data)

    response = await axios.post('/CSearch.aspx', dataString, {
      ...requestOptions,
      headers,
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 303
    })

    const cookieString = response.headers['set-cookie'].join(';')

    response = await axios.post('/Select2.aspx', data, {
      ...requestOptions,
      headers: { ...headers, cookie: cookieString }
    })

    return response.data
  }
}

export default api
