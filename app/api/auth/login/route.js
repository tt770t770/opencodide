const users = require('../../../../lib/users');
const bcrypt = require('bcryptjs');

function encodeSession(user) {
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

function decodeSession(cookie) {
  if (!cookie) return null;
  try {
    return JSON.parse(Buffer.from(cookie, 'base64').toString());
  } catch { return null; }
}

module.exports = {
  encodeSession, decodeSession,

  POST: async (req) => {
    const body = await req.json();
    const { email, password } = body;

    const user = users.findUserByEmail(email);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const session = encodeSession({ id: user.id, email: user.email, role: user.role, name: user.name });
    const headers = new Headers();
    headers.set('Set-Cookie', `session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);

    return Response.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name } }, { headers });
  },
};