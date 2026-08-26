import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import './FeaturesBar.css';

export interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const features: FeatureItem[] = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'FREE SHIPPING',
    subtitle: 'On orders over $75',
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: 'EASY RETURNS',
    subtitle: '30-days hassle free returns',
  },
  {
    id: 'payment',
    icon: ShieldCheck,
    title: 'SECURE PAYMENT',
    subtitle: '100% secure checkout',
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'CUSTOMER SUPPORT',
    subtitle: "We're here to help",
  },
];

export const FeaturesBar: React.FC = () => {
  return (
    <section className="features-bar-section" id="about" aria-label="Store Advantages">
      <div className="features-bar-container">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              className={`feature-item ${idx !== features.length - 1 ? 'has-divider' : ''}`}
            >
              <div className="feature-icon-wrapper">
                <IconComponent size={26} strokeWidth={1.8} className="feature-icon" />
              </div>
              <div className="feature-text-block">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesBar;
