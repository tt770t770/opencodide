const users = require('../../../../lib/users');

function getSession(req) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(Buffer.from(match[1], 'base64').toString());
  } catch {
    return null;
  }
}

module.exports = {
  POST: async (req) => {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existing = users.findUserByEmail(email);
    if (existing) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await users.createUser({ email, password, name });
    return Response.json({ success: true, user: { ...user, password: undefined } });
  },
};