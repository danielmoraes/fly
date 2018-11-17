export const parseData = async (data, schema) => {
  const valid = await schema.isValid(data)

  if (!valid) {
    throw Error('Invalid query data')
  }

  return schema.cast(data)
}
