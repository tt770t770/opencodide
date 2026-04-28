import './globals.css';

export const metadata = {
  title: 'חנות - ריהוט ועיצוב',
  description: 'חנות ריהוט ועיצוב לבית',
};

export default function RootLayout({ children }) {
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
            <a href="/admin">ניהול</a>
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
