import { NextResponse } from 'next/server';
function decodeSession(cookie) { if (!cookie) return null; try { return JSON.parse(Buffer.from(cookie, 'base64').toString()); } catch { return null; } }
export function verifyToken(req) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/session=([^;]+)/);
  const session = decodeSession(match ? match[1] : null);
  const url = req.nextUrl.clone();
  if (!session) { url.pathname = '/login'; return NextResponse.redirect(url); }
  return NextResponse.next();
}