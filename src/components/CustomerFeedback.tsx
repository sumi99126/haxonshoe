import React from 'react';
import './CustomerFeedback.css';

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

const row1Reviews: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Tom Smith',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'The quality and fit of HAXON shoes are unmatched. Super comfortable for all-day wear!',
  },
  {
    id: 'r2',
    name: 'David Miller',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Extremely fast delivery and premium packaging. The gold swoosh sneakers look stunning in person.',
  },
  {
    id: 'r3',
    name: 'Andrew Amith',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'I bought 2 pairs for myself and my brother. Solid craftsmanship and very stylish design.',
  },
  {
    id: 'r4',
    name: 'Jhony Lever',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Best sneaker store online! Cushioning is top tier and customer service was helpful.',
  },
];

const row2Reviews: ReviewItem[] = [
  {
    id: 'r5',
    name: 'Marcus Vance',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: '10/10 comfort! The On Cloudmonster and AF1 editions exceeded my expectations.',
  },
  {
    id: 'r6',
    name: 'Liam Chen',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Incredible sole grip and premium materials. Will definitely order again next drop!',
  },
  {
    id: 'r7',
    name: 'Sophia Reed',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Super sleek look! Got so many compliments at my gym and work. Highly recommended!',
  },
  {
    id: 'r8',
    name: 'Ethan Hunt',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Authentic quality, responsive team, and prompt delivery. Couldn’t be happier with HAXON.',
  },
];

export const CustomerFeedback: React.FC = () => {
  // Duplicate arrays 3 times for a seamless infinite marquee loop
  const loopRow1 = [...row1Reviews, ...row1Reviews, ...row1Reviews];
  const loopRow2 = [...row2Reviews, ...row2Reviews, ...row2Reviews];

  return (
    <section className="feedback-section" aria-label="Customer Feedback">
      <div className="feedback-container">
        {/* Section Header */}
        <div className="feedback-header">
          <h2 className="feedback-title">CUSTOMERS FEEDBACK</h2>
          <div className="section-divider"></div>
          <p className="feedback-subtitle">
            What our verified buyers have to say about HAXON comfort, durability, and premium style.
          </p>
        </div>

        {/* Dual Marquee Loop Container */}
        <div className="feedback-marquee-wrapper">
          {/* Row 1 - Scrolling Left */}
          <div className="marquee-row marquee-row-left">
            <div className="marquee-content">
              {loopRow1.map((review, index) => (
                <div key={`r1-${review.id}-${index}`} className="review-card">
                  <div className="review-avatar-wrap">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                  </div>
                  <h4 className="review-author">{review.name}</h4>
                  <div className="review-stars">{'★'.repeat(review.rating)}</div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right (Opposite Direction) */}
          <div className="marquee-row marquee-row-right">
            <div className="marquee-content">
              {loopRow2.map((review, index) => (
                <div key={`r2-${review.id}-${index}`} className="review-card">
                  <div className="review-avatar-wrap">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                  </div>
                  <h4 className="review-author">{review.name}</h4>
                  <div className="review-stars">{'★'.repeat(review.rating)}</div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
