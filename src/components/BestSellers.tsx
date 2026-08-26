import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Heart, ShoppingBag, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './BestSellers.css';

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sizes: string;
  image: string;
  badge?: string;
  badgeType?: 'new' | 'discount' | 'hot';
}

const bestSellersData: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'ON CLOUDMONSTER STEALTH',
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
    subtitle: 'Classic Lifestyle',
    price: 120.0,
    rating: 4.8,
    sizes: '39–45',
    image: '/images/products/af1_suede.jpg',
  },
  {
    id: 'prod-3',
    name: 'AIR JORDAN 1 LOW DENIM',
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
    subtitle: 'Retro Lifestyle',
    price: 150.0,
    rating: 4.8,
    sizes: '40–46',
    image: '/images/products/nb9060_olive.jpg',
  },
  {
    id: 'prod-6',
    name: 'NIKE DUNK LOW FOREST',
    subtitle: 'Streetwear Classic',
    price: 115.0,
    rating: 4.8,
    sizes: '38–45',
    image: '/images/products/dunk_green.jpg',
  },
  {
    id: 'prod-7',
    name: 'ADIZERO SL SPEED',
    subtitle: 'Marathon Trainer',
    price: 220.0,
    rating: 4.9,
    sizes: '41–46',
    image: '/images/img2.png',
  },
  {
    id: 'prod-8',
    name: 'AIR FORCE 1 GOLD EDITION',
    subtitle: 'Limited Edition',
    price: 250.0,
    rating: 5.0,
    sizes: '40–45',
    image: '/images/img1.png',
    badge: 'NEW',
    badgeType: 'new',
  },
];

interface BestSellersProps {
  onAddToCart?: (product: { name: string; price: number; image: string }) => void;
  onOpenProductPage?: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onAddToCart, onOpenProductPage }) => {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Exactly 5 cards visible per row on desktop
  const visibleCards = 5;
  const totalItems = bestSellersData.length;
  const maxIndex = Math.max(0, totalItems - visibleCards);

  // Auto carousel rotation
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className={`best-sellers-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Best Sellers"
    >
      <div className="best-sellers-container">
        {/* Section Header */}
        <div className="best-sellers-header">
          <div className="title-wrap">
            <h2 className="best-sellers-title">TRENDING NOW</h2>
            <div className="header-accent-line"></div>
          </div>

          <div className="header-actions-right">
            <div className="carousel-nav-btns">
              <button
                type="button"
                className="carousel-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Products"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="carousel-arrow-btn"
                onClick={handleNext}
                aria-label="Next Products"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <a href="#view-all-products" className="best-sellers-view-all">
              <span>VIEW ALL</span>
              <ArrowRight size={16} className="view-all-arrow" />
            </a>
          </div>
        </div>

        {/* Product Cards Carousel Container */}
        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Right Arrow Button (Matching reference screenshot) */}
          <button
            type="button"
            className="floating-next-btn"
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {bestSellersData.map((product, idx) => {
              const isLiked = !!wishlist[product.id];
              const isAdded = !!addedItems[product.id];

              return (
                <div
                  key={product.id}
                  className="carousel-slide"
                  style={{ '--slide-index': idx } as React.CSSProperties}
                >
                  <div className="product-card-ref" onClick={() => onOpenProductPage?.()}>
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
                        onClick={(e) => handleAddToCart(product, e)}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
