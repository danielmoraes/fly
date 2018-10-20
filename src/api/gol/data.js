import { get, has } from 'lodash'
import moment from 'moment'

const prefix = 'ControlGroupSearchView$AvailabilitySearchInputSearchView$'

export const airports = {
  'aju': 'AJU',
  'aux': 'AUX',
  'bra': 'BRA',
  'jtc': 'JTC',
  'bel': 'BEL',
  'cnf': 'CNF',
  'plu': 'PLU',
  'bvb': 'BVB',
  'bsb': 'BSB',
  'clv': 'CLV',
  'cpv': 'CPV',
  'cgr': 'CGR',
  'cks': 'CKS',
  'cac': 'CAC',
  'cxj': 'CXJ',
  'xap': 'XAP',
  'czs': 'CZS',
  'cgb': 'CGB',
  'cwb': 'CWB',
  'fen': 'FEN',
  'fln': 'FLN',
  'for': 'FOR',
  'igu': 'IGU',
  'gyn': 'GYN',
  'gvr': 'GVR',
  'ios': 'IOS',
  'ipn': 'IPN',
  'jjd': 'JJD',
  'jpa': 'JPA',
  'joi': 'JOI',
  'jdo': 'JDO',
  'iza': 'IZA',
  'ldb': 'LDB',
  'mcp': 'MCP',
  'mcz': 'MCZ',
  'mao': 'MAO',
  'mab': 'MAB',
  'mgf': 'MGF',
  'moc': 'MOC',
  'nat': 'NAT',
  'nna': 'NVT',
  'pmw': 'PMW',
  'pnz': 'PNZ',
  'poa': 'POA',
  'bps': 'BPS',
  'pvh': 'PVH',
  'ppb': 'PPB',
  'rec': 'REC',
  'rao': 'RAO',
  'rbr': 'RBR',
  'gig': 'GIG',
  'sdu': 'SDU',
  'roo': 'ROO',
  'ssa': 'SSA',
  'stm': 'STM',
  'sjp': 'SJP',
  'slz': 'SLZ',
  'vcp': 'VCP',
  'cgh': 'CGH',
  'gru': 'GRU',
  'ops': 'OPS',
  'smt': 'SMT',
  'the': 'THE',
  'tjl': 'TJL',
  'uba': 'UBA',
  'udi': 'UDI',
  'vix': 'VIX',
  'vdc': 'VDC'
}

export const cities = {
  'bhz': 'BHZ',
  'rio': 'RIO',
  'sao': 'SAO',
}

export const TripType = {
  'OneWay': 'OneWay',
  'RoundTrip': 'RoundTrip',
  'OpenJaw': 'OpenJaw'
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

  const tripType = TripType[get(options, 'tripType', 'OneWay')]

  const adults = '' + get(options, 'adults', 1)
  const children = '' + get(options, 'children', 0)
  const infants = '' + get(options, 'infant', 0)

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
    [`${prefix}DropDownListPassengerType_ADT`]: adults,
    [`${prefix}DropDownListPassengerType_CHD`]: children,
    [`${prefix}DropDownListPassengerType_INFANT`]: infants
  }
}
