let products = [
  { id: '1', name: 'כיסא מעוצב', price: 299, description: 'כיסא יפה לסלון', stock: 10, image: 'https://picsum.photos/seed/chair/300/200' },
  { id: '2', name: 'שולחן עץ', price: 599, description: 'שולחן עץ אלון', stock: 5, image: 'https://picsum.photos/seed/table/300/200' },
  { id: '3', name: 'מנורת רצפה', price: 149, description: 'מנורה מודרנית', stock: 8, image: 'https://picsum.photos/seed/lamp/300/200' },
  { id: '4', name: 'שטיח צבעוני', price: 399, description: 'שטיח יד שני', stock: 3, image: 'https://picsum.photos/seed/carpet/300/200' },
];

let cart = [];
let nextId = 5;

module.exports = {
  getProducts: () => products,
  getProduct: (id) => products.find(p => p.id === id),
  createProduct: (data) => {
    const product = { id: String(nextId++), ...data };
    products.push(product);
    return product;
  },
  updateProduct: (id, data) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  },
  deleteProduct: (id) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  },
  getCart: () => cart,
  setCart: (newCart) => { cart = newCart; return cart; },
  clearCart: () => { cart = []; return cart; },
};
