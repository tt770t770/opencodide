const NextAuth = require('next-auth');
const GitHubProvider = require('next-auth/providers/github');
const users = require('../../../../lib/users');

module.exports = NextAuth({
  providers: [
    GitHubProvider({
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