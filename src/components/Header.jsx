import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header
      style={{
        background: 'var(--wolf-orange)',
        color: 'var(--wolf-white)',
        padding: '0.75rem 1.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span aria-hidden>🐺</span>
          Wolf Depot
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to="/products"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
              opacity: 0.95,
            }}
          >
            All Products
          </Link>
          <Link
            to="/cart"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius)',
            }}
          >
            🛒 Cart
            {totalItems > 0 && (
              <span
                style={{
                  background: 'var(--wolf-yellow)',
                  color: 'var(--wolf-black)',
                  borderRadius: '999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
