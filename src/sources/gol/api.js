import axios from 'axios'
import moment from 'moment'
import querystring from 'querystring'
import { SourceApi } from '@lib/source'

import mappings from './mappings'

class Api extends SourceApi(mappings) {
  // @override
  static getRequestData (originCode, destinationCode, date, options) {
    const origin = this.mapEndpoint(originCode)
    const destination = this.mapEndpoint(destinationCode)

    const { tripType, passengers } = this.parseOptions(options)

    const prefix = 'ControlGroupSearchView$AvailabilitySearchInputSearchView$'

    return {
      '__EVENTTARGET': '',
      '__EVENTARGUMENT': '',
      'SmilesAndMoney': 'False',
      'ControlGroupSearchView$ButtonSubmit': 'compre aqui',
      [`${prefix}DropDownListResidentCountry`]: 'BR',
      [`${prefix}DropDownListSearchBy`]: 'columnView',
      [`${prefix}RadioButtonMarketStructure`]: tripType,
      [`${prefix}TextBoxMarketOrigin1`]: origin.name,
      [`${prefix}TextBoxMarketDestination1`]: destination.name,
      [`${prefix}DropDownListMarketDay1`]: moment(date).format('DD'),
      [`${prefix}DropDownListMarketMonth1`]: moment(date).format('YYYY-MM'),
      [`${prefix}DropDownListPassengerType_ADT`]: passengers.adults,
      [`${prefix}DropDownListPassengerType_CHD`]: passengers.children,
      [`${prefix}DropDownListPassengerType_INFANT`]: passengers.infants
    }
  }

  // @override
  static async search (originCode, destinationCode, date, options = {}) {
    let response

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Connection': 'keep-alive',
      'Origin': 'https://compre2.voegol.com.br'
    }

    const BASE_URL = 'https://compre2.voegol.com.br'
    const requestOptions = { baseURL: BASE_URL }

    const data = this.getRequestData(originCode, destinationCode, date, options)
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

export default Api
