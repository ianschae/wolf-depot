import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, totalItems, subtotal, removeFromCart, setQty, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your cart is empty.</p>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.25rem',
            background: 'var(--wolf-orange)',
            color: 'white',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Shop products
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Shopping cart</h1>

      <div
        style={{
          background: 'var(--wolf-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto auto',
                gap: '1rem',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--wolf-gray-100)',
              }}
            >
              <span style={{ fontSize: '2rem' }} aria-hidden>{item.image}</span>
              <div>
                <Link to={`/product/${item.id}`} style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                  {item.name}
                </Link>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--wolf-orange)', fontWeight: 600 }}>
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Number(e.target.value) || 1)}
                  style={{
                    width: 52,
                    padding: '0.35rem',
                    border: '1px solid var(--wolf-gray-400)',
                    borderRadius: 'var(--radius)',
                  }}
                />
              </label>
              <span style={{ fontWeight: 700, minWidth: 70, textAlign: 'right' }}>
                ${(item.price * item.qty).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--wolf-gray-700)',
                  padding: '0.25rem',
                  fontSize: '0.9rem',
                  textDecoration: 'underline',
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--wolf-gray-100)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <strong style={{ fontSize: '1.1rem' }}>Subtotal ({totalItems} items):</strong>
            <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', color: 'var(--wolf-orange)' }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={clearCart}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid var(--wolf-gray-700)',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                color: 'var(--wolf-gray-700)',
              }}
            >
              Clear cart
            </button>
            <button
              type="button"
              style={{
                padding: '0.6rem 1.25rem',
                background: 'var(--wolf-orange)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
              }}
            >
              Checkout (demo)
            </button>
          </div>
        </div>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--wolf-gray-700)' }}>
        This is a demo store. Checkout does not process real payments.
      </p>

      <Link to="/products" style={{ display: 'inline-block', marginTop: '0.5rem', fontWeight: 600 }}>
        ← Continue shopping
      </Link>
    </div>
  )
}
