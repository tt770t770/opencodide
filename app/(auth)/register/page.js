'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
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
    
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error || 'שגיאה');
      return;
    }

    router.push('/login');
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>הרשמה</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>שם</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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
            minLength={6}
          />
        </div>

        {error && <p style={{ color: '#e94560', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" className="btn" style={{ width: '100%' }}>
          הירשם
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', color: 'var(--text-dim)' }}>
        יש לך חשבון? <Link href="/login">התחבר</Link>
      </p>
    </div>
  );
}