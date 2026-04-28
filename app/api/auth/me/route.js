function decodeSession(cookie) {
  if (!cookie) return null;
  try {
    return JSON.parse(Buffer.from(cookie, 'base64').toString());
  } catch { return null; }
}

module.exports = {
  GET: async (req) => {
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.match(/session=([^;]+)/);
    const session = decodeSession(match ? match[1] : null);
    if (!session) return Response.json({ user: null });
    return Response.json({ user: { id: session.id, email: session.email, role: session.role, name: session.name } });
  },
};