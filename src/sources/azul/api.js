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

    const { fareType, tripType, passengers } = this.parseOptions(options)

    const prefix = 'ControlGroupSearch$SearchMainSearchView$'

    return {
      '__EVENTTARGET': 'ControlGroupSearch$LinkButtonSubmit',
      [`${prefix}RadioButtonMarketStructure`]: tripType,
      [`${prefix}TextBoxMarketOrigin1`]: origin.name,
      [`${prefix}CheckBoxUseMacOrigin1`]: origin.isCity ? 'on' : '',
      [`${prefix}TextBoxMarketDestination1`]: destination.name,
      [`${prefix}CheckBoxUseMacDestination1`]: destination.isCity ? 'on' : '',
      [`${prefix}DropDownListMarketDay1`]: moment(date).format('DD'),
      [`${prefix}DropDownListMarketMonth1`]: moment(date).format('YYYY-MM'),
      [`${prefix}DropDownListPassengerType_ADT`]: passengers.adults,
      [`${prefix}DropDownListPassengerType_CHD`]: passengers.children,
      [`${prefix}DropDownListPassengerType_INFANT`]: passengers.infants,
      [`${prefix}DropDownListFareTypes`]: fareType
    }
  }

  // @override
  static async search (originCode, destinationCode, date, options = {}) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.voeazul.com.br'
    }

    const requestOptions = { baseURL: 'https://viajemais.voeazul.com.br' }

    const data = this.getRequestData(originCode, destinationCode, date, options)
    const dataString = querystring.stringify(data)

    let response = await axios.post('/Search.aspx', dataString, {
      ...requestOptions,
      headers,
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 303
    })

    const cookieString = response.headers['set-cookie'].join(';')

    response = await axios.post('/Availability.aspx', data, {
      ...requestOptions,
      headers: { ...headers, cookie: cookieString }
    })

    return response.data
  }
}

export default Api
