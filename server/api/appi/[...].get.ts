export default defineEventHandler(async (event) => {
  // fetch to api
  const res = await $fetch(`${process.env.APPI}/${process.env.SITE_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Key': String(process.env.SITE_KEY)
    }
  })
  console.log('res', res)
  return res
})