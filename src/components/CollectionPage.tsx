import React, { useState, useMemo } from 'react';
import {
  X,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Check,
  Star,
} from 'lucide-react';
import './CollectionPage.css';

export interface CatalogProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sizes: string;
  image: string;
  badge?: string;
  badgeType?: 'new' | 'discount' | 'hot';
}

const catalogProducts: CatalogProduct[] = [
  {
    id: 'prod-1',
    name: 'ON CLOUDMONSTER STEALTH',
    brand: 'On Running',
    category: 'Running',
    subtitle: 'Performance Running',
    price: 180.0,
    rating: 4.9,
    sizes: '40–46',
    image: '/images/products/cloudmonster.jpg',
    badge: 'NEW',
    badgeType: 'new',
  },
  {
    id: 'prod-2',
    name: 'NIKE AIR FORCE 1 SUEDE',
    brand: 'Nike',
    category: 'Men',
    subtitle: 'Classic Lifestyle',
    price: 120.0,
    rating: 4.8,
    sizes: '39–45',
    image: '/images/products/af1_suede.jpg',
  },
  {
    id: 'prod-3',
    name: 'AIR JORDAN 1 LOW DENIM',
    brand: 'Jordan',
    category: 'Men',
    subtitle: 'Heritage Basketball',
    price: 145.0,
    oldPrice: 165.0,
    rating: 4.9,
    sizes: '40–46',
    image: '/images/products/jordan1_denim.jpg',
    badge: '-12%',
    badgeType: 'discount',
  },
  {
    id: 'prod-4',
    name: 'ON CLOUDTILT ALL WHITE',
    brand: 'On Running',
    category: 'Casual',
    subtitle: 'Daily Comfort',
    price: 160.0,
    rating: 4.7,
    sizes: '39–45',
    image: '/images/products/cloudtilt.jpg',
    badge: 'HOT',
    badgeType: 'hot',
  },
  {
    id: 'prod-5',
    name: 'NEW BALANCE 9060 OLIVE',
    brand: 'New Balance',
    category: 'Men',
    subtitle: 'Retro Lifestyle',
    price: 150.0,
    rating: 4.8,
    sizes: '40–46',
    image: '/images/products/nb9060_olive.jpg',
  },
  {
    id: 'prod-6',
    name: 'NIKE DUNK LOW FOREST',
    brand: 'Nike',
    category: 'Men',
    subtitle: 'Streetwear Classic',
    price: 115.0,
    rating: 4.8,
    sizes: '38–45',
    image: '/images/products/dunk_green.jpg',
  },
  {
    id: 'prod-7',
    name: 'ADIZERO SL SPEED',
    brand: 'Adidas',
    category: 'Running',
    subtitle: 'Marathon Trainer',
    price: 220.0,
    rating: 4.9,
    sizes: '41–46',
    image: '/images/img2.png',
  },
  {
    id: 'prod-8',
    name: 'AIR FORCE 1 GOLD EDITION',
    brand: 'Nike',
    category: 'Men',
    subtitle: 'Limited Edition',
    price: 250.0,
    rating: 5.0,
    sizes: '40–45',
    image: '/images/img1.png',
    badge: 'NEW',
    badgeType: 'new',
  },
  {
    id: 'prod-9',
    name: 'CROCS ECHO CLOG BLACK',
    brand: 'Crocs',
    category: 'Crocs',
    subtitle: 'Street Foam Clog',
    price: 80.0,
    rating: 4.7,
    sizes: '39–45',
    image: '/images/categories/crocs.jpg',
  },
  {
    id: 'prod-10',
    name: 'ASICS GEL-KAYANO 30',
    brand: 'Asics',
    category: 'Running',
    subtitle: 'Stability Running',
    price: 160.0,
    rating: 4.9,
    sizes: '40–46',
    image: '/images/categories/running.jpg',
    badge: 'NEW',
    badgeType: 'new',
  },
  {
    id: 'prod-11',
    name: 'YEEZY SLIDE ONYX',
    brand: 'Adidas',
    category: 'Slides',
    subtitle: 'Minimalist Comfort',
    price: 110.0,
    rating: 4.8,
    sizes: '38–45',
    image: '/images/categories/slides.jpg',
  },
  {
    id: 'prod-12',
    name: 'NIKE AIR MAX PLUS KIDS',
    brand: 'Nike',
    category: 'Kids',
    subtitle: 'Youth Lifestyle',
    price: 135.0,
    rating: 4.7,
    sizes: '34–39',
    image: '/images/categories/kids.jpg',
  },
];

const categoryOptions = ['All', 'Men', 'Kids', 'Running', 'Casual', 'Slides', 'Crocs'];
const brandOptions = ['All', 'Nike', 'Jordan', 'On Running', 'New Balance', 'Adidas', 'Crocs', 'Asics'];

export interface CollectionPageProps {
  onBackToHome?: () => void;
  onAddToCart: (product: { name: string; price: number; image: string }) => void;
  onOpenProductPage: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onAddToCart,
  onOpenProductPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...catalogProducts];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedBrand, sortBy]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCartClick = (product: CatalogProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'All' || selectedBrand !== 'All' || sortBy !== 'featured';

  return (
    <div className="collection-wrapper">
      {/* 100% Full-Width Seamless Hero Banner Section */}
      <div className="collection-hero-fullwidth">
        <div className="hero-fullwidth-inner">
          <h1 className="collection-simple-title">
            EXPLORE OUR <br />
            <span className="red-accent">CURATED SELECTION</span>
          </h1>
          <p className="collection-subtext">
            Discover 100% authentic footwear, limited releases & signature drops.
          </p>
          <div className="collection-breadcrumbs-row">
            <span className="collection-breadcrumb">Home / Collections</span>
          </div>
        </div>
      </div>

      <div className="collection-container">

        {/* Toolbar Bar: Mobile Filter Toggle + Sorting */}
        <div className="collection-toolbar">
          <button
            type="button"
            className="mobile-filter-trigger"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters ({selectedCategory !== 'All' ? 1 : 0} + {selectedBrand !== 'All' ? 1 : 0})</span>
          </button>

          {/* Active Filter Pills */}
          <div className="active-pills-row">
            {selectedCategory !== 'All' && (
              <span className="filter-pill">
                Category: {selectedCategory}
                <X size={12} className="pill-remove" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="filter-pill">
                Brand: {selectedBrand}
                <X size={12} className="pill-remove" onClick={() => setSelectedBrand('All')} />
              </span>
            )}
            {isFiltered && (
              <button type="button" className="clear-all-link" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrap">
            <label htmlFor="sort-select" className="sort-label">Sort By:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Mobile View Filter Dropdowns Row */}
        <div className="mobile-filter-dropdowns-row">
          <div className="mobile-dropdown-field">
            <label htmlFor="cat-select" className="mobile-dropdown-label">Category:</label>
            <select
              id="cat-select"
              className="mobile-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mobile-dropdown-field">
            <label htmlFor="brand-select" className="mobile-dropdown-label">Brand:</label>
            <select
              id="brand-select"
              className="mobile-filter-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brandOptions.map((b) => (
                <option key={b} value={b}>
                  {b === 'All' ? 'All Brands' : b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="collection-main-layout">
          {/* Left Sidebar Filter Panel */}
          <aside className={`filter-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header-mobile">
              <h3>Filter Products</h3>
              <button
                type="button"
                className="close-sidebar-btn"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Group: Category */}
            <div className="filter-group">
              <h4 className="filter-group-title">CATEGORIES</h4>
              <div className="filter-options-list">
                {categoryOptions.map((cat) => (
                  <label key={cat} className="filter-checkbox-label">
                    <input
                      type="radio"
                      name="category-radio"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className="radio-custom"></span>
                    <span className="option-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Brand */}
            <div className="filter-group">
              <h4 className="filter-group-title">BRANDS</h4>
              <div className="filter-options-list">
                {brandOptions.map((brand) => (
                  <label key={brand} className="filter-checkbox-label">
                    <input
                      type="radio"
                      name="brand-radio"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                    />
                    <span className="radio-custom"></span>
                    <span className="option-text">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {isFiltered && (
              <button
                type="button"
                className="sidebar-reset-btn"
                onClick={clearAllFilters}
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Right Product Cards Grid (Matching Homepage Card Design Exactly) */}
          <main className="collection-products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products-box">
                <h3>No Sneakers Found</h3>
                <p>Try resetting your filters or selecting a different category.</p>
                <button type="button" className="reset-search-btn" onClick={clearAllFilters}>
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isLiked = !!wishlist[product.id];
                const isAdded = !!addedItems[product.id];

                return (
                  <div
                    key={product.id}
                    className="product-card-ref"
                    onClick={() => onOpenProductPage()}
                  >
                    {/* Top Row: Badge & Wishlist Heart */}
                    <div className="card-top-bar">
                      {product.badge ? (
                        <span className={`card-badge-pill ${product.badgeType || 'new'}`}>
                          {product.badge}
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        className={`card-heart-btn ${isLiked ? 'active' : ''}`}
                        onClick={(e) => toggleWishlist(product.id, e)}
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          size={17}
                          className="heart-icon"
                          fill={isLiked ? '#d31018' : 'transparent'}
                          stroke={isLiked ? '#d31018' : '#717680'}
                        />
                      </button>
                    </div>

                    {/* Image Area */}
                    <div className="card-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-product-img"
                        loading="lazy"
                      />

                      {/* Quick Add Button overlay */}
                      <button
                        type="button"
                        className={`card-add-btn ${isAdded ? 'added' : ''}`}
                        onClick={(e) => handleAddToCartClick(product, e)}
                      >
                        {isAdded ? (
                          <>
                            <Check size={13} />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={13} />
                            <span>+ ADD</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="card-content-block">
                      <h3 className="card-product-name">{product.name}</h3>
                      <p className="card-product-subtitle">{product.subtitle}</p>

                      {/* Bottom Row: Price, Rating, Sizes */}
                      <div className="card-bottom-row">
                        <div className="card-price-block">
                          <span className="card-price-main">${product.price.toFixed(0)}</span>
                          {product.oldPrice && (
                            <span className="card-price-old">${product.oldPrice.toFixed(0)}</span>
                          )}
                        </div>

                        <div className="card-rating-badge">
                          <Star size={12} className="star-filled" fill="#f59e0b" stroke="#f59e0b" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>

                        <span className="card-sizes-tag">{product.sizes}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
