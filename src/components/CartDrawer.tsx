import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import './CartDrawer.css';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <h3>Your Bag</h3>
            <span className="cart-item-count-pill">{totalCount} items</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag className="cart-empty-icon" />
              <p>Your shopping bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-info">
                  <div className="cart-item-title-row">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="cart-item-variant">{item.variant}</p>

                  <div className="cart-item-bottom-row">
                    <span className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="cart-qty-control">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="cart-qty-number">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button type="button" className="cart-checkout-btn">
              <span>Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
