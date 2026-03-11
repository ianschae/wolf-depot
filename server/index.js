import express from 'express'
import cors from 'cors'
import { getDb, initSchema, seed } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

initSchema()
// Seed on startup if DB is empty (no products)
const db = getDb()
const count = db.prepare('SELECT COUNT(*) as n FROM products').get()
if (count.n === 0) seed()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/categories', (_req, res) => {
  const rows = db.prepare('SELECT * FROM categories ORDER BY slug').all()
  res.json(rows)
})

app.get('/api/products', (req, res) => {
  const { category } = req.query
  let rows
  if (category) {
    rows = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY id').all(category)
  } else {
    rows = db.prepare('SELECT * FROM products ORDER BY id').all()
  }
  res.json(rows)
})

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Product not found' })
  res.json(row)
})

app.post('/api/orders', (req, res) => {
  const { orderNumber, email, items, total } = req.body
  if (!orderNumber || !email || !Array.isArray(items) || total == null) {
    return res.status(400).json({ error: 'Missing orderNumber, email, items, or total' })
  }
  const insertOrder = db.prepare('INSERT INTO orders (order_number, email, total) VALUES (?, ?, ?)')
  const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, name, price, qty) VALUES (?, ?, ?, ?, ?)')
  const { lastInsertRowid } = db.transaction(() => {
    const info = insertOrder.run(orderNumber, email, total)
    const orderId = info.lastInsertRowid
    items.forEach((item) => insertItem.run(orderId, item.id, item.name, item.price, item.qty ?? 1))
    return { lastInsertRowid: orderId }
  })()
  res.status(201).json({ id: lastInsertRowid, orderNumber })
})

app.get('/api/orders', (req, res) => {
  const { email } = req.query
  let rows
  if (email) {
    rows = db.prepare(
      'SELECT o.id, o.order_number, o.email, o.total, o.created_at FROM orders o WHERE o.email = ? ORDER BY o.created_at DESC'
    ).all(email)
  } else {
    rows = db.prepare(
      'SELECT o.id, o.order_number, o.email, o.total, o.created_at FROM orders o ORDER BY o.created_at DESC LIMIT 50'
    ).all()
  }
  res.json(rows)
})

app.listen(PORT, () => {
  console.log(`Wolf Depot API on http://localhost:${PORT}`)
})
