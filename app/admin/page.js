'use client';
import { useState, useEffect } from 'react';

async function fetchProducts() {
  const res = await fetch('/api/products');
  return res.json();
}

async function createProduct(data) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function updateProduct(id, data) {
  const res = await fetch(`/api/products?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function deleteProduct(id) {
  await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
}

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '', image: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      stock: Number(form.stock),
      image: form.image || 'https://picsum.photos/seed/' + Date.now() + '/300/200',
    };
    if (editingId) {
      await updateProduct(editingId, data);
    } else {
      await createProduct(data);
    }
    setForm({ name: '', price: '', description: '', stock: '', image: '' });
    setShowForm(false);
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, description: p.description, stock: p.stock, image: p.image });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('למחוק את המוצר?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const cancelEdit = () => {
    setForm({ name: '', price: '', description: '', stock: '', image: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>ניהול מוצרים</h1>

      <button className="btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'ביטול' : '+ הוסף מוצר'}
      </button>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'ערוך מוצר' : 'מוצר חדש'}</h2>
          <div className="form-group">
            <label>שם המוצר</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>מחיר (₪)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>תיאור</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>כמות במלאי</label>
            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>כתובת תמונה (URL)</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>
          <button type="submit" className="btn">{editingId ? 'שמור' : 'הוסף'}</button>
          {editingId && <button type="button" className="btn secondary" onClick={cancelEdit} style={{ marginRight: '0.5rem' }}>ביטול</button>}
        </form>
      )}

      <table className="admin-table" style={{ marginTop: '2rem' }}>
        <thead>
          <tr>
            <th>תמונה</th>
            <th>שם</th>
            <th>מחיר</th>
            <th>מלאי</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} /></td>
              <td>{p.name}</td>
              <td>₪{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn small" onClick={() => handleEdit(p)} style={{ marginLeft: '0.5rem' }}>ערוך</button>
                <button className="btn danger small" onClick={() => handleDelete(p.id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && <p style={{ marginTop: '2rem', color: 'var(--text-dim)' }}>אין מוצרים עדיין</p>}
    </div>
  );
}
