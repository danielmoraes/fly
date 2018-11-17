import { findLowestFares } from '@sources'

export const search = async (req, res) => {
  try {
    const { origin, destination, date } = req.query
    const lowestFares = await findLowestFares(origin, destination, date)
    res.send(lowestFares)
  } catch (err) {
    console.error(err.stack)
    return res.sendStatus(400)
  }
}
