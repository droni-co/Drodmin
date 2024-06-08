import { getToken } from '#auth'
import { h } from 'vue'

export default defineEventHandler(async (event) => {
  const token = await getToken({event})
  const appiToken = token?.accessToken as AppiToken
  const formData = await readFormData(event)
  const endpoint = formData.get('endpoint')

  const res = await $fetch(`${process.env.APPI}${endpoint}`, {
    method: event.method,
    headers: {
      'Authorization': `Bearer ${appiToken.token}`
    },
    body: formData
  })
  return res
})