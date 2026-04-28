'use client';
import { useState, useEffect } from 'react';

async function fetchProducts() {
  const res = await fetch('/api/products');
  return res.json();
}

async function addToCart(productId) {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: productId, quantity: 1 }),
  });
  return res.json();
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToCart = async (id) => {
    await addToCart(id);
    const res = await fetch('/api/cart');
    const cart = await res.json();
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    alert('נוסף לעגלה!');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>המוצרים שלנו</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="product-info">
              <h3>{p.name}</h3>
              <div className="price">₪{p.price}</div>
              <p className="desc">{p.description}</p>
              <p className="stock">במלאי: {p.stock} יחידות</p>
              <button
                className="btn"
                onClick={() => handleAddToCart(p.id)}
                disabled={p.stock <= 0}
                style={{ marginTop: '1rem', width: '100%' }}
              >
                {p.stock > 0 ? 'הוסף לעגלה' : 'אזל מהמלאי'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
