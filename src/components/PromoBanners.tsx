import React, { useEffect, useRef, useState } from 'react';
import './PromoBanners.css';

export const PromoBanners: React.FC = () => {
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

  return (
    <section
      ref={sectionRef}
      className={`promo-banners-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Special Promotions and HAXON Club"
    >
      <div className="promo-banners-container">
        {/* Left Dark Heat Banner */}
        <div
          className="promo-banner-card banner-dark"
          style={{ '--banner-index': 0 } as React.CSSProperties}
        >
          <div className="banner-text-box">
            <h2 className="banner-title-dark">
              THE HEAT <br />
              <span className="lime-accent">IS REAL</span>
            </h2>
            <p className="banner-desc-dark">
              Limited drops. Iconic styles. <br />
              Don't miss out.
            </p>
            <a href="#limited-drops" className="banner-btn-outline">
              SHOP LIMITED DROPS
            </a>
          </div>

          <div className="banner-img-box">
            <img
              src="/images/banners/shoe.png"
              alt="HAXON Limited Edition Sneaker"
              className="banner-product-img jordan-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Light HAXON Club Banner */}
        <div
          className="promo-banner-card banner-light"
          style={{ '--banner-index': 1 } as React.CSSProperties}
        >
          <div className="banner-text-box">
            <span className="banner-tag-light">JOIN HAXON CLUB</span>
            <h2 className="banner-title-light">
              GET REWARDS. <br />
              EARLY ACCESS. <br />
              EXCLUSIVE DROPS.
            </h2>
            <a href="#join-club" className="banner-btn-solid">
              JOIN NOW
            </a>
          </div>

          <div className="banner-img-box">
            <img
              src="/images/banners/box.png"
              alt="HAXON Premium Shoe Box"
              className="banner-product-img shoebox-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
