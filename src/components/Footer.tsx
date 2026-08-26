import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="footer-wrapper" id="contact">
      {/* Floating Light Red Newsletter CTA Card */}
      <div className="newsletter-cta-bar">
        <div className="newsletter-container">
          <div className="newsletter-card">
            <div className="newsletter-left">
              <div className="newsletter-icon-wrap">
                <Mail size={26} className="newsletter-mail-icon" />
              </div>
              <div className="newsletter-text">
                <h3 className="newsletter-title">
                  STAY IN THE <span className="highlight-red">KNOW</span>
                </h3>
                <p className="newsletter-subtitle">
                  Subscribe to get special offers, exclusive drops, and restock alerts.
                </p>
              </div>
            </div>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Dark Footer Section */}
      <div className="main-footer-section">
        <div className="main-footer-container">
          {/* Top Multi-Column Footer Grid */}
          <div className="footer-columns-grid">
            {/* Col 1: Brand Info & Socials */}
            <div className="footer-brand-col">
              <div className="footer-logo-block">
                <img src="/logo.png" alt="HAXON" className="footer-logo-img" />
              </div>
              <div className="footer-taglines">
                <p>Premium sneakers. Authentic style.</p>
                <p>For every move you make.</p>
              </div>
              <div className="footer-social-links">
                <a href="#instagram" className="social-icon-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#tiktok" className="social-icon-link" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a href="#youtube" className="social-icon-link" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                <a href="#facebook" className="social-icon-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: SHOP */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">SHOP</h4>
              <ul className="footer-links-list">
                <li><a href="#new-in">New In</a></li>
                <li><a href="#men">Men</a></li>
                <li><a href="#women">Women</a></li>
                <li><a href="#kids">Kids</a></li>
                <li><a href="#brands">Brands</a></li>
                <li><a href="#sale">Sale</a></li>
              </ul>
            </div>

            {/* Col 3: HELP */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">HELP</h4>
              <ul className="footer-links-list">
                <li><a href="#help-faq">Help & FAQ</a></li>
                <li><a href="#shipping">Shipping & Delivery</a></li>
                <li><a href="#returns">Returns & Exchanges</a></li>
                <li><a href="#size-guide">Size Guide</a></li>
                <li><a href="#track-order">Track Order</a></li>
              </ul>
            </div>

            {/* Col 4: COMPANY */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">COMPANY</h4>
              <ul className="footer-links-list">
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#sustainability">Sustainability</a></li>
                <li><a href="#store-locator">Store Locator</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 5: WE ACCEPT */}
            <div className="footer-payment-col">
              <h4 className="footer-col-title">WE ACCEPT</h4>
              <div className="payment-badges-row">
                <span className="pay-badge visa-badge">VISA</span>
                <span className="pay-badge mc-badge">
                  <span className="mc-circle mc-red"></span>
                  <span className="mc-circle mc-yellow"></span>
                </span>
                <span className="pay-badge paypal-badge">
                  <i>PayP</i>al
                </span>
                <span className="pay-badge applepay-badge">
                  Pay
                </span>
                <span className="pay-badge klarna-badge">klarna.</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="footer-bottom-row">
            <p>© 2026 HAXON SNEAKERS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
