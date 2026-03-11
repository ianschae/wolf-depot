import { Link } from 'react-router-dom'

export default function Help() {
  return (
    <div className="main-content" data-testid="page-help">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Help</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Help &amp; Contact</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Get support with orders, returns, shipping, and more. This is a demo store — no real transactions.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
