import { User } from '@/utils/auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
}
