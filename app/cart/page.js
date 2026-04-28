'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

async function fetchCart() {
  const res = await fetch('/api/cart');
  return res.json();
}

async function fetchProducts() {
  const res = await fetch('/api/products');
  return res.json();
}

async function updateCart(items) {
  const res = await fetch('/api/cart', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  return res.json();
}

async function clearCart() {
  await fetch('/api/cart', { method: 'DELETE' });
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    Promise.all([fetchCart(), fetchProducts()]).then(([cart, prods]) => {
      setCartItems(cart);
      setProducts(prods);
    });
  }, []);

  const getProduct = (id) => products.find((p) => p.id === id);

  const total = cartItems.reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const updateQty = async (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    const result = await updateCart(updated);
    setCartItems(result);
  };

  const removeItem = async (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    const result = await updateCart(updated);
    setCartItems(result);
  };

  const placeOrder = async () => {
    await clearCart();
    setCartItems([]);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <h2>✅ ההזמנה בוצעה בהצלחה!</h2>
        <p>תודה על הקנייה. ניצור איתך קשר בהמשך.</p>
        <Link href="/" className="btn" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
          חזור לחנות
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>העגלה ריקה</h2>
        <p>עוד לא הוספת מוצרים לעגלה</p>
        <Link href="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          לחנות
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>העגלה שלי</h1>
      {cartItems.map((item) => {
        const p = getProduct(item.id);
        if (!p) return null;
        return (
          <div key={item.id} className="cart-item">
            <img src={p.image} alt={p.name} />
            <div className="details">
              <h3>{p.name}</h3>
              <p>₪{p.price} ליחידה</p>
            </div>
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
              <span>{item.quantity}</span>
              <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
            </div>
            <div style={{ minWidth: '80px', textAlign: 'left' }}>
              <strong>₪{p.price * item.quantity}</strong>
            </div>
            <button className="btn danger small" onClick={() => removeItem(item.id)}>×</button>
          </div>
        );
      })}
      <div className="cart-total">
        סה"כ: ₪{total}
      </div>
      <button className="btn success" onClick={placeOrder} style={{ marginTop: '1rem', width: '100%' }}>
        בצע הזמנה
      </button>
    </div>
  );
}
