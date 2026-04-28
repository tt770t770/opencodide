'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data.user) router.push('/');
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error || 'שגיאה');
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>התחברות</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>אימייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>סיסמה</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: '#e94560', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" className="btn" style={{ width: '100%' }}>
          התחבר
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', color: 'var(--text-dim)' }}>
        אין לך חשבון? <Link href="/register">הירשם</Link>
      </p>

      <hr style={{ margin: '2rem 0', borderColor: '#333' }} />
      
      <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>או התחבר עם GitHub</p>
      <a href="/api/auth/signin" className="btn" style={{ display: 'block', background: '#333' }}>
        התחבר עם GitHub
      </a>
    </div>
  );
}