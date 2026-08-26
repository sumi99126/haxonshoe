import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './Hero.css';

export interface ShoeOption {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  rotationAngle: number;
  circleGradient: string;
  accentColor: string;
  description: string;
}

// Light Red and White smooth top-to-bottom gradient for the backdrop arch
const redWhiteLightGradient =
  'linear-gradient(180deg, #fecaca 0%, #fee2e2 55%, #fff1f2 100%)';

const haxonProducts: ShoeOption[] = [
  {
    id: '1',
    name: 'Air Force 1 Gold Edition',
    price: 250,
    rating: 5,
    image: '/images/img1.png',
    rotationAngle: -22,
    circleGradient: redWhiteLightGradient,
    accentColor: '#D31018',
    description:
      'Iconic black and white silhouette adorned with gold accents. Features premium full-grain leather construction and signature Air-Sole cushioning.',
  },
  {
    id: '2',
    name: 'Adizero SL Speed',
    price: 220,
    rating: 5,
    image: '/images/img2.png',
    rotationAngle: -22,
    circleGradient: redWhiteLightGradient,
    accentColor: '#D31018',
    description:
      'Engineered for maximum speed and lightweight comfort. Lightstrike Pro foam midsole delivers exceptional energy return on every stride.',
  },
  {
    id: '3',
    name: 'Air Force 1 Traces Edition',
    price: 240,
    rating: 5,
    image: '/images/img3.png',
    rotationAngle: -22,
    circleGradient: redWhiteLightGradient,
    accentColor: '#D31018',
    description:
      'Custom street graphic aesthetic with bold contrast swoosh. Crafted with durable upper leather and signature Air-sole unit for all-day wear.',
  },
];

interface HeroProps {
  onOpenCart?: () => void;
  onAddToCart?: (item: { name: string; price: number; image: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart, onAddToCart }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const activeShoe = haxonProducts[selectedIndex];

  // Auto-rotate shoes continuously every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % haxonProducts.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const handleProductCardClick = () => {
    if (onAddToCart) {
      onAddToCart({
        name: activeShoe.name,
        price: activeShoe.price,
        image: activeShoe.image,
      });
    } else if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <section
      className="haxon-hero-compact"
      aria-label="Hero Spotlight"
    >
      {/* Background Watermark Slogan - Positioned at Bottom like Reference */}
      <div className="hero-watermark-slogan" aria-hidden="true">
        <span>COMFORT MEETS POWER</span>
      </div>

      <div className="hero-compact-container">
        {/* Centered Wide Bold 2-Line Headline */}
        <div className="hero-headline-box">
          <h1 className="hero-headline-2lines">
            <span className="headline-row row-1">
              <span className="text-red-accent">DISCOVER</span>{' '}
              <span className="text-dark">LIMITED SNEAKERS</span>
            </span>
            <span className="headline-row row-2">
              <span className="text-dark">WITHOUT</span>{' '}
              <span className="text-red-accent">LIMITATION</span>
            </span>
          </h1>
        </div>

        {/* 3-Column Balanced Center Area */}
        <div className="hero-content-grid">
          {/* Left Column: Description & Clean Edition Switcher */}
          <div className="hero-left-panel">
            <p key={activeShoe.id} className="hero-side-desc hero-fade-text">
              {activeShoe.description}
            </p>

            {/* Quick Colorway Switcher Thumbnails */}
            <div className="hero-edition-selector">
              <span className="edition-label">SELECT EDITION:</span>
              <div className="edition-thumbs">
                {haxonProducts.map((shoe, idx) => (
                  <button
                    key={shoe.id}
                    type="button"
                    className={`edition-thumb-btn ${idx === selectedIndex ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedIndex(idx);
                    }}
                    title={shoe.name}
                    aria-label={`Select ${shoe.name}`}
                  >
                    <img src={shoe.image} alt={shoe.name} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Dome Backdrop Circle (Flat at Bottom) & Rotated Shoe */}
          <div className="hero-center-panel">
            {/* Dome Backdrop Circle (Flat at bottom edge like reference screenshot) */}
            <div
              className="hero-circle-glow"
              style={{ background: activeShoe.circleGradient }}
            />

            {/* Floating Shoe Stage Positioned Centered over Dome Backdrop */}
            <div
              className="hero-shoe-stage"
              onClick={handleProductCardClick}
              role="button"
              tabIndex={0}
              title="Click to add to cart"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleProductCardClick();
              }}
            >
              <div className="hero-shoe-frame">
                <img
                  key={activeShoe.id}
                  src={activeShoe.image}
                  alt={activeShoe.name}
                  className="hero-shoe-image-exact"
                  style={{
                    '--shoe-rotate': `${activeShoe.rotationAngle}deg`,
                  } as React.CSSProperties}
                />
              </div>
              <div className="hero-shoe-ground-shadow" />
            </div>
          </div>

          {/* Right Column: Hand-Drawn Arrow & Floating Badge Card */}
          <div className="hero-right-panel">
            {/* Hand-Drawn Curved Pointer Arrow */}
            <div className="hero-curved-arrow" aria-hidden="true">
              <svg
                width="72"
                height="36"
                viewBox="0 0 72 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 26C16 8 44 6 62 20"
                  stroke="#D31018"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                />
                <path
                  d="M63 12L65 22L55 21"
                  stroke="#D31018"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Floating Product Badge Card */}
            <div
              key={activeShoe.id}
              className="hero-floating-badge hero-fade-badge"
              onClick={handleProductCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleProductCardClick();
              }}
            >
              <div className="badge-details">
                <h3 className="badge-name">{activeShoe.name}</h3>
                <div className="badge-rating">
                  {[...Array(activeShoe.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="star-icon"
                      fill="#f59e0b"
                      color="#f59e0b"
                    />
                  ))}
                </div>
              </div>
              <div className="badge-price-container">
                <span className="badge-price">${activeShoe.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
