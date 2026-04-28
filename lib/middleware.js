function decodeSession(cookie) {
  if (!cookie) return null;
  try { return JSON.parse(Buffer.from(cookie, 'base64').toString()); } catch { return null; } }
function encodeSession(user) { return Buffer.from(JSON.stringify(user)).toString('base64'); }
function verifyToken(req) { return verifyToken(req); }
module.exports = { decodeSession, encodeSession };