import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import './ProductDetail.css';

export interface ProductDetailProps {
  onBackToHome?: () => void;
  onAddToCart: (product: { name: string; price: number; image: string }) => void;
}

const mainProductImage = '/images/img1.png';

export const ProductDetail: React.FC<ProductDetailProps> = ({
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'shipping' | 'reviews'>('description');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const product = {
    name: 'AIR FORCE 1 GOLD EDITION',
    brand: 'NIKE • HAXON EXCLUSIVE',
    price: 250.0,
    oldPrice: 290.0,
    rating: 5.0,
    reviewCount: 128,
    sku: 'HX-AF1-GLD-2026',
    inStock: true,
    description:
      'Engineered with premium full-grain leather, metallic gold foil swoosh overlays, and encapsulated Air-sole cushioning. The Air Force 1 Gold Edition blends heritage basketball style with modern street luxury.',
  };

  const handleAddToCart = () => {
    onAddToCart({
      name: product.name,
      price: product.price,
      image: mainProductImage,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="pdp-wrapper">
      <div className="pdp-container">
        {/* Main Product Layout (2 Columns) */}
        <div className="pdp-main-grid">
          {/* Left Column: Single Product Photo */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-wrap">
              <span className="pdp-badge-pill new">LIMITED DROP</span>
              <span className="pdp-badge-pill discount">-14% OFF</span>
              <img
                src={mainProductImage}
                alt={product.name}
                className="pdp-main-img"
              />
              <button
                type="button"
                className={`pdp-heart-floating ${isWishlist ? 'active' : ''}`}
                onClick={() => setIsWishlist(!isWishlist)}
                aria-label="Add to Wishlist"
              >
                <Heart
                  size={20}
                  fill={isWishlist ? '#d31018' : 'transparent'}
                  stroke={isWishlist ? '#d31018' : '#111111'}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Actions */}
          <div className="pdp-info-col">
            <div className="pdp-brand-tag">{product.brand}</div>
            <h1 className="pdp-title">{product.name}</h1>

            {/* Rating & Reviews Bar */}
            <div className="pdp-rating-row">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>
              <span className="pdp-rating-score">{product.rating.toFixed(1)}</span>
              <span className="pdp-review-count">({product.reviewCount} verified reviews)</span>
              <span className="pdp-stock-status">In Stock (Fast Shipping)</span>
            </div>

            {/* Price Block */}
            <div className="pdp-price-card">
              <div className="pdp-price-row">
                <span className="pdp-price-current">${product.price.toFixed(2)}</span>
                <span className="pdp-price-old">${product.oldPrice?.toFixed(2)}</span>
                <span className="pdp-save-tag">SAVE ${(product.oldPrice! - product.price).toFixed(0)}</span>
              </div>
              <p className="pdp-vat-note">Tax included. Free express shipping on orders over $150.</p>
            </div>

            {/* Size Guide Button Option */}
            <div className="pdp-option-section">
              <button
                type="button"
                className="size-guide-trigger"
                onClick={() => setShowSizeGuide(true)}
              >
                <Ruler size={16} />
                <span>View Size Guide</span>
              </button>
            </div>

            {/* Quantity & CTA Buttons Bar */}
            <div className="pdp-action-block">
              <div className="qty-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`pdp-add-cart-btn ${addedSuccess ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>ADD TO CART • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust & Guarantee Badges Row */}
            <div className="pdp-trust-grid">
              <div className="trust-item">
                <Truck size={20} className="trust-icon" />
                <div className="trust-text">
                  <span className="trust-title">Free Express Shipping</span>
                  <span className="trust-desc">Delivered in 2–4 business days</span>
                </div>
              </div>
              <div className="trust-item">
                <ShieldCheck size={20} className="trust-icon" />
                <div className="trust-text">
                  <span className="trust-title">100% Authentic Guaranteed</span>
                  <span className="trust-desc">Verified by HAXON experts</span>
                </div>
              </div>
              <div className="trust-item">
                <RotateCcw size={20} className="trust-icon" />
                <div className="trust-text">
                  <span className="trust-title">30-Day Hassle-Free Returns</span>
                  <span className="trust-desc">Easy exchange or full refund</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details & Specs Section */}
        <div className="pdp-tabs-section">
          <div className="pdp-tabs-header">
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description & Story
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications & Materials
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>The Iconic Air Force 1, Re-Imagined</h3>
                <p>
                  Originally debuted in 1982 as a basketball staple, the Air Force 1 has defined streetwear culture for over four decades. This Gold Edition elevates the silhouette with ultra-soft full-grain tumbled leather and handcrafted metallic swoosh accents.
                </p>
                <p>
                  Equipped with lightweight Nike Air cushioning in the heel, padded ankle collar, and non-marking rubber outsole with pivot circles for maximum traction and classic style.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-pane">
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Upper Material</td>
                      <td>Premium Tumbled Full-Grain Leather & Gold Foil Accents</td>
                    </tr>
                    <tr>
                      <td>Cushioning</td>
                      <td>Encapsulated Nike Air Sole Unit</td>
                    </tr>
                    <tr>
                      <td>Outsole</td>
                      <td>Durable Non-Marking Rubber with Pivot Rings</td>
                    </tr>
                    <tr>
                      <td>Closure</td>
                      <td>Lace-up with Gold Metallic Dubrae</td>
                    </tr>
                    <tr>
                      <td>Style Code</td>
                      <td>HX-AF1-GLD-2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane">
                <p>
                  <strong>Express Shipping:</strong> Orders placed before 2 PM EST are dispatched same-day via DHL Express or FedEx. Tracking details are provided instantly via email and SMS.
                </p>
                <p>
                  <strong>Returns:</strong> We accept returns within 30 days of delivery. Items must be unworn in original packaging with all tags intact.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <div className="reviews-summary-box">
                  <div className="rev-big-score">5.0</div>
                  <div className="rev-stars-col">
                    <div className="pdp-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>
                    <span>Based on 128 verified purchases</span>
                  </div>
                </div>

                <div className="sample-reviews-list">
                  <div className="sample-review-card">
                    <div className="rev-author-bar">
                      <strong>Marcus V.</strong>
                      <span className="verified-badge">✓ Verified Buyer</span>
                    </div>
                    <p className="rev-text">
                      "Absolutly stunning quality. Leather feels supple right out of the box and the gold accents give it such a premium luxury vibe."
                    </p>
                  </div>
                  <div className="sample-review-card">
                    <div className="rev-author-bar">
                      <strong>Sophia R.</strong>
                      <span className="verified-badge">✓ Verified Buyer</span>
                    </div>
                    <p className="rev-text">
                      "Fast delivery in 2 days to NYC. True to size and super comfortable!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Popup: Size Guide */}
      {showSizeGuide && (
        <div className="modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>HAXON SNEAKER SIZE GUIDE</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowSizeGuide(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <table className="size-guide-table">
                <thead>
                  <tr>
                    <th>US Men</th>
                    <th>US Women</th>
                    <th>EU Size</th>
                    <th>CM Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>7.5</td><td>9.0</td><td>40.5</td><td>25.5 cm</td></tr>
                  <tr><td>8.0</td><td>9.5</td><td>41.0</td><td>26.0 cm</td></tr>
                  <tr><td>8.5</td><td>10.0</td><td>42.0</td><td>26.5 cm</td></tr>
                  <tr><td>9.0</td><td>10.5</td><td>42.5</td><td>27.0 cm</td></tr>
                  <tr><td>9.5</td><td>11.0</td><td>43.0</td><td>27.5 cm</td></tr>
                  <tr><td>10.0</td><td>11.5</td><td>44.0</td><td>28.0 cm</td></tr>
                  <tr><td>10.5</td><td>12.0</td><td>44.5</td><td>28.5 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
