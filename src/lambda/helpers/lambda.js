export const error = e => ({
  statusCode: 500,
  body: JSON.stringify({
    message: e.message,
  }),
})

export const success = data => ({
  statusCode: 200,
  body: JSON.stringify(data),
})

export const unauthorized = {
  statusCode: 400,
  body: JSON.stringify({
    message: "Not authorized",
  }),
}
