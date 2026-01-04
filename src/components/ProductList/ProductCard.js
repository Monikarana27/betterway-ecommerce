import { memo } from 'react';
import './ProductCard.css';

const ProductCard = memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      
      <div className="product-info">
        <h3>{product.name}</h3>
        
        <div className="product-rating">
          {'⭐'.repeat(Math.floor(product.rating))}
          <span>({product.rating})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>

        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">✓ In Stock ({product.stock})</span>
          ) : (
            <span className="out-of-stock">✗ Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;