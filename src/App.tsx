import { lazy, Suspense } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { RentalEnquiryProvider } from './components/RentalEnquiry';
import ScrollManager from './components/ScrollManager';
import WhatsAppFloat from './components/WhatsAppFloat';

// Route-level code splitting keeps the first load fast.
const Home = lazy(() => import('./pages/Home'));
const Decorations = lazy(() => import('./pages/Decorations'));
const DecorCategoryPage = lazy(() => import('./pages/DecorCategoryPage'));
const DjPage = lazy(() => import('./pages/DjPage'));
const DjBooking = lazy(() => import('./pages/DjBooking'));
const Rentals = lazy(() => import('./pages/Rentals'));
const RentalDetail = lazy(() => import('./pages/RentalDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <RentalEnquiryProvider>
        <ScrollManager />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Suspense fallback={<PageFallback />}>
            <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/decorations" element={<Decorations />} />
                <Route path="/decorations/:slug" element={<DecorCategoryPage />} />
                <Route path="/dj" element={<DjPage />} />
                <Route path="/dj/book" element={<DjBooking />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/rentals/:slug" element={<RentalDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </RentalEnquiryProvider>
    </MotionConfig>
  );
}
