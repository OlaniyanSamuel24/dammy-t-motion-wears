import NextAuth,{type NextAuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import {prisma} from './lib/prisma';
import {scryptSync,timingSafeEqual} from 'node:crypto';

type UserWithRole={role?:string};type SessionWithRole={user?:UserWithRole&{id?:string}};
function validPassword(password:string,stored:string){const [salt,hash]=stored.split(':');if(!salt||!hash)return false;const derived=scryptSync(password,salt,64);const expected=Buffer.from(hash,'hex');return expected.length===derived.length&&timingSafeEqual(expected,derived)}
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = 'dammy-t-motion-wears-local-auth-secret';
}
if (!process.env.AUTH_SECRET) {
  process.env.AUTH_SECRET = process.env.NEXTAUTH_SECRET;
}
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/auth/signin' },
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: { email: { label: 'Email' }, password: { label: 'Password', type: 'password' } },
      authorize: async (credentials) => {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
        if (!user?.passwordHash || !validPassword(parsed.data.password, user.passwordHash)) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      const role = (user as UserWithRole | undefined)?.role;
      if (role) token.role = role;
      return token;
    },
    session({ session, token }) {
      const sessionWithRole = session as typeof session & SessionWithRole;
      if (sessionWithRole.user) {
        sessionWithRole.user.id = token.sub as string;
        if (token.role) sessionWithRole.user.role = token.role as string;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);

