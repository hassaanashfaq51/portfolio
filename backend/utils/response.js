export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({ success: true, message, data })
}

export const sendError = (res, message = 'Error', statusCode = 500, errors = null) => {
  const payload = { success: false, message }
  if (errors) payload.errors = errors
  res.status(statusCode).json(payload)
}

export const sendPaginated = (res, data, pagination, message = 'Success') => {
  res.status(200).json({ success: true, message, data, pagination })
}
