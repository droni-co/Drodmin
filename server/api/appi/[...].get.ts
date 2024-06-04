import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  // fetch to api
  const token = await getToken({event})
  const appiToken = token?.accessToken as AppiToken
  const res = await $fetch(`${process.env.APPI}/${process.env.SITE_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Key': String(process.env.SITE_KEY),
      'Authorization': `Bearer ${appiToken.token}`
    }
  })
  return res
})