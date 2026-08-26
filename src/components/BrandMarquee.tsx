import React from 'react';
import './BrandMarquee.css';

export interface BrandItem {
  id: string;
  name: string;
  image: string;
}

const brands: BrandItem[] = [
  { id: 'nb', name: 'New Balance', image: '/images/brands/nb.png' },
  { id: 'nike', name: 'Nike', image: '/images/brands/nike.png' },
  { id: 'on', name: 'On Cloud', image: '/images/brands/on.png' },
  { id: 'asics', name: 'Asics', image: '/images/brands/asics.png' },
  { id: 'adidas', name: 'Adidas', image: '/images/brands/adidas.png' },
  { id: 'crocs', name: 'Crocs', image: '/images/brands/crocs.png' },
];

export const BrandMarquee: React.FC = () => {
  // Duplicate list 4 times for a smooth, seamless infinite loop
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="brand-marquee-section" aria-label="Featured Brands">
      <div className="brand-marquee-container">
        <div className="marquee-track">
          {marqueeItems.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="brand-item" title={brand.name}>
              <img
                src={brand.image}
                alt={`${brand.name} Logo`}
                className={`brand-logo-img ${brand.id}-logo`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
