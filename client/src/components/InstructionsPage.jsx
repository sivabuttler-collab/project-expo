import React from 'react';
import { ShieldCheck, MapPin, Bot, Smartphone, CheckCircle2, UserPlus, HeartHandshake } from 'lucide-react';

export default function InstructionsPage({ onStartBooking }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
      {/* Patriotic Banner */}
      <div style={{ background: 'linear-gradient(135deg, #FFF6EE, #F0FDF4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,103,31,0.2)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '2.5rem' }}>🇮🇳</div>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', color: '#0F172A', fontWeight: 800 }}>
            Doorstep Experts — User & Partner Guide
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Empowering local Indian home service professionals with digital connectivity, background verification, and live tracking.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* For Customers */}
        <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #CBD5E1' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#FF671F', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} /> How Customers Book
          </h3>
          <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: '#334155', fontSize: '0.92rem' }}>
            <li><b>Select Service Category</b>: Choose Electrician, Plumber, Washing Machine Repair, Carpenter, Wall Painter, Water Supplier, Ironing, or Sanitation.</li>
            <li><b>Filter & Review Profiles</b>: Check expert Govt ID No, Gender, Rate, Rating, and Availability.</li>
            <li><b>OTP Login Verification</b>: Instant 4-digit OTP login for secure booking.</li>
            <li><b>Live Radar GPS Tracking</b>: Track your technician on radar map with ETA countdown.</li>
            <li><b>Inbuilt AI Diagnosis</b>: Type any household problem in plain English/Hinglish to receive automated safety tips + matched experts!</li>
          </ol>
        </div>

        {/* For Service Partners */}
        <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #CBD5E1' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#046A38', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus size={20} /> How Partners Register
          </h3>
          <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: '#334155', fontSize: '0.92rem' }}>
            <li><b>Identity Verification</b>: Provide valid Government Aadhaar card or Voter ID number.</li>
            <li><b>Admin Verification</b>: Admin logs into Admin Panel to register partner credentials.</li>
            <li><b>Flexible Rates</b>: Set transparent hourly or task-based service pricing.</li>
            <li><b>Direct Direct Customer Calls</b>: Receive direct bookings and live tracking requests.</li>
            <li><b>Zero Middleman Exploitation</b>: 100% earnings paid directly to the service expert.</li>
          </ol>
        </div>
      </div>

      {/* Safety & Security Section */}
      <div style={{ background: '#EFF6FF', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0,0,128,0.2)', marginBottom: '2rem' }}>
        <h4 style={{ color: '#000080', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} /> Government ID & Safety Protocol
        </h4>
        <p style={{ fontSize: '0.9rem', color: '#1E293B', lineHeight: '1.6' }}>
          Every technician listed on Doorstep Experts carries an official digital ID badge with Aadhaar/Voter registration details. Customers are encouraged to verify the ID badge before allowing partners into their premises.
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-saffron" onClick={onStartBooking} style={{ fontSize: '1.1rem', padding: '0.85rem 2rem' }}>
          Explore Doorstep Experts Directory
        </button>
      </div>
    </div>
  );
}
