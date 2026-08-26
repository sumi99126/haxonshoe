import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBar from './components/FeaturesBar';
import BrandMarquee from './components/BrandMarquee';
import ShopByCategory from './components/ShopByCategory';
import BestSellers from './components/BestSellers';
import PromoBanners from './components/PromoBanners';
import LatestProducts from './components/LatestProducts';
import CustomerFeedback from './components/CustomerFeedback';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CollectionPage from './components/CollectionPage';
import CartDrawer from './components/CartDrawer';
import type { CartItem } from './components/CartDrawer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collection' | 'product'>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Air Force 1 Gold Edition',
      variant: 'Men • Size: US 10.0',
      price: 250.0,
      quantity: 1,
      image: '/images/img1.png',
    },
    {
      id: '2',
      name: 'Adizero SL Speed',
      variant: 'Men • Size: US 9.5',
      price: 220.0,
      quantity: 1,
      image: '/images/img2.png',
    },
  ]);

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCollectionPage = () => {
    setCurrentView('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductPage = () => {
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: { name: string; price: number; image: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: Date.now().toString(),
          name: item.name,
          variant: 'Men • Standard Fit',
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Preloader />
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onGoHome={handleGoHome}
        onOpenCollectionPage={handleOpenCollectionPage}
      />
      <main className="main-content">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenCart={() => setIsCartOpen(true)}
              onAddToCart={handleAddToCart}
            />
            <FeaturesBar />
            <ShopByCategory onCategorySelect={handleOpenCollectionPage} />
            <BestSellers
              onAddToCart={handleAddToCart}
              onOpenProductPage={handleOpenProductPage}
            />
            <PromoBanners />
            <BrandMarquee />
            <LatestProducts
              onAddToCart={handleAddToCart}
              onOpenProductPage={handleOpenProductPage}
            />
            <CustomerFeedback />
            <FaqSection />
          </>
        )}
        {currentView === 'collection' && (
          <CollectionPage
            onBackToHome={handleGoHome}
            onAddToCart={handleAddToCart}
            onOpenProductPage={handleOpenProductPage}
          />
        )}
        {currentView === 'product' && (
          <ProductDetail
            onBackToHome={handleGoHome}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
