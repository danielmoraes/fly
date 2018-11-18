import moment from 'moment'
import { concat, keys } from 'lodash'

import { airports, groups } from '../data'

const yup = require('yup')

const codes = concat(keys(airports), keys(groups))

export const search = yup.object().shape({
  origin: yup.string().lowercase().required().oneOf(codes),
  destination: yup.string().lowercase().required().oneOf(codes),
  date: yup.date().default(() => moment().add(15, 'd'))
})
