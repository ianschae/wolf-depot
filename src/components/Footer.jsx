import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/">Help & Contact</Link></li>
              <li><Link to="/">Order Status</Link></li>
              <li><Link to="/">Returns & Exchanges</Link></li>
              <li><Link to="/">Shipping & Delivery</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Store Information</h4>
            <ul>
              <li><Link to="/">Store Finder</Link></li>
              <li><Link to="/">Weekly Ad</Link></li>
              <li><Link to="/">Pro Center</Link></li>
              <li><Link to="/">Gift Cards</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About Wolf Depot</h4>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Corporate Responsibility</Link></li>
              <li><Link to="/">Press Room</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li><Link to="/">Sign In</Link></li>
              <li><Link to="/">Order History</Link></li>
              <li><Link to="/">Saved Items</Link></li>
              <li><Link to="/">Credit Services</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <Link to="/" className="footer-logo">Wolf Depot</Link>
          <p style={{ margin: '8px 0 0' }}>Tools, Lumber &amp; Hardware — Demo store. No real transactions.</p>
        </div>
      </div>
    </footer>
  )
}
