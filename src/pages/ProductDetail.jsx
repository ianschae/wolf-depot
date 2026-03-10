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
      <div className="main-content" data-testid="page-product-detail">
        <div className="container" style={{ textAlign: 'center', padding: '48px 24px' }} data-testid="product-not-found">
          <p style={{ fontSize: 18, marginBottom: 16 }}>Product not found.</p>
          <Link to="/products" className="btn-primary" data-testid="link-back-to-products">Back to products</Link>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="main-content" data-testid="page-product-detail">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <Link to="/products" data-testid="breadcrumb-products">Products</Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/products/category/${category.slug}`} data-testid="breadcrumb-category">{category.name}</Link>
            </>
          )}
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="pdp-layout" data-testid={`pdp-${product.id}`}>
          <div className="pdp-image" aria-hidden data-testid="pdp-image">
            {product.image}
          </div>
          <div>
            <h1 className="pdp-title" data-testid="pdp-title">{product.name}</h1>
            <p className="pdp-price" data-testid="pdp-price">${product.price.toFixed(2)}</p>
            <p className="pdp-desc" data-testid="pdp-description">{product.description}</p>
            <div className="pdp-actions" data-testid="pdp-actions">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600 }}>Qty</span>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  data-testid="pdp-quantity"
                />
              </label>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAdd}
                data-testid="pdp-add-to-cart"
                style={{
                  padding: '12px 24px',
                  fontSize: 16,
                  background: added ? 'var(--success)' : undefined,
                }}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
            {added && (
              <Link to="/cart" style={{ display: 'inline-block', marginTop: 16, fontWeight: 600 }} data-testid="pdp-view-cart">
                View cart →
              </Link>
            )}
            <p style={{ marginTop: 24, fontSize: 13, color: 'var(--gray-500)' }}>
              Free delivery on orders over $45. Pick up in store available.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
