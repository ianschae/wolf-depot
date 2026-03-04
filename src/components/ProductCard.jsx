import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="product-card-image" aria-hidden>
          {product.image}
        </div>
        <div className="product-card-body">
          <h3>
            <Link to={`/product/${product.id}`} className="product-card-title">
              {product.name}
            </Link>
          </h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div style={{ padding: '0 16px 16px' }}>
        <button
          type="button"
          className="btn-add-cart"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
