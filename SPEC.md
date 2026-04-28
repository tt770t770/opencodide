# Online Store — Spec

## Stack
- Next.14 + JSX (no TypeScript), in-memory data store
- API routes for products and cart
- Custom CSS with variables

## Pages

### `/` — Storefront
- Grid of products (name, price, description, stock)
- Add to cart button (disabled if out of stock)
- Cart indicator in header

### `/cart` — Cart
- List items with quantity +/– controls
- Remove item
- Total price
- "Place Order" → clears cart, shows confirmation

### `/admin` — Admin Panel
- Table of all products with Edit / Delete buttons
- "Add Product" form (name, price, description, stock, image URL)
- Edit form inline in table row
- Delete with confirm

## API

### `GET /api/products`
Returns all products.

### `POST /api/products`
Create product. Body: `{ name, price, description, stock, image }`.

### `PUT /api/products/[id]`
Update product. Body: `{ name, price, description, stock, image }`.

### `DELETE /api/products/[id]`
Delete product.

### `POST /api/cart`
Add item `{ id, quantity }`. Returns full cart.

### `PUT /api/cart`
Update cart `{ items: [{ id, quantity }] }`. Returns full cart.

### `DELETE /api/cart`
Clear cart.

## Data Model

Product: `{ id, name, price, description, stock, image }`
CartItem: `{ id, quantity }`

## Style
- Font: `Heebo` (Google Fonts, Hebrew support)
- Color: `#1a1a2e` bg, `#e94560` accent, `#16213e` card, `#e0e0e0` text
- Responsive grid: 1–3 cols