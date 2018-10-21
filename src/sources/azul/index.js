import api from './api'
import parser from './parser'

export const findLowestFare = async (origin, destination, date) => {
  const response = await api.search(origin, destination, date)
  return parser.getLowestFare(response)
}
