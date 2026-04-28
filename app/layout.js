import './globals.css';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton';

function decodeSession(cookie) {
  if (!cookie) return null;
  try { return JSON.parse(Buffer.from(cookie, 'base64').toString()); } catch { return null; }
}

export const metadata = {
  title: 'חנות - ריהוט ועיצוב',
  description: 'חנות ריהוט ועיצוב לבית',
};

export default function RootLayout({ children }) {
  const session = decodeSession(cookies().get('session')?.value);
  
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="header">
          <a href="/" className="logo">🛋️ הבית שלי</a>
          <nav>
            <a href="/">החנות</a>
            <a href="/cart">העגלה</a>
            {session?.role === 'admin' && <a href="/admin">ניהול</a>}
            {session ? (
              <>
                <span style={{ color: '#a0a0a0', marginRight: '1rem' }}>{session.name}</span>
                <LogoutButton />
              </>
            ) : (
              <a href="/login">התחבר</a>
            )}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          © 2026 הבית שלי - כל הזכויות שמורות
        </footer>
      </body>
    </html>
  );
}