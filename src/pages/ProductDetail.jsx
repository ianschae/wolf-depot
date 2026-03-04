import { useParams, Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === id)
  const category = product ? categories.find((c) => c.id === product.category) : null

  if (!product) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ color: 'var(--wolf-gray-700)', fontSize: '0.9rem' }}>← Home</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--wolf-gray-400)' }}>/</span>
        <Link to="/products" style={{ color: 'var(--wolf-gray-700)', fontSize: '0.9rem' }}>Products</Link>
        {category && (
          <>
            <span style={{ margin: '0 0.5rem', color: 'var(--wolf-gray-400)' }}>/</span>
            <Link to={`/products/category/${category.slug}`} style={{ color: 'var(--wolf-gray-700)', fontSize: '0.9rem' }}>
              {category.name}
            </Link>
          </>
        )}
      </div>

      <div
        style={{
          background: 'var(--wolf-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '5rem' }} aria-hidden>
          {product.image}
        </div>
        <div>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>{product.name}</h1>
          <p style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 700, color: 'var(--wolf-orange)' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ margin: '0 0 1.5rem', color: 'var(--wolf-gray-700)', lineHeight: 1.6 }}>
            {product.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Qty:</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
                style={{
                  width: 64,
                  padding: '0.4rem',
                  border: '1px solid var(--wolf-gray-400)',
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem',
                }}
              />
            </label>
            <button
              type="button"
              onClick={handleAdd}
              style={{
                padding: '0.6rem 1.25rem',
                background: added ? 'var(--wolf-gray-700)' : 'var(--wolf-orange)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {added ? 'Added to cart!' : 'Add to cart'}
            </button>
          </div>
          {added && (
            <Link
              to="/cart"
              style={{
                display: 'inline-block',
                marginTop: '0.75rem',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              View cart →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
