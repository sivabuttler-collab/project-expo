import React from 'react';
import { Search, MapPin, ShieldCheck, UserCheck, Bot, LayoutDashboard, HelpCircle, LogOut, Crown, Lock } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  user, 
  onOpenAuth, 
  onLogout, 
  activeView, 
  setActiveView, 
  onOpenAi,
  onOpenSubscription,
  onOpenCreatorDb,
  activeSubscription
}) {
  return (
    <>
      {/* Top Patriotic Flag Stripe Header */}
      <div className="flag-stripe-header"></div>

      <header className="navbar">
        <div className="navbar-container">
          {/* Logo & Brand */}
          <div className="brand-logo" onClick={() => setActiveView('home')}>
            <div className="logo-badge">DE</div>
            <div>
              <div className="brand-title">
                Doorstep <span>Experts</span> 🇮🇳
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                INDIVIDUAL HOME NEEDS • VERIFIED EXPERTS
              </div>
            </div>
          </div>

          {/* Location Picker */}
          <div className="location-picker">
            <MapPin size={16} />
            <span>Indiranagar, Bengaluru ▾</span>
          </div>

          {/* Search Box (Swiggy inspired) */}
          <div className="search-box-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search 'Electrician', 'Plumber', 'Aadhaar ID'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Nav Action Buttons */}
          <div className="nav-actions">
            <button 
              className={`btn btn-sm ${activeView === 'home' ? 'btn-saffron' : 'btn-outline'}`}
              onClick={() => setActiveView('home')}
            >
              Experts Directory
            </button>

            <button 
              className="btn btn-sm btn-saffron"
              onClick={onOpenSubscription}
              style={{ background: 'linear-gradient(135deg, #000080, #1E293B)', color: '#FFD700' }}
            >
              <Crown size={15} />
              {activeSubscription ? activeSubscription.planName : 'Subscribe Plans'}
            </button>

            <button 
              className="btn btn-sm btn-navy"
              onClick={onOpenAi}
            >
              <Bot size={15} />
              AI Diagnosis
            </button>

            <button 
              className="btn btn-sm btn-outline"
              onClick={onOpenCreatorDb}
              title="Creator Secret Database Access"
              style={{ borderColor: '#000080', color: '#000080' }}
            >
              <Lock size={14} /> Founder DB
            </button>

            {user && user.role === 'admin' && (
              <button 
                className={`btn btn-sm ${activeView === 'admin' ? 'btn-saffron' : 'btn-outline'}`}
                onClick={() => setActiveView('admin')}
              >
                <LayoutDashboard size={15} />
                Admin Panel
              </button>
            )}

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="id-badge" style={{ background: '#E8F5E9', color: '#046A38', fontWeight: 700 }}>
                  <UserCheck size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {user.name} ({user.role})
                </span>
                <button className="btn btn-sm btn-outline" onClick={onLogout} title="Logout">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={onOpenAuth}>
                <ShieldCheck size={16} />
                OTP Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
