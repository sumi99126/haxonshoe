import React from 'react';
import './LatestProducts.css';

export interface LatestProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
}

const latestProductsData: LatestProduct[] = [
  {
    id: 'lp1',
    name: 'Air Jordan 1 High Denim',
    subtitle: 'Special Edition Washed Finish',
    price: 210.0,
    image: '/images/products/jordan1_denim.jpg',
  },
  {
    id: 'lp2',
    name: 'On Cloudmonster All-White',
    subtitle: 'Ultra Cushion Running Edition',
    price: 195.0,
    image: '/images/products/cloudmonster.jpg',
  },
  {
    id: 'lp3',
    name: 'Air Force 1 Low Premium',
    subtitle: 'Suede Tan Edition Gold Accent',
    price: 180.0,
    image: '/images/products/af1_suede.jpg',
  },
  {
    id: 'lp4',
    name: 'New Balance 9060 Olive',
    subtitle: 'Futuristic Sculpted Runner',
    price: 185.0,
    image: '/images/products/nb9060_olive.jpg',
  },
  {
    id: 'lp5',
    name: 'Nike Dunk Low Forest Green',
    subtitle: 'Vintage Streetwear Edition',
    price: 165.0,
    image: '/images/products/dunk_green.jpg',
  },
];

interface LatestProductsProps {
  onAddToCart?: (item: { name: string; price: number; image: string }) => void;
  onOpenProductPage?: () => void;
}

export const LatestProducts: React.FC<LatestProductsProps> = ({
  onAddToCart,
  onOpenProductPage,
}) => {
  return (
    <section className="latest-products-section" aria-label="Latest Products">
      <div className="latest-products-container">
        {/* Section Header */}
        <div className="latest-section-header">
          <div className="title-wrap">
            <h2 className="latest-section-title">LATEST PRODUCTS</h2>
            <div className="header-accent-line"></div>
          </div>
        </div>

        <div className="latest-content-grid">
          {/* Left Column: Men's Feet Lifestyle Featured Banner */}
          <div className="latest-featured-banner">
            <img
              src="/images/banners/mens_lifestyle_banner.jpg"
              alt="Men's Feet Lifestyle Sneakers Showcase"
              className="featured-banner-img"
              loading="lazy"
            />
          </div>

          {/* Right Column: 5 Vertical Product Items Stacked */}
          <div className="latest-products-list">
            {latestProductsData.map((product) => (
              <div
                key={product.id}
                className="latest-product-row"
                onClick={() => {
                  if (onOpenProductPage) {
                    onOpenProductPage();
                  } else {
                    onAddToCart?.({
                      name: `${product.name} - ${product.subtitle}`,
                      price: product.price,
                      image: product.image,
                    });
                  }
                }}
              >
                <div className="latest-product-details">
                  <h3 className="latest-product-title">{product.name}</h3>
                  <p className="latest-product-sub">{product.subtitle}</p>
                  <span className="latest-product-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="latest-product-thumb">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="latest-thumb-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
