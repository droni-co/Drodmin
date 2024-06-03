// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, user}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({session, token}) => {
      (session as any).role = token.role;
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})