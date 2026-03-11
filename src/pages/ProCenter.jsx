import { Link } from 'react-router-dom'

export default function ProCenter() {
  return (
    <div className="main-content" data-testid="page-pro-center">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Pro Center</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Pro Center</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Pro pricing and bulk orders. This is a demo store.
        </p>
        <Link to="/products" className="btn-primary" data-testid="link-to-products">Shop Products</Link>
      </div>
    </div>
  )
}
