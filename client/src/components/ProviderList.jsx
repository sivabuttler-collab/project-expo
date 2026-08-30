import React from 'react';
import { Star, Phone, ShieldCheck, CheckCircle2, Clock, Award, Filter, User } from 'lucide-react';

export default function ProviderList({ 
  providers, 
  onBookProvider, 
  genderFilter, 
  setGenderFilter, 
  availabilityFilter, 
  setAvailabilityFilter,
  priceFilter,
  setPriceFilter
}) {
  return (
    <section>
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <Filter size={16} color="#FF671F" />
          <span className="filter-label">Quick Filters:</span>
          
          <select 
            className="filter-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">Gender: All</option>
            <option value="male">Male Experts</option>
            <option value="female">Female Experts</option>
          </select>

          <select 
            className="filter-select"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="available">Available Now</option>
            <option value="on-task">On-Task</option>
          </select>

          <select 
            className="filter-select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Max Price: Any</option>
            <option value="200">Under ₹200</option>
            <option value="400">Under ₹400</option>
            <option value="600">Under ₹600</option>
          </select>
        </div>

        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#046A38' }}>
          Showing {providers.length} Verified Professionals
        </div>
      </div>

      {/* Provider Cards Grid */}
      {providers.length === 0 ? (
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '16px', 
          textAlign: 'center',
          border: '1px dashed #CBD5E1'
        }}>
          <h3 style={{ fontSize: '1.3rem', color: '#0F172A', marginBottom: '0.5rem' }}>No Experts Found</h3>
          <p style={{ color: '#64748B' }}>Try resetting your filter parameters or search query.</p>
        </div>
      ) : (
        <div className="providers-grid">
          {providers.map((p) => {
            const isAvail = p.availability === 'Available';
            return (
              <div key={p.id} className="provider-card">
                <div className="provider-header">
                  <div className="provider-avatar">
                    {p.name.charAt(0)}
                  </div>

                  <div className="provider-info">
                    <div className="provider-name">
                      <span>{p.name}</span>
                      <span className="id-badge" title="Government ID Number">
                        {p.idNo}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <span className="provider-category-tag">{p.category.replace('-', ' ')}</span>
                      <span style={{ fontSize: '0.78rem', background: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                        <User size={12} style={{ display: 'inline', marginRight: 3 }} />
                        {p.gender}
                      </span>
                    </div>

                    <div className="provider-meta">
                      <span className="rating-badge">
                        <Star size={12} fill="#D97706" /> {p.rating} ({p.reviewsCount})
                      </span>

                      <span className={`availability-tag ${isAvail ? 'available' : p.availability === 'On-Task' ? 'on-task' : 'offline'}`}>
                        <span className="status-dot"></span>
                        {p.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="provider-body">
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '0.6rem' }}>
                    {p.about}
                  </p>

                  <div className="provider-details-list">
                    <div className="detail-item">
                      <span className="detail-key">GOVT BADGE</span>
                      <span className="detail-val" style={{ color: '#046A38', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ShieldCheck size={13} /> {p.badge}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">EXPERIENCE</span>
                      <span className="detail-val">{p.experienceYears} Years</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">CONTACT NO</span>
                      <span className="detail-val" style={{ color: '#000080' }}>{p.contact}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">JOBS DONE</span>
                      <span className="detail-val">{p.completedJobs}+ Completed</span>
                    </div>
                  </div>
                </div>

                <div className="provider-footer">
                  <div className="price-display">
                    <span className="price-amount">₹{p.price}</span>
                    <span className="price-unit">{p.priceUnit}</span>
                  </div>

                  <button 
                    className={`btn ${isAvail ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => onBookProvider(p)}
                    disabled={!isAvail}
                  >
                    {isAvail ? 'Book Doorstep' : 'Occupied'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
