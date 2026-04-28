function decodeSession(cookie) {
  if (!cookie) return null;
  try {
    return JSON.parse(Buffer.from(cookie, 'base64').toString());
  } catch { return null; }
}

module.exports = {
  POST: async (req) => {
    const headers = new Headers();
    headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
    return Response.json({ success: true }, { headers });
  },
};