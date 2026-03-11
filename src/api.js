const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/api/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function fetchProducts(category) {
  const url = category ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}` : `${API_BASE}/api/products`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

export async function postOrder(order) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderNumber: order.orderNumber,
      email: order.email,
      items: order.items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total: order.total,
    }),
  })
  if (!res.ok) throw new Error('Failed to place order')
  return res.json()
}

export async function fetchOrders(email) {
  const url = email ? `${API_BASE}/api/orders?email=${encodeURIComponent(email)}` : `${API_BASE}/api/orders`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}
