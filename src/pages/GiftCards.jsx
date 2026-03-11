import { Link } from 'react-router-dom'

export default function GiftCards() {
  return (
    <div className="main-content" data-testid="page-gift-cards">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Gift Cards</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Gift Cards</h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
          Wolf Depot gift cards. This is a demo store — no real gift cards.
        </p>
        <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
      </div>
    </div>
  )
}
