import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
  onGoHome?: () => void;
  onOpenCollectionPage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount = 2,
  onGoHome,
  onOpenCollectionPage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', href: '#home', isHome: true },
    { label: 'Collection', href: '#collection', isCollection: true },
    { label: 'About', href: '#about' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.isHome) {
      if (onGoHome) onGoHome();
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.isCollection && onOpenCollectionPage) {
      onOpenCollectionPage();
      return;
    }

    if (onGoHome) onGoHome(); // Return to home layout first if on PDP

    setTimeout(() => {
      const targetEl = document.querySelector(link.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo (Left) */}
        <div className="navbar-left">
          <a
            href="/"
            className="navbar-brand"
            onClick={(e) => {
              if (onGoHome) {
                e.preventDefault();
                onGoHome();
              }
            }}
          >
            <img src="/logo.png" alt="HAXON" className="navbar-logo" />
          </a>
        </div>

        {/* Desktop Navigation Links (Centered) */}
        <nav className="navbar-center">
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavLinkClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Action Icons (Right) */}
        <div className="navbar-right">
          <div className="action-buttons-group">
            {/* Search Icon Button */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Icon Button */}
            <button
              type="button"
              className="action-icon-btn"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>

            {/* Cart with Red Badge */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={onOpenCart}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar Popup */}
      {isSearchOpen && (
        <div className="search-bar-dropdown">
          <div className="search-bar-inner">
            <Search size={18} className="search-dropdown-icon" />
            <input
              type="text"
              autoFocus
              placeholder="Search sneakers, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-dropdown-input"
            />
            <button
              type="button"
              className="search-close-btn"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Left Side Drawer Panel */}
      <div
        className={`mobile-drawer-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`mobile-left-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img src="/logo.png" alt="HAXON" className="mobile-drawer-logo" />
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, link)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
