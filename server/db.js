import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { categories, products } from './seed-data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'wolf-depot.db')

let db = null

export function getDb() {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
  }
  return db
}

export function initSchema() {
  const database = getDb()
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      description TEXT,
      FOREIGN KEY (category) REFERENCES categories(id)
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      total REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      qty INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
  `)
}

export function seed() {
  const database = getDb()
  initSchema()
  const insertCat = database.prepare('INSERT OR REPLACE INTO categories (id, name, slug) VALUES (?, ?, ?)')
  const insertProd = database.prepare('INSERT OR REPLACE INTO products (id, name, price, category, image, description) VALUES (?, ?, ?, ?, ?, ?)')
  database.transaction(() => {
    categories.forEach((c) => insertCat.run(c.id, c.name, c.slug))
    products.forEach((p) => insertProd.run(p.id, p.name, p.price, p.category, p.image, p.description))
  })()
  console.log('Seeded categories and products')
}
