import { memo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = memo(({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <span className="no-products-icon">📦</span>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
});

export default ProductList;