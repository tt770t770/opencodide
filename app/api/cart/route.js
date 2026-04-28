const store = require('../../../lib/store');

module.exports = {
  GET: () => Response.json(store.getCart()),
  POST: async (req) => {
    const body = await req.json();
    const cart = store.getCart();
    const existing = cart.find(item => item.id === body.id);
    if (existing) {
      existing.quantity += body.quantity || 1;
    } else {
      cart.push({ id: body.id, quantity: body.quantity || 1 });
    }
    return Response.json(store.setCart(cart));
  },
  PUT: async (req) => {
    const body = await req.json();
    return Response.json(store.setCart(body.items || []));
  },
  DELETE: () => Response.json(store.clearCart()),
};
