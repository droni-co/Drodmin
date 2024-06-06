// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try { 
          /* Call Appi login */
          await $fetch(`${process.env.APPI}/${process.env.APPI_SITE_ID}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Key': String(process.env.APPI_SITE_KEY),
            },
            body: {
              access_token: account.access_token,
              provider: 'google',
              lang: 'es'
            }
          }).then((res) => {
            token.accessToken = res.token
          })
        } catch (error) {
          return Promise.reject(new Error('Failed to login'));
        }
      }
      return Promise.resolve(token);
    }
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})