import React from 'react';
import { ArrowRight } from 'lucide-react';
import './ShopByCategory.css';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  link: string;
}

const categories: CategoryItem[] = [
  {
    id: 'men',
    name: 'MEN',
    subtitle: 'SHOP NOW',
    image: '/images/categories/men.jpg',
    link: '#men',
  },
  {
    id: 'crocs',
    name: 'CROCS',
    subtitle: 'SHOP NOW',
    image: '/images/categories/crocs.jpg',
    link: '#crocs',
  },
  {
    id: 'kids',
    name: 'KIDS',
    subtitle: 'SHOP NOW',
    image: '/images/categories/kids.jpg',
    link: '#kids',
  },
  {
    id: 'running',
    name: 'RUNNING',
    subtitle: 'SHOP NOW',
    image: '/images/categories/running.jpg',
    link: '#running',
  },
  {
    id: 'casual',
    name: 'CASUAL',
    subtitle: 'SHOP NOW',
    image: '/images/categories/casual.jpg',
    link: '#casual',
  },
  {
    id: 'slides',
    name: 'SLIDES',
    subtitle: 'SHOP NOW',
    image: '/images/categories/slides.jpg',
    link: '#slides',
  },
];

interface ShopByCategoryProps {
  onCategorySelect?: (categoryId: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onCategorySelect }) => {
  const handleCategoryClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onCategorySelect) {
      onCategorySelect(id);
    }
  };

  return (
    <section className="shop-category-section" id="collection" aria-label="Shop by Category">
      <div className="shop-category-container">
        {/* Section Header */}
        <div className="shop-category-header">
          <div className="title-wrap">
            <h2 className="shop-category-title">SHOP BY CATEGORY</h2>
            <div className="header-accent-line"></div>
          </div>
          <a href="#view-all" className="view-all-link">
            <span>VIEW ALL</span>
            <ArrowRight size={16} className="view-all-arrow" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="shop-category-grid">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="category-card"
              onClick={(e) => handleCategoryClick(category.id, e)}
            >
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  loading="lazy"
                />
                <div className="category-overlay" />
              </div>

              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-shop-now">
                  {category.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
