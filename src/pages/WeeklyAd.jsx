import { Link } from 'react-router-dom'

export default function WeeklyAd() {
  return (
    <div className="main-content" data-testid="page-weekly-ad">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Weekly Ad</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Weekly Ad</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          This week&apos;s deals and promotions.
        </p>
        <Link to="/products" className="btn-primary" data-testid="link-to-products">Shop All Products</Link>
      </div>
    </div>
  )
}
