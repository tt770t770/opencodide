import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import users from '../../../../lib/users';

export default NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      let user = users.findUserByEmail(profile.email);
      if (!user) {
        user = await users.createUser({
          email: profile.email,
          password: require('uuid').v4() + Math.random().toString(36),
          name: profile.name || profile.login,
        });
      }
      return true;
    },
    async session({ session }) {
      const user = users.findUserByEmail(session.user.email);
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});