function clearSession(headers) {
  headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}

module.exports = {
  POST: async () => {
    const headers = new Headers();
    clearSession(headers);
    return Response.json({ success: true }, { headers });
  },
};