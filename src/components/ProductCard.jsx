import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article
      style={{
        background: 'var(--wolf-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{
          padding: '1.5rem',
          textDecoration: 'none',
          color: 'inherit',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '0.75rem',
            minHeight: 64,
          }}
          aria-hidden
        >
          {product.image}
        </div>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 600 }}>
          {product.name}
        </h3>
        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--wolf-orange)' }}>
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <div style={{ padding: '0 1rem 1rem' }}>
        <button
          type="button"
          onClick={() => addToCart(product)}
          style={{
            width: '100%',
            padding: '0.6rem',
            background: 'var(--wolf-orange)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
