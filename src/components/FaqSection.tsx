import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FaqSection.css';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const col1Faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are all HAXON sneakers 100% authentic?',
    answer: 'Yes, absolutely. Every pair of sneakers sold on HAXON undergoes rigorous multi-point verification by our expert authenticators before shipping.',
  },
  {
    id: 'faq-2',
    question: 'How do I find the right shoe size for me?',
    answer: 'We recommend checking our detailed Size Guide on each product page. Most of our lifestyle and running models fit true-to-size unless specified in the product description.',
  },
  {
    id: 'faq-3',
    question: 'What materials are used in HAXON Special Editions?',
    answer: 'Our limited editions feature premium full-grain leathers, durable suede, breathable primeknit mesh, and responsive foam cushioning for all-day comfort.',
  },
  {
    id: 'faq-4',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders can be modified or canceled within 1 hour of placement. Please reach out to our Customer Care team immediately with your Order ID.',
  },
];

const col2Faqs: FaqItem[] = [
  {
    id: 'faq-5',
    question: 'How long does shipping take and what does it cost?',
    answer: 'Express shipping takes 2–4 business days worldwide. We provide FREE express delivery on all orders over $150.',
  },
  {
    id: 'faq-6',
    question: 'What is HAXON’s 30-day Return & Exchange policy?',
    answer: 'We offer a 30-day hassle-free return and exchange policy. Items must be unworn, in original condition with tags and original packaging.',
  },
  {
    id: 'faq-7',
    question: 'Which payment methods are accepted at checkout?',
    answer: 'We accept all major credit & debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and flexible Klarna installments.',
  },
  {
    id: 'faq-8',
    question: 'How can I track my order once it has dispatched?',
    answer: 'Once your order is shipped, you will receive an email and SMS with a live tracking link to follow your delivery status in real time.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqColumn = (faqs: FaqItem[]) => {
    return faqs.map((faq) => {
      const isOpen = openId === faq.id;
      return (
        <div
          key={faq.id}
          className={`faq-card ${isOpen ? 'active' : ''}`}
          onClick={() => toggleFaq(faq.id)}
        >
          <div className="faq-question-row">
            <h3 className="faq-question">{faq.question}</h3>
            <button
              type="button"
              className="faq-toggle-btn"
              aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
            >
              <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
            </button>
          </div>
          <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="faq-section" id="faqs" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-title-wrap">
            <span className="faq-badge">
              <HelpCircle size={14} /> GOT QUESTIONS?
            </span>
            <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="faq-accent-line"></div>
          </div>
          <p className="faq-subtitle">
            Find quick answers to common questions about HAXON sneaker authenticity, sizing, global shipping, and returns.
          </p>
        </div>

        {/* 2-Column Grid Layout (5 FAQs per Column) */}
        <div className="faq-grid">
          <div className="faq-column">{renderFaqColumn(col1Faqs)}</div>
          <div className="faq-column">{renderFaqColumn(col2Faqs)}</div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
