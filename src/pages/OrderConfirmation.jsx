import { Link, useLocation, Navigate } from 'react-router-dom'

export default function OrderConfirmation() {
  const { state } = useLocation()

  if (!state?.orderNumber) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="order-confirm">
          <div className="order-confirm-icon">✅</div>
          <h1>Order Placed!</h1>
          <p className="order-confirm-num">Order #{state.orderNumber}</p>
          <p>A confirmation will be sent to <strong>{state.email}</strong>.</p>
          <p className="order-confirm-note">This is a demo store. No real order was placed.</p>
          <div className="order-confirm-actions">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
