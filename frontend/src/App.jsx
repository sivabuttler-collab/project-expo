import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import FilterBar from './components/FilterBar';
import ProviderCard from './components/ProviderCard';
import BookingModal from './components/BookingModal';
import OtpLoginModal from './components/OtpLoginModal';
import GpsTrackerModal from './components/GpsTrackerModal';
import AiAssistantModal from './components/AiAssistantModal';
import AdminDashboard from './components/AdminDashboard';
import InstructionsPage from './components/InstructionsPage';
import OrdersModal from './components/OrdersModal';
import LocationModal from './components/LocationModal';

import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Star, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Navigation,
  Bot,
  Flame,
  Award
} from 'lucide-react';

export default function App() {
  // User & Location state
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    city: "New Delhi",
    area: "Connaught Place, Central Delhi"
  });

  // Filters & Query state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [genderFilter, setGenderFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('Available Now');

  // Data state
  const [providers, setProviders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal toggles
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Fetch Providers
  const fetchProviders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
      if (genderFilter !== 'All') queryParams.append('gender', genderFilter);
      if (availabilityFilter !== 'All') queryParams.append('availability', availabilityFilter);
      if (searchQuery) queryParams.append('search', searchQuery);

      const res = await fetch(`/api/providers?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        let result = data.providers;

        // Apply sorting
        if (sortBy === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'price_asc') {
          result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'distance') {
          result.sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm));
        }

        setProviders(result);
      }
    } catch (e) {
      console.error("Error fetching providers:", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const phone = currentUser ? currentUser.phone : '9876543210';
      const role = currentUser ? currentUser.role : 'user';
      const res = await fetch(`/api/orders?userPhone=${phone}&role=${role}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [selectedCategory, genderFilter, availabilityFilter, searchQuery, sortBy]);

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  // Handlers
  const handleOpenBooking = (provider) => {
    setSelectedProvider(provider);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success) {
        setBookingModalOpen(false);
        fetchOrders();
        // Immediately trigger live GPS tracking modal!
        setActiveTrackingOrder(data.order);
        setGpsModalOpen(true);
      }
    } catch (e) {
      alert("Error confirming booking.");
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
        alert(data.message);
      }
    } catch (e) {
      alert("Error adding provider.");
    }
  };

  const handleDeleteProvider = async (id) => {
    if (!confirm("Are you sure you want to remove this provider?")) return;
    try {
      const res = await fetch(`/api/providers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProviders();
      }
    } catch (e) {
      alert("Error removing provider.");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (e) {
      alert("Error updating order status.");
    }
  };

  const handleQuickCall = (contactNumber) => {
    window.location.href = `tel:${contactNumber}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Swiggy Style Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenOrders={() => setOrdersModalOpen(true)}
        ordersCount={orders.length}
        onOpenAi={() => setAiModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenInstructions={() => setInstructionsModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        onOpenLocationModal={() => setLocationModalOpen(true)}
      />

      {/* Swiggy Style Hero Banner with Indian Flag Tricolor Accents */}
      <section className="bg-gradient-to-r from-saffron-500 via-amber-500 to-indiaGreen-700 text-white py-10 px-4 relative overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold tracking-wide border border-white/30">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>INSTANT 30-MINUTE DOORSTEP SERVICE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              India's Most Trusted <br />
              <span className="text-amber-200">Doorstep Home Experts</span>
            </h1>

            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl">
              Book certified Electricians, Plumbers, Washing Repair Persons, Carpenters, Wall Painters, Water Suppliers, Ironing & Sanitation Specialists.
            </p>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-extrabold text-gray-900">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>100% Govt ID Verified</span>
              </div>

              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-indiaGreen-600" />
                <span>Live GPS Tracking</span>
              </div>

              <button 
                onClick={() => setAiModalOpen(true)}
                className="bg-indigo-950 text-white hover:bg-indigo-900 px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <Bot className="w-4 h-4 text-saffron-400" />
                <span>Try Doorstep AI Expert</span>
              </button>
            </div>
          </div>

          {/* Hero Feature Box */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="font-extrabold text-sm flex items-center gap-1.5">
                🇮🇳 Doorstep Promise
              </span>
              <span className="text-[10px] bg-indiaGreen-500 font-bold px-2 py-0.5 rounded-full text-white">
                Verifiable
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Average Arrival Time</span>
                <strong className="text-saffron-200">22 Minutes</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Satisfaction Rating</span>
                <strong className="text-emerald-200">4.9 ★ (5,000+ Reviews)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Available Categories</span>
                <strong className="text-amber-200">9 Specialized Trades</strong>
              </div>
            </div>

            <button 
              onClick={() => setInstructionsModalOpen(true)}
              className="w-full py-2.5 bg-white text-saffron-600 hover:bg-saffron-50 font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Read Safety & Pricing Instructions
            </button>
          </div>

        </div>
      </section>

      {/* Swiggy Category Carousel Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Filter Bar */}
      <FilterBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        totalCount={providers.length}
      />

      {/* Service Provider Card Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4 max-w-md mx-auto">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No experts found matching your criteria</h3>
            <p className="text-xs text-gray-500">Try clearing filters or switching category tab.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setGenderFilter('All');
                setAvailabilityFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-saffron-500 text-white text-xs font-extrabold rounded-xl shadow-md hover:bg-saffron-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onBook={handleOpenBooking}
                onQuickCall={handleQuickCall}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer with Indian Creation Branding */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 border-t border-gray-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-saffron-500 text-gray-900 flex items-center justify-center font-black">
              DE
            </div>
            <div>
              <span className="font-extrabold text-white text-sm block">Doorstep Experts</span>
              <span className="text-[11px] text-gray-500">
                Created with Pride in India 🇮🇳 • Home Needs Solution
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-semibold">
            <button onClick={() => setInstructionsModalOpen(true)} className="hover:text-white transition-colors">
              Instructions
            </button>
            <button onClick={() => setAiModalOpen(true)} className="hover:text-white transition-colors">
              Doorstep AI
            </button>
            <button onClick={() => setAdminModalOpen(true)} className="hover:text-white transition-colors">
              Admin Portal
            </button>
            <button onClick={() => setOrdersModalOpen(true)} className="hover:text-white transition-colors">
              Orders ({orders.length})
            </button>
          </div>

          <p className="text-[11px] text-gray-600">
            © 2026 Doorstep Experts. All rights reserved.
          </p>

        </div>
      </footer>

      {/* ALL MODALS */}
      <BookingModal
        provider={selectedProvider}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      <OtpLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') setAdminModalOpen(true);
        }}
      />

      <GpsTrackerModal
        order={activeTrackingOrder}
        isOpen={gpsModalOpen}
        onClose={() => setGpsModalOpen(false)}
      />

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onRecommendCategory={(cat) => setSelectedCategory(cat)}
      />

      <AdminDashboard
        providers={providers}
        orders={orders}
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onAddProvider={handleAddProvider}
        onDeleteProvider={handleDeleteProvider}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <InstructionsPage
        isOpen={instructionsModalOpen}
        onClose={() => setInstructionsModalOpen(false)}
      />

      <OrdersModal
        isOpen={ordersModalOpen}
        onClose={() => setOrdersModalOpen(false)}
        orders={orders}
        onTrackOrder={(ord) => {
          setActiveTrackingOrder(ord);
          setGpsModalOpen(true);
        }}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

    </div>
  );
}
