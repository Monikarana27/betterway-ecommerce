import { categories } from '../../data/products';
import './Filters.css';

function Filters({ filters, onFilterChange }) {
  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (field, value) => {
    onFilterChange({ ...filters, [field]: Number(value) });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const resetFilters = () => {
    onFilterChange({
      category: 'all',
      minPrice: 0,
      maxPrice: 500,
      minRating: 0
    });
  };

  return (
    <aside className="filters">
      <div className="filters-header">
        <h2>Filters</h2>
        <button onClick={resetFilters} className="reset-btn">Reset</button>
      </div>

      {/* Categories */}
      <div className="filter-section">
        <h3>Category</h3>
        {categories.map(cat => (
          <label key={cat.value} className="filter-option">
            <input
              type="radio"
              name="category"
              checked={filters.category === cat.value}
              onChange={() => handleCategoryChange(cat.value)}
            />
            <span>{cat.label}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
          />
        </div>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
          className="price-slider"
        />
        <div className="price-labels">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="filter-section">
        <h3>Minimum Rating</h3>
        {[4, 3, 2, 1, 0].map(rating => (
          <label key={rating} className="filter-option">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === rating}
              onChange={() => handleRatingChange(rating)}
            />
            <span>
              {'⭐'.repeat(rating || 1)} {rating > 0 ? `& Up` : 'All'}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}

export default Filters;