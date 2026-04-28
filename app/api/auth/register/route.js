const users = require('../../../../lib/users');

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
  POST: async (req) => {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (users.findUserByEmail(email)) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: require('uuid').v4(),
      email, password: hashedPassword,
      name: name || email.split('@')[0],
      role: 'user',
    };

    users.getUsers().push(user);

    const session = encodeSession({ id: user.id, email: user.email, role: user.role, name: user.name });
    const headers = new Headers();
    headers.set('Set-Cookie', `session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);

    return Response.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name } }, { headers });
  },
};