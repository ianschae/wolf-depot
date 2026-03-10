import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card" data-testid={`product-card-${product.id}`}>
      <Link to={`/product/${product.id}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }} data-testid={`product-card-link-${product.id}`}>
        <div className="product-card-image" aria-hidden data-testid={`product-card-image-${product.id}`}>
          {product.image}
        </div>
        <div className="product-card-body">
          <h3>
            <Link to={`/product/${product.id}`} className="product-card-title" data-testid={`product-card-title-${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="product-card-price" data-testid={`product-card-price-${product.id}`}>${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div style={{ padding: '0 16px 16px' }}>
        <button
          type="button"
          className="btn-add-cart"
          onClick={() => addToCart(product)}
          data-testid={`product-card-add-to-cart-${product.id}`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
