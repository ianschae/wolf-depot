import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, totalItems, subtotal, removeFromCart, setQty, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="main-content" data-testid="page-cart">
        <div className="container">
          <div className="empty-cart" data-testid="cart-empty">
            <p data-testid="cart-empty-message">Your cart is empty.</p>
            <Link to="/products" className="btn-primary" data-testid="cart-empty-shop">Shop Products</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content" data-testid="page-cart">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Cart</span>
        </nav>

        <h1 className="section-title" style={{ marginBottom: 24 }} data-testid="cart-title">Shopping Cart</h1>

        <div className="cart-table-wrap" data-testid="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-row" data-testid={`cart-item-${item.id}`}>
              <div className="cart-item-image" aria-hidden>{item.image}</div>
              <div className="cart-item-name">
                <Link to={`/product/${item.id}`} data-testid={`cart-item-name-${item.id}`}>{item.name}</Link>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="cart-item-qty">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Math.max(1, Number(e.target.value) || 1))}
                  data-testid={`cart-item-qty-${item.id}`}
                  style={{
                    width: 56,
                    padding: '6px 10px',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    fontSize: 14,
                  }}
                />
              </div>
              <div className="cart-item-total" style={{ fontWeight: 700, fontSize: 16 }} data-testid={`cart-item-total-${item.id}`}>
                ${(item.price * item.qty).toFixed(2)}
              </div>
              <div className="cart-item-remove">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  data-testid={`cart-item-remove-${item.id}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gray-500)',
                    fontSize: 13,
                    textDecoration: 'underline',
                    padding: 4,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total-row" data-testid="cart-subtotal-row">
            <span className="cart-total-label">Subtotal ({totalItems} items)</span>
            <span className="cart-total-value" data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-total-row" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <Link to="/products" style={{ color: 'var(--gray-700)' }} data-testid="cart-continue-shopping">← Continue shopping</Link>
            <div className="cart-actions" data-testid="cart-actions">
              <button type="button" className="btn-secondary" onClick={clearCart} data-testid="cart-clear">Clear cart</button>
              <Link to="/checkout" className="btn-primary" style={{ padding: '12px 28px' }} data-testid="cart-checkout">Checkout</Link>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 16 }}>
          This is a demo store. Checkout does not process real payments.
        </p>
      </div>
    </div>
  )
}
