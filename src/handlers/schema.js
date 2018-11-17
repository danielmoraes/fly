import airports from '@data/airports'

const yup = require('yup')

const airportCodes = Object.keys(airports)

export const search = yup.object().shape({
  origin: yup.string().lowercase().oneOf(airportCodes),
  destination: yup.string().lowercase().oneOf(airportCodes),
  date: yup.date().default(() => moment().add(15, 'd'))
})
