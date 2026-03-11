import { Link } from 'react-router-dom'

export default function Stores() {
  return (
    <div className="main-content" data-testid="page-stores">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Store Finder</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Store Finder</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Find a Wolf Depot store near you. This is a demo store — locations are not real.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
