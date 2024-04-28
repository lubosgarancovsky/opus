import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { TokenUser } from './utils/auth';

const getUser = async (credentials: { email: string; password: string }) => {
  const res = await axios.post(`${process.env.API_BASE_URL}/v1/auth/tokens`, {
    email: credentials.email,
    password: credentials.password
  });

  const { accessToken, refreshToken } = res.data;

  const tokenUser = jsonwebtoken.decode(accessToken) as TokenUser;
  const user = { ...tokenUser, id: tokenUser.sub };

  return {
    ...user,
    accessToken,
    refreshToken
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      // @ts-ignore
      authorize: async (credentials: any) => {
        const user = await getUser(credentials);
        return user;
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user, account }: any) => {
      const typedToken = token as any;

      if (account) {
        const { refreshToken, accessToken, exp, iat, ...tokenUser } = user as any;

        return {
          ...typedToken,
          user: tokenUser,
          accessToken,
          refreshToken,
          exp,
          iat
        };
      }

      return typedToken;
    },

    session: async ({ session, token }: any) => {
      const sameSession = session as any;

      if (token.user) {
        sameSession.user = token.user;
        sameSession.refreshToken = token.refreshToken;
        sameSession.accessToken = token.accessToken;
        sameSession.exp = token.exp;
        sameSession.iat = token.iat;
      }

      return sameSession;
    }
  },

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
});
