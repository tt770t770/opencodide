const users = require('../../../../lib/users');

function setSession(headers, user) {
  const session = Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name })).toString('base64');
  headers.set('Set-Cookie', `session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);
}

module.exports = {
  POST: async (req) => {
    const body = await req.json();
    const { email, password } = body;

    const user = users.findUserByEmail(email);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await users.comparePassword(password, user.password);
    if (!valid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const headers = new Headers();
    setSession(headers, user);

    return Response.json(
      { user: { id: user.id, email: user.email, role: user.role, name: user.name } },
      { headers }
    );
  },
};