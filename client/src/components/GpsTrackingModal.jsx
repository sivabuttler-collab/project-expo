import React, { useState, useEffect } from 'react';
import { MapPin, Phone, ShieldCheck, Clock, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';

export default function GpsTrackingModal({ booking, onClose }) {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!booking) return;

    const fetchTracking = async () => {
      try {
        const res = await fetch(`/api/tracking/${booking.id}`);
        const data = await res.json();
        if (data.success) {
          setTrackingData(data);
        }
      } catch (err) {
        console.error('Tracking fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
    const interval = setInterval(fetchTracking, 3000); // update live coordinates every 3s
    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) return null;

  // Calculate pin position percentage on radar
  const progressPercent = trackingData ? trackingData.progressPercent : 35;
  const pinLeft = `${Math.min(85, Math.max(15, progressPercent))}%`;
  const pinTop = `${Math.min(75, Math.max(25, 60 - progressPercent * 0.3))}%`;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '620px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #046A38, #138808)', color: 'white' }}>
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={20} className="spin-slow" />
              Live Provider GPS Tracking
            </h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Order ID: {booking.id} • Real-time Radar Tracking</p>
          </div>
          <button className="close-btn" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>✕</button>
        </div>

        <div className="modal-body">
          {/* Radar Map Container */}
          <div className="tracking-map-container">
            <div className="radar-grid"></div>

            {/* Destination House Marker */}
            <div style={{ position: 'absolute', right: '15%', top: '30%', textAlign: 'center' }}>
              <div style={{ width: 34, height: 34, background: '#FF671F', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto', boxShadow: '0 0 12px rgba(255,103,31,0.8)' }}>
                <MapPin size={20} style={{ margin: 'auto' }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: 'white', background: 'rgba(0,0,0,0.7)', padding: '0.1rem 0.4rem', borderRadius: '4px', marginTop: 2 }}>
                Your Home
              </div>
            </div>

            {/* Moving Expert Marker */}
            <div className="tracking-pin" style={{ left: pinLeft, top: pinTop }}>
              <div className="pin-pulse">
                <div className="pin-icon">🛠️</div>
              </div>
              <div className="pin-label">
                {booking.providerName} ({trackingData?.etaMinutes || 8} mins away)
              </div>
            </div>
          </div>

          {/* Status Progress Timeline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', background: '#F8FAFC', padding: '0.9rem', borderRadius: '12px' }}>
            <div style={{ textAlign: 'center', opacity: 1 }}>
              <CheckCircle2 size={20} color="#046A38" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#046A38' }}>Booking Confirmed</div>
            </div>
            <div style={{ textAlign: 'center', opacity: progressPercent >= 30 ? 1 : 0.4 }}>
              <Navigation size={20} color="#FF671F" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF671F' }}>En Route</div>
            </div>
            <div style={{ textAlign: 'center', opacity: progressPercent >= 95 ? 1 : 0.4 }}>
              <MapPin size={20} color="#000080" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#000080' }}>Arrived at Doorstep</div>
            </div>
          </div>

          {/* Provider Contact Card */}
          <div style={{ background: '#FFF4EC', border: '1px solid rgba(255,103,31,0.2)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>ASSIGNED EXPERT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{booking.providerName}</div>
              <div style={{ fontSize: '0.82rem', color: '#046A38', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={14} /> Govt ID: {booking.providerIdNo || 'IND-AADHAAR-8831'}
              </div>
            </div>

            <a 
              href={`tel:${booking.providerContact}`} 
              className="btn btn-saffron" 
              style={{ textDecoration: 'none' }}
            >
              <Phone size={16} /> Call Partner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
