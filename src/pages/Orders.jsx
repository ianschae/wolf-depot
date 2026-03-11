import { Link } from 'react-router-dom'

export default function Orders() {
  return (
    <div className="main-content" data-testid="page-orders">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Track Order</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Track Order</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Check your order status. This is a demo store — no real orders.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
