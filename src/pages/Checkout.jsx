import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const STEPS = ['Shipping', 'Payment', 'Review']

const initialShipping = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
}

const initialPayment = {
  nameOnCard: '', cardNumber: '', expiry: '', cvv: '',
}

export default function Checkout() {
  const { items, subtotal, totalItems, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState(initialShipping)
  const [payment, setPayment] = useState(initialPayment)
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <div className="main-content">
        <div className="container" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>Your cart is empty.</p>
          <Link to="/products" className="btn-primary">Shop Products</Link>
        </div>
      </div>
    )
  }

  const shippingCost = subtotal >= 45 ? 0 : 6.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const validateShipping = () => {
    const e = {}
    if (!shipping.firstName.trim()) e.firstName = 'Required'
    if (!shipping.lastName.trim()) e.lastName = 'Required'
    if (!shipping.email.trim()) e.email = 'Required'
    if (!shipping.address.trim()) e.address = 'Required'
    if (!shipping.city.trim()) e.city = 'Required'
    if (!shipping.state.trim()) e.state = 'Required'
    if (!shipping.zip.trim()) e.zip = 'Required'
    return e
  }

  const validatePayment = () => {
    const e = {}
    if (!payment.nameOnCard.trim()) e.nameOnCard = 'Required'
    if (!payment.cardNumber.trim()) e.cardNumber = 'Required'
    if (!payment.expiry.trim()) e.expiry = 'Required'
    if (!payment.cvv.trim()) e.cvv = 'Required'
    return e
  }

  const handleNext = () => {
    const e = step === 0 ? validateShipping() : step === 1 ? validatePayment() : {}
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep(s => s + 1)
  }

  const handlePlaceOrder = () => {
    const orderNumber = 'WD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    clearCart()
    navigate('/order-confirmation', { state: { orderNumber, email: shipping.email } })
  }

  return (
    <div className="main-content">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span>Checkout</span>
        </nav>

        <h1 className="section-title" style={{ marginBottom: 24 }}>Checkout</h1>

        <div className="checkout-stepper">
          {STEPS.map((label, i) => (
            <div key={label} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="checkout-step-num">{i < step ? '✓' : i + 1}</div>
              <span className="checkout-step-label">{label}</span>
              {i < STEPS.length - 1 && <div className="checkout-step-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-wrap">
            {step === 0 && <ShippingForm shipping={shipping} setShipping={setShipping} errors={errors} />}
            {step === 1 && <PaymentForm payment={payment} setPayment={setPayment} errors={errors} />}
            {step === 2 && <ReviewStep shipping={shipping} payment={payment} />}

            <div className="checkout-nav">
              {step > 0 && (
                <button type="button" className="btn-secondary" onClick={() => setStep(s => s - 1)}>
                  ← Back
                </button>
              )}
              {step < 2 ? (
                <button type="button" className="btn-primary checkout-nav-cta" onClick={handleNext}>
                  Continue →
                </button>
              ) : (
                <button type="button" className="btn-primary checkout-nav-cta checkout-nav-place" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              )}
            </div>
          </div>

          <aside className="checkout-summary">
            <h3 className="checkout-summary-title">Order Summary</h3>
            {items.map(item => (
              <div key={item.id} className="checkout-summary-item">
                <span className="checkout-summary-item-img">{item.image}</span>
                <span className="checkout-summary-item-name">{item.name}</span>
                <span className="checkout-summary-item-qty">×{item.qty}</span>
                <span className="checkout-summary-item-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="checkout-summary-line">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-line">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? 'checkout-summary-free' : ''}>
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="checkout-summary-line">
              <span>Est. tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {shippingCost > 0 && (
              <p className="checkout-summary-shipping-note">
                Add ${(45 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

function ShippingForm({ shipping, setShipping, errors }) {
  const set = (key) => (e) => setShipping(s => ({ ...s, [key]: e.target.value }))
  return (
    <div>
      <h2 className="checkout-section-title">Shipping Information</h2>
      <div className="form-row">
        <Field label="First Name" error={errors.firstName}>
          <input className="form-input" value={shipping.firstName} onChange={set('firstName')} autoComplete="given-name" />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input className="form-input" value={shipping.lastName} onChange={set('lastName')} autoComplete="family-name" />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Email" error={errors.email}>
          <input className="form-input" type="email" value={shipping.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field label="Phone (optional)">
          <input className="form-input" type="tel" value={shipping.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
      </div>
      <Field label="Address" error={errors.address}>
        <input className="form-input" value={shipping.address} onChange={set('address')} placeholder="Street address" autoComplete="street-address" />
      </Field>
      <div className="form-row form-row-3">
        <Field label="City" error={errors.city}>
          <input className="form-input" value={shipping.city} onChange={set('city')} autoComplete="address-level2" />
        </Field>
        <Field label="State" error={errors.state}>
          <input className="form-input" value={shipping.state} onChange={set('state')} maxLength={2} style={{ textTransform: 'uppercase' }} autoComplete="address-level1" />
        </Field>
        <Field label="ZIP" error={errors.zip}>
          <input className="form-input" value={shipping.zip} onChange={set('zip')} maxLength={10} autoComplete="postal-code" />
        </Field>
      </div>
    </div>
  )
}

function PaymentForm({ payment, setPayment, errors }) {
  const set = (key) => (e) => setPayment(p => ({ ...p, [key]: e.target.value }))
  return (
    <div>
      <h2 className="checkout-section-title">Payment Information</h2>
      <p className="checkout-demo-note">
        This is a demo store — no real payment is processed. Enter any values.
      </p>
      <Field label="Name on Card" error={errors.nameOnCard}>
        <input className="form-input" value={payment.nameOnCard} onChange={set('nameOnCard')} autoComplete="cc-name" />
      </Field>
      <Field label="Card Number" error={errors.cardNumber}>
        <input className="form-input" value={payment.cardNumber} onChange={set('cardNumber')} placeholder="**** **** **** ****" maxLength={19} autoComplete="cc-number" />
      </Field>
      <div className="form-row">
        <Field label="Expiry (MM/YY)" error={errors.expiry}>
          <input className="form-input" value={payment.expiry} onChange={set('expiry')} placeholder="MM/YY" maxLength={5} autoComplete="cc-exp" />
        </Field>
        <Field label="CVV" error={errors.cvv}>
          <input className="form-input" value={payment.cvv} onChange={set('cvv')} placeholder="***" maxLength={4} autoComplete="cc-csc" />
        </Field>
      </div>
    </div>
  )
}

function ReviewStep({ shipping, payment }) {
  const lastFour = payment.cardNumber.replace(/\s/g, '').slice(-4)
  const maskedCard = lastFour ? `**** **** **** ${lastFour}` : '—'
  return (
    <div>
      <h2 className="checkout-section-title">Review Your Order</h2>
      <div className="review-section">
        <h4>Ship to</h4>
        <p>{shipping.firstName} {shipping.lastName}</p>
        <p>{shipping.address}</p>
        <p>{shipping.city}, {shipping.state.toUpperCase()} {shipping.zip}</p>
        <p>{shipping.email}</p>
        {shipping.phone && <p>{shipping.phone}</p>}
      </div>
      <div className="review-section">
        <h4>Payment</h4>
        <p>{maskedCard}</p>
        <p>{payment.nameOnCard}</p>
      </div>
    </div>
  )
}
