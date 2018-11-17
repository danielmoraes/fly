const yup = require('yup')

export const search = yup.object().shape({
  origin: yup.string().uppercase().required(),
  destination: yup.string().uppercase().required(),
  date: yup.date().default(() => moment().add(15, 'd'))
})
