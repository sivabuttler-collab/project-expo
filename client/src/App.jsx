import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceCategories from './components/ServiceCategories';
import ProviderList from './components/ProviderList';
import OtpAuthModal from './components/OtpAuthModal';
import GpsTrackingModal from './components/GpsTrackingModal';
import AiAssistantModal from './components/AiAssistantModal';
import AdminDashboard from './components/AdminDashboard';
import InstructionsPage from './components/InstructionsPage';
import SubscriptionModal from './components/SubscriptionModal';
import CreatorDatabase from './components/CreatorDatabase';
import { Bot, Navigation, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles, Crown } from 'lucide-react';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('doorstep_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeSubscription, setActiveSubscription] = useState(null);

  // Views & Modals
  const [activeView, setActiveView] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isCreatorDbOpen, setIsCreatorDbOpen] = useState(false);
  const [activeTrackingBooking, setActiveTrackingBooking] = useState(null);
  
  // Booking confirmation modal state
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingAddress, setBookingAddress] = useState('Flat 301, Emerald Heights, Indiranagar 10th Main, Bengaluru');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProviders();
    fetchBookings();
    if (user) {
      fetchUserSubscription(user.id);
    }
  }, [selectedCategory, genderFilter, availabilityFilter, priceFilter, searchQuery, user]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProviders = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'all') queryParams.append('category', selectedCategory);
      if (genderFilter !== 'all') queryParams.append('gender', genderFilter);
      if (availabilityFilter !== 'all') queryParams.append('availability', availabilityFilter);
      if (priceFilter !== 'all') queryParams.append('maxPrice', priceFilter);
      if (searchQuery) queryParams.append('search', searchQuery);

      const res = await fetch(`/api/providers?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) setProviders(data.providers);
    } catch (err) {
      console.error('Error fetching providers:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchUserSubscription = async (userId) => {
    try {
      const res = await fetch(`/api/subscriptions/user/${userId}`);
      const data = await res.json();
      if (data.success) {
        setActiveSubscription(data.subscription);
      }
    } catch (err) {
      console.error('Subscription fetch error:', err);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('doorstep_user', JSON.stringify(userData));
    fetchUserSubscription(userData.id);
    if (userData.role === 'admin') {
      setActiveView('admin');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSubscription(null);
    localStorage.removeItem('doorstep_user');
    setActiveView('home');
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedProvider) return;

    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsSubmittingBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: user.name,
          customerPhone: user.phone,
          customerAddress: bookingAddress,
          providerId: selectedProvider.id,
          notes: bookingNotes
        })
      });

      const data = await res.json();
      setIsSubmittingBooking(false);

      if (data.success) {
        const newBk = data.booking;
        setSelectedProvider(null);
        fetchBookings();
        fetchProviders();
        setActiveTrackingBooking(newBk);
      } else {
        alert(data.message || 'Failed to place booking.');
      }
    } catch (err) {
      setIsSubmittingBooking(false);
      alert('Network error while placing booking.');
    }
  };

  const handleAddProvider = async (providerData) => {
    try {
      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(providerData)
      });
      const data = await res.json();
      if (data.success) {
        fetchProviders();
      }
    } catch (err) {
      console.error('Add provider error:', err);
    }
  };

  const handleDeleteProvider = async (providerId) => {
    if (!window.confirm('Remove this provider from Doorstep Experts database?')) return;
    try {
      const res = await fetch(`/api/providers/${providerId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchProviders();
      }
    } catch (err) {
      console.error('Delete provider error:', err);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        fetchProviders();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAi={() => setIsAiModalOpen(true)}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onOpenCreatorDb={() => setIsCreatorDbOpen(true)}
        activeSubscription={activeSubscription}
      />

      {/* Main Container */}
      {activeView === 'instructions' ? (
        <main className="main-content">
          <InstructionsPage onStartBooking={() => setActiveView('home')} />
        </main>
      ) : activeView === 'admin' ? (
        <main className="main-content">
          <AdminDashboard
            providers={providers}
            bookings={bookings}
            onAddProvider={handleAddProvider}
            onDeleteProvider={handleDeleteProvider}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        </main>
      ) : (
        <>
          {/* Swiggy Hero Section */}
          <section className="hero-banner">
            <div className="hero-container">
              <div>
                <div className="patriotic-badge">
                  <span>🇮🇳</span> PROUDLY CREATED FOR INDIA • 100% VERIFIED EXPERTS
                </div>

                <h1 className="hero-title">
                  Doorstep <span className="highlight-saffron">Experts</span> for all your <span className="highlight-green">Home Needs</span>
                </h1>

                <p className="hero-subtitle">
                  Instant doorstep booking for verified Electricians, Plumbers, Washing Repair, Carpenters, Painters, Water Suppliers, Ironing & Sanitation professionals with real-time GPS radar tracking.
                </p>

                {/* Subscriptions Ribbon */}
                <div style={{ background: 'linear-gradient(135deg, #000080, #1E293B)', padding: '0.85rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', maxWidth: '560px', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,128,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Crown color="#FFD700" size={24} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Membership Plans Available</div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>₹150 Simple • ₹200 Premium • ₹300 VIP All-Access</div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-sm btn-saffron" 
                    onClick={() => setIsSubscriptionModalOpen(true)}
                  >
                    View Plans
                  </button>
                </div>

                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-value">10+</span>
                    <span className="stat-label">Service Categories</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Aadhaar Verified</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">&lt; 30 mins</span>
                    <span className="stat-label">Doorstep Arrival</span>
                  </div>
                </div>
              </div>

              {/* Active Bookings Quick Widget */}
              {bookings.length > 0 && (
                <div className="hero-card">
                  <div className="hero-card-header">
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#FF671F', fontWeight: 800 }}>LIVE ORDERS TRACKER</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{bookings[0].providerName}</div>
                    </div>
                    <span className="availability-tag available">
                      <span className="status-dot"></span> {bookings[0].status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                    Scheduled for: {bookings[0].scheduledTime} • 📍 {bookings[0].customerAddress}
                  </p>

                  <button 
                    className="btn btn-saffron" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setActiveTrackingBooking(bookings[0])}
                  >
                    <Navigation size={16} /> Track Provider on GPS Radar
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Directory & Provider List */}
          <main className="main-content">
            <ServiceCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <ProviderList
              providers={providers}
              onBookProvider={(p) => setSelectedProvider(p)}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
            />
          </main>
        </>
      )}

      {/* Booking Confirmation Modal */}
      {selectedProvider && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ background: 'linear-gradient(135deg, #046A38, #138808)', color: 'white' }}>
              <div>
                <h3 className="modal-title">Confirm Doorstep Expert Booking</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Category: {selectedProvider.category.toUpperCase()}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedProvider(null)} style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>✕</button>
            </div>

            <form onSubmit={handleConfirmBooking} className="modal-body">
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{selectedProvider.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Govt ID: {selectedProvider.idNo} • Gender: {selectedProvider.gender}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#046A38' }}>₹{selectedProvider.price}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{selectedProvider.priceUnit}</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Doorstep Delivery Address *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Instructions / Issue Details</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  placeholder="e.g. Please bring extra 16A MCB switch or heavy pipe wrench..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                ></textarea>
              </div>

              <div style={{ background: '#FFF4EC', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.82rem', color: '#FF671F', fontWeight: 600 }}>
                💳 Payment Method: Cash on Delivery / UPI after service completion.
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmittingBooking}>
                {isSubmittingBooking ? 'Booking Doorstep Expert...' : 'Confirm & Launch Live GPS Tracking'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating AI Trigger Button */}
      <button className="floating-ai-btn" onClick={() => setIsAiModalOpen(true)}>
        <Bot size={20} />
        Ask Doorstep AI
      </button>

      {/* OTP Auth Modal */}
      <OtpAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        user={user}
        onSubscribeSuccess={(sub) => setActiveSubscription(sub)}
      />

      {/* Creator Secret DB Modal */}
      <CreatorDatabase
        isOpen={isCreatorDbOpen}
        onClose={() => setIsCreatorDbOpen(false)}
      />

      {/* GPS Tracking Modal */}
      {activeTrackingBooking && (
        <GpsTrackingModal
          booking={activeTrackingBooking}
          onClose={() => setActiveTrackingBooking(null)}
        />
      )}

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectExpertForBooking={(exp) => setSelectedProvider(exp)}
      />

      {/* Footer */}
      <footer style={{ marginTop: 'auto', background: '#0F172A', color: 'white', padding: '2.5rem 2rem 1.5rem', borderTop: '4px solid #FF671F' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Doorstep <span style={{ color: '#FF671F' }}>Experts</span> 🇮🇳
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', maxWidth: '400px' }}>
              India's Premier Verified Individual Home Needs Platform. Electrician, Plumber, Carpenter, Wall Painter, Water Supplier, Washing Repair, Ironing & Sanitation Services.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FF671F', marginBottom: '0.8rem' }}>SUBSCRIPTION PLANS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#CBD5E1' }}>
              <span>Simple Plan — ₹150 / Month</span>
              <span>Premium Plan — ₹200 / Month</span>
              <span>All-Access VIP — ₹300 / Month</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#138808', marginBottom: '0.8rem' }}>FOUNDER PORTAL</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#CBD5E1' }}>
              <span>Secret Founder DB Portal</span>
              <span>Password Key: doorstep2026</span>
              <span>Revenue & Member Analytics</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid #1E293B', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748B' }}>
          <div>© 2026 Doorstep Experts India. All rights reserved.</div>
          <div style={{ color: '#FF671F', fontWeight: 700 }}>Designed with Tricolor Saffron, White & Green 🇮🇳</div>
        </div>
      </footer>
    </div>
  );
}
