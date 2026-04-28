const users = require('./users');

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

function setSession(res, user) {
  const session = Buffer.from(JSON.stringify(user)).toString('base64');
  res.headers.set('Set-Cookie', `session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);
}

function clearSession(res) {
  res.headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}

module.exports = { getSession, setSession, clearSession };
