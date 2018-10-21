import moment from 'moment'

import { findLowestFares } from '../sources'

const yup = require('yup')

export const search = async (req, res) => {
  const schema = yup.object().shape({
    origin: yup.string().required(),
    destination: yup.string().required(),
    date: yup.date().default(() => moment().add(15, 'd'))
  })

  try {
    const { origin, destination, date }  = await schema.cast(req.query)
    const lowestFares = await findLowestFares(origin, destination, date)
    res.send(lowestFares)
  } catch (e) {
    res.sendStatus(400)
  }
}
