const store = require('../../../lib/store');

function getProducts() {
  return store.getProducts();
}

function createProduct(data) {
  return store.createProduct(data);
}

function updateProduct(id, data) {
  return store.updateProduct(id, data);
}

function deleteProduct(id) {
  return store.deleteProduct(id);
}

module.exports = {
  GET: () => Response.json(getProducts()),
  POST: async (req) => {
    const body = await req.json();
    const product = createProduct(body);
    return Response.json(product);
  },
  PUT: async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const product = updateProduct(id, body);
    return product ? Response.json(product) : Response.json({ error: 'Not found' }, { status: 404 });
  },
  DELETE: async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const success = deleteProduct(id);
    return success ? Response.json({ ok: true }) : Response.json({ error: 'Not found' }, { status: 404 });
  },
};
