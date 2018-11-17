import moment from 'moment'
import { airports, groups } from '@data'
import { concat, keys } from 'lodash'

const yup = require('yup')

const codes = concat(keys(airports), keys(groups))

export const search = yup.object().shape({
  origin: yup.string().lowercase().required().oneOf(codes),
  destination: yup.string().lowercase().required().oneOf(codes),
  date: yup.date().default(() => moment().add(15, 'd'))
})
