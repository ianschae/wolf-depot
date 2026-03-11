import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../api.js'
import { getOrders } from '../data/orders'

const ORDER_EMAIL_KEY = 'wolf-depot-order-email'

function normalize(order) {
  const num = order.order_number ?? order.orderNumber
  const date = order.created_at ?? order.date
  const total = order.total
  const itemCount = order.items?.length ?? order.item_count
  return { orderNumber: num, date, total, itemCount }
}

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const email = typeof localStorage !== 'undefined' ? localStorage.getItem(ORDER_EMAIL_KEY) : null
    fetchOrders(email || undefined)
      .then((list) => setOrders(list.map(normalize)))
      .catch(() => setOrders(getOrders().map(normalize)))
  }, [])

  return (
    <div className="main-content" data-testid="page-orders">
      <div className="container">
        <nav className="breadcrumb" data-testid="breadcrumb">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <span>/</span>
          <span>Order History</span>
        </nav>
        <h1 className="section-title" data-testid="page-title">Order History</h1>
        {orders.length === 0 ? (
          <p style={{ color: 'var(--gray-700)', marginBottom: 24 }}>
            No orders yet. Orders you place will appear here.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {orders.map((order) => (
              <li
                key={order.orderNumber}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                }}
                data-testid={`order-${order.orderNumber}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <strong>{order.orderNumber}</strong>
                  <span style={{ color: 'var(--gray-500)', fontSize: 14 }}>
                    {order.date ? new Date(order.date).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--gray-700)' }}>
                  {order.itemCount != null ? `${order.itemCount} item(s)` : ''} · ${order.total != null ? order.total.toFixed(2) : '—'}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 24 }}>
          <Link to="/" className="btn-primary" data-testid="link-back-home">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
