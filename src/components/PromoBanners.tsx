import React from 'react';
import './PromoBanners.css';

export const PromoBanners: React.FC = () => {
  return (
    <section className="promo-banners-section" aria-label="Special Promotions and HAXON Club">
      <div className="promo-banners-container">
        {/* Left Dark Heat Banner */}
        <div className="promo-banner-card banner-dark">
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
        <div className="promo-banner-card banner-light">
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
