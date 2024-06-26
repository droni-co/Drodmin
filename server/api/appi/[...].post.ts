import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({event})
  const appiToken = token?.accessToken as AppiToken
  const endpoint = String(event.node.req.url).replace('/api/appi', '')
  const body = await readBody(event)

  const res = await $fetch(`${process.env.APPI}${endpoint}`, {
    method: event.method,
    headers: {
      'Authorization': `Bearer ${appiToken.token}`
    },
    body: body
  })
  return res
})