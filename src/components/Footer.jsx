import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-inner">
        <div className="footer-grid" data-testid="footer-grid">
          <div className="footer-col" data-testid="footer-customer-service">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/help" data-testid="footer-link-help">Help & Contact</Link></li>
              <li><Link to="/orders" data-testid="footer-link-order-status">Order Status</Link></li>
              <li><Link to="/help" data-testid="footer-link-returns">Returns & Exchanges</Link></li>
              <li><Link to="/help" data-testid="footer-link-shipping">Shipping & Delivery</Link></li>
            </ul>
          </div>
          <div className="footer-col" data-testid="footer-store-info">
            <h4>Store Information</h4>
            <ul>
              <li><Link to="/stores" data-testid="footer-link-store-finder">Store Finder</Link></li>
              <li><Link to="/weekly-ad" data-testid="footer-link-weekly-ad">Weekly Ad</Link></li>
              <li><Link to="/pro-center" data-testid="footer-link-pro-center">Pro Center</Link></li>
              <li><Link to="/gift-cards" data-testid="footer-link-gift-cards">Gift Cards</Link></li>
            </ul>
          </div>
          <div className="footer-col" data-testid="footer-about">
            <h4>About Wolf Depot</h4>
            <ul>
              <li><Link to="/about" data-testid="footer-link-about">About Us</Link></li>
              <li><Link to="/about" data-testid="footer-link-careers">Careers</Link></li>
              <li><Link to="/about" data-testid="footer-link-responsibility">Corporate Responsibility</Link></li>
              <li><Link to="/about" data-testid="footer-link-press">Press Room</Link></li>
            </ul>
          </div>
          <div className="footer-col" data-testid="footer-account">
            <h4>Account</h4>
            <ul>
              <li><Link to="/account" data-testid="footer-link-sign-in">Sign In</Link></li>
              <li><Link to="/account" data-testid="footer-link-order-history">Order History</Link></li>
              <li><Link to="/account" data-testid="footer-link-saved-items">Saved Items</Link></li>
              <li><Link to="/account" data-testid="footer-link-credit">Credit Services</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" data-testid="footer-bottom">
          <Link to="/" className="footer-logo" data-testid="footer-logo">Wolf Depot</Link>
          <p style={{ margin: '8px 0 0' }}>© {new Date().getFullYear()} Wolf Depot. Tools, Lumber &amp; Hardware — Demo store. No real transactions. Free delivery on orders $45+.</p>
        </div>
      </div>
    </footer>
  )
}
