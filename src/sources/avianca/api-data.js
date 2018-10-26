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

  return {
    CTR: 'BR',
    BOOKING_FLOW: 'REVENUE',
    DATE_RANGE_QUALIFIER_1: 'C',
    SO_SITE_AWARD_CONVERTER_MODE: 'MILES_AND_CASH',
    SO_SITE_PAY_USE_TFPSCQ: 'FALSE',
    SO_SITE_USE_TFPSGQ: 'TRUE',
    SO_SITE_FP_CFF_DIST_OPT: 'NAT',
    SO_SITE_MILESANDCASH_LIGHT: 'FALSE',
    TRIP_FLOW: 'YES',
    FLX_DATES: 'true',
    EXTERNAL_ID: 'SAO',
    DISPLAY_TYPE: '2',
    LANGUAGE: 'BR',
    ARRANGE_BY: 'NDE',
    pe_variable3: 'Domestic',
    SO_SITE_INS_BOOK_BIRTH_REQ: 'TRUE',
    SO_SITE_PAY_USE_TFOPCQ: 'TRUE',
    SO_SITE_FD_DISPLAY_MODE: '0',
    SO_SITE_FP_FORWARD_RECOS: 'TRUE',
    SO_SITE_PAY_TFPICQ_VERSION: '15.3',
    TRIP_TYPE: 'O',
    SO_SITE_USE_SLD_FOP_FOR_AWC: 'TRUE',
    PRICING_TYPE: 'C',
    SO_SITE_OFFICE_ID: 'SAOO608AA',
    SOURCE: 'DESKTOP_REVENUE',
    SO_SITE_IS_INSURANCE_ENABLED: 'TRUE',
    DATE_RANGE_VALUE_1: '3',
    SO_SITE_VALIDATING_AIRLINE: 'O6',
    B_DATE_1: `${moment(date).format('YYYYMMDD')}0000`,
    B_LOCATION_1: origin.name,
    EMBEDDED_TRANSACTION: 'FlexPricerAvailability',
    SO_SITE_SIGNIN_METHOD: 'NOT_REQUIRED',
    IS_MILES_MODE: 'FALSE',
    SO_SITE_PUBLISH_MILES_AIRLIN: 'O6',
    SO_SITE_USE_MC_PRICING_OPTN: 'FALSE',
    COMMERCIAL_FARE_FAMILY_1: 'ZBR',
    PERIOD_OUT_WINDOW: 'undefined',
    SITE: 'AEDKANEW',
    SO_SITE_PAY_TFPSGQ_VERSION: '16.1',
    EOT_BEFORE_REDIRECT: 'TRUE',
    MILES_MODE: 'FALSE',
    PERIOD_IN_WINDOW: 'undefined',
    E_LOCATION_1: destination.name,
    SO_SITE_FP_CONVERT_TO_MILES: 'TRUE',
    SO_SITE_ENABLE_PREBOOKING: 'TRUE',
    SO_SITE_FP_PRICING_TYPE: 'CITY',
    SO_SITE_RUI_CAL_AVAI_NO_RECO: 'TRUE',
    FIELD_ADT_NUMBER: adults,
    TRAVELLER_TYPE_1: 'ADT',
    SITE2: 'AviancaBR'
  }
}
