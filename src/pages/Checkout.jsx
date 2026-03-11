import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { postOrder } from '../api.js'
import { addOrder } from '../data/orders'

const ORDER_EMAIL_KEY = 'wolf-depot-order-email'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)
  const [orderNumber] = useState(() => `WD-${Date.now().toString(36).toUpperCase()}`)
  const [errors, setErrors] = useState({})

  const [shipping, setShipping] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  })

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    billingSameAsShipping: true,
    billingAddress1: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  })

  const shippingCost = subtotal >= 45 ? 0 : 5.99
  const tax = Math.round((subtotal + shippingCost) * 0.08 * 100) / 100
  const total = subtotal + shippingCost + tax

  const updateShipping = (e) => {
    const { name, value } = e.target
    setShipping((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const updatePayment = (e) => {
    const { name, value } = e.target
    setPayment((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateShipping = () => {
    const next = {}
    if (!shipping.email.trim()) next.email = 'Required'
    if (!shipping.firstName.trim()) next.firstName = 'Required'
    if (!shipping.lastName.trim()) next.lastName = 'Required'
    if (!shipping.address1.trim()) next.address1 = 'Required'
    if (!shipping.city.trim()) next.city = 'Required'
    if (!shipping.state.trim()) next.state = 'Required'
    if (!shipping.zip.trim()) next.zip = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validatePayment = () => {
    const next = {}
    const digits = payment.cardNumber.replace(/\D/g, '')
    if (digits.length < 13) next.cardNumber = 'Enter a valid card number'
    if (!payment.expiry.trim()) next.expiry = 'Required'
    else if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim())) next.expiry = 'Use MM/YY'
    if (!payment.cvv.trim()) next.cvv = 'Required'
    else if (payment.cvv.length < 3) next.cvv = 'Invalid'
    if (!payment.nameOnCard.trim()) next.nameOnCard = 'Required'
    if (!payment.billingSameAsShipping) {
      if (!payment.billingAddress1.trim()) next.billingAddress1 = 'Required'
      if (!payment.billingCity.trim()) next.billingCity = 'Required'
      if (!payment.billingState.trim()) next.billingState = 'Required'
      if (!payment.billingZip.trim()) next.billingZip = 'Required'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 16)
    const parts = v.match(/.{1,4}/g) || []
    return parts.join(' ').trim()
  }

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4)
    if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setPayment((prev) => ({ ...prev, cardNumber: formatted }))
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: '' }))
  }

  const handleExpiryChange = (e) => {
    setPayment((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }))
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: '' }))
  }

  const handleNext = () => {
    if (step === 1 && !validateShipping()) return
    if (step === 2 && !validatePayment()) return
    setStep((s) => Math.min(3, s + 1))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    const orderPayload = { orderNumber, email: shipping.email, items: [...items], total }
    try {
      await postOrder(orderPayload)
      try { localStorage.setItem(ORDER_EMAIL_KEY, shipping.email) } catch (_) {}
    } catch {
      addOrder({
        orderNumber,
        date: new Date().toISOString(),
        items: [...items],
        email: shipping.email,
        total,
      })
    }
    clearCart()
    setPlaced(true)
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="main-content" data-testid="page-checkout">
        <div className="container">
          <div className="empty-cart" data-testid="checkout-empty">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn-primary" data-testid="checkout-empty-shop">Shop Products</Link>
          </div>
        </div>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="main-content" data-testid="page-checkout-success">
        <div className="container">
          <div className="checkout-success" data-testid="checkout-success">
            <div className="checkout-success-icon">✓</div>
            <h1 className="section-title" style={{ color: 'var(--success)', marginBottom: 8 }} data-testid="checkout-success-title">Order confirmed</h1>
            <p style={{ fontSize: 18, marginBottom: 8 }} data-testid="checkout-order-number">Order number: <strong>{orderNumber}</strong></p>
            <p style={{ color: 'var(--gray-700)', marginBottom: 32 }}>
              A confirmation email has been sent to {shipping.email}. This is a demo — no charge was made.
            </p>
            <Link to="/products" className="btn-primary" data-testid="checkout-success-continue">Continue shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content" data-testid="page-checkout">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <Link to="/cart" data-testid="breadcrumb-cart">Cart</Link>
          <span>/</span>
          <span>Checkout</span>
        </nav>

        <div className="checkout-header" data-testid="checkout-header">
          <h1 className="section-title" style={{ marginBottom: 0 }} data-testid="checkout-title">Checkout</h1>
          <div className="checkout-secure">
            <span className="checkout-lock" aria-hidden>🔒</span>
            Secure checkout
          </div>
        </div>

        <div className="checkout-steps" data-testid="checkout-steps">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`checkout-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}
            >
              <span className="checkout-step-num">{step > i + 1 ? '✓' : i + 1}</span>
              <span className="checkout-step-label">{label}</span>
              {i < STEPS.length - 1 && <span className="checkout-step-line" />}
            </div>
          ))}
        </div>

        <form onSubmit={step === 3 ? handlePlaceOrder : (e) => { e.preventDefault(); handleNext(); }} className="checkout-form" data-testid="checkout-form">
          <div className="checkout-main">
            {step === 1 && (
              <section className="checkout-section" data-testid="checkout-step-shipping">
                <h2>Shipping address</h2>
                <div className="form-grid">
                  <label className="form-field form-field-full">
                    <span>Email</span>
                    <input type="email" name="email" value={shipping.email} onChange={updateShipping} placeholder="you@example.com" data-testid="checkout-email" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </label>
                  <label className="form-field">
                    <span>First name</span>
                    <input type="text" name="firstName" value={shipping.firstName} onChange={updateShipping} data-testid="checkout-first-name" />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </label>
                  <label className="form-field">
                    <span>Last name</span>
                    <input type="text" name="lastName" value={shipping.lastName} onChange={updateShipping} data-testid="checkout-last-name" />
                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                  </label>
                  <label className="form-field form-field-full">
                    <span>Address</span>
                    <input type="text" name="address1" value={shipping.address1} onChange={updateShipping} placeholder="Street address" data-testid="checkout-address1" />
                    {errors.address1 && <span className="form-error">{errors.address1}</span>}
                  </label>
                  <label className="form-field form-field-full">
                    <span>Apartment, suite, etc. (optional)</span>
                    <input type="text" name="address2" value={shipping.address2} onChange={updateShipping} />
                  </label>
                  <label className="form-field">
                    <span>City</span>
                    <input type="text" name="city" value={shipping.city} onChange={updateShipping} data-testid="checkout-city" />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </label>
                  <label className="form-field">
                    <span>State</span>
                    <input type="text" name="state" value={shipping.state} onChange={updateShipping} placeholder="e.g. CA" data-testid="checkout-state" />
                    {errors.state && <span className="form-error">{errors.state}</span>}
                  </label>
                  <label className="form-field">
                    <span>ZIP code</span>
                    <input type="text" name="zip" value={shipping.zip} onChange={updateShipping} data-testid="checkout-zip" />
                    {errors.zip && <span className="form-error">{errors.zip}</span>}
                  </label>
                  <label className="form-field form-field-full">
                    <span>Phone (optional)</span>
                    <input type="tel" name="phone" value={shipping.phone} onChange={updateShipping} />
                  </label>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="checkout-section" data-testid="checkout-step-payment">
                <h2>Payment</h2>
                <p className="checkout-demo-note">Demo only — no real payment. Use any test values.</p>
                <div className="card-logos" aria-hidden>
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Amex</span>
                  <span>Discover</span>
                </div>
                <div className="form-grid">
                  <label className="form-field form-field-full">
                    <span>Card number</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={handleCardNumberChange}
                    />
                    {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                  </label>
                  <label className="form-field">
                    <span>Expiration (MM/YY)</span>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      value={payment.expiry}
                      onChange={handleExpiryChange}
                    />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </label>
                  <label className="form-field">
                    <span>CVV</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      maxLength={4}
                      value={payment.cvv}
                      onChange={(e) => { setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })); if (errors.cvv) setErrors((p) => ({ ...p, cvv: '' })); }}
                    />
                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                  </label>
                  <label className="form-field form-field-full">
                    <span>Name on card</span>
                    <input
                      type="text"
                      autoComplete="cc-name"
                      value={payment.nameOnCard}
                      onChange={updatePayment}
                      name="nameOnCard"
                    />
                    {errors.nameOnCard && <span className="form-error">{errors.nameOnCard}</span>}
                  </label>
                  <label className="form-field form-field-full checkbox-field">
                    <input
                      type="checkbox"
                      checked={payment.billingSameAsShipping}
                      onChange={(e) => setPayment((p) => ({ ...p, billingSameAsShipping: e.target.checked }))}
                    />
                    <span>Billing address same as shipping</span>
                  </label>
                  {!payment.billingSameAsShipping && (
                    <>
                      <label className="form-field form-field-full">
                        <span>Billing address</span>
                        <input type="text" name="billingAddress1" value={payment.billingAddress1} onChange={updatePayment} />
                        {errors.billingAddress1 && <span className="form-error">{errors.billingAddress1}</span>}
                      </label>
                      <label className="form-field">
                        <span>City</span>
                        <input type="text" name="billingCity" value={payment.billingCity} onChange={updatePayment} />
                        {errors.billingCity && <span className="form-error">{errors.billingCity}</span>}
                      </label>
                      <label className="form-field">
                        <span>State</span>
                        <input type="text" name="billingState" value={payment.billingState} onChange={updatePayment} />
                        {errors.billingState && <span className="form-error">{errors.billingState}</span>}
                      </label>
                      <label className="form-field">
                        <span>ZIP</span>
                        <input type="text" name="billingZip" value={payment.billingZip} onChange={updatePayment} />
                        {errors.billingZip && <span className="form-error">{errors.billingZip}</span>}
                      </label>
                    </>
                  )}
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="checkout-section">
                <h2>Review your order</h2>
                <div className="review-block">
                  <h3>Shipping to</h3>
                  <p>
                    {shipping.firstName} {shipping.lastName}<br />
                    {shipping.address1}
                    {shipping.address2 && <><br />{shipping.address2}</>}
                    <br />
                    {shipping.city}, {shipping.state} {shipping.zip}
                    {shipping.phone && <><br />{shipping.phone}</>}
                    <br />
                    {shipping.email}
                  </p>
                </div>
                <div className="review-block">
                  <h3>Payment</h3>
                  <p>
                    {payment.nameOnCard}<br />
                    Card ending in {payment.cardNumber.replace(/\s/g, '').slice(-4) || '****'}
                  </p>
                </div>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)} style={{ marginRight: 8 }}>
                  Edit shipping
                </button>
                <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                  Edit payment
                </button>
              </section>
            )}
          </div>

          <aside className="checkout-sidebar">
            <div className="order-summary" data-testid="checkout-order-summary">
              <h2>Order summary</h2>
              <ul className="order-summary-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} × {item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="order-summary-totals">
                <div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
                <div><span>Tax (est.)</span><span>${tax.toFixed(2)}</span></div>
                <div className="order-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              {subtotal < 45 && (
                <p className="free-shipping-note">Add ${(45 - subtotal).toFixed(2)} more for free shipping</p>
              )}

              {step < 3 ? (
                <button type="submit" className="btn-primary btn-block" data-testid="checkout-continue">
                  Continue to {step === 1 ? 'payment' : 'review'}
                </button>
              ) : (
                <button type="submit" className="btn-primary btn-block" data-testid="checkout-place-order">
                  Place order
                </button>
              )}
              {step > 1 && (
                <button type="button" className="btn-secondary btn-block" onClick={() => setStep(step - 1)} data-testid="checkout-back">
                  Back
                </button>
              )}
              <Link to="/cart" className="checkout-back-link" data-testid="checkout-back-to-cart">← Back to cart</Link>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}
