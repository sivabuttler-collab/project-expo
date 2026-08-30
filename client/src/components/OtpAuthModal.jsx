import React, { useState } from 'react';
import { KeyRound, Smartphone, ShieldAlert, CheckCircle2, User, Lock } from 'lucide-react';

export default function OtpAuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [otpInput, setOtpInput] = useState('1234');
  const [demoOtp, setDemoOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, role })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setDemoOtp(data.demoOtp);
        setStep(2);
      } else {
        setErrorMsg(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Network error. Check server status.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: otpInput, role, name })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Network error verifying OTP.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #FF671F, #FF9933)', color: 'white' }}>
          <div>
            <h3 className="modal-title">Doorstep Experts OTP Sign-In</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Government Aadhaar & Mobile Verified Portal 🇮🇳</p>
          </div>
          <button className="close-btn" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>✕</button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <ShieldAlert size={14} style={{ display: 'inline', marginRight: 5 }} />
              {errorMsg}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748B' }}>+91</span>
                  <input 
                    type="tel" 
                    className="form-control" 
                    style={{ paddingLeft: '3.5rem' }} 
                    placeholder="9876543210" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sign-In Role</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button 
                    type="button"
                    className={`btn ${role === 'user' ? 'btn-saffron' : 'btn-outline'}`}
                    onClick={() => setRole('user')}
                    style={{ justifyContent: 'center' }}
                  >
                    Customer User
                  </button>
                  <button 
                    type="button"
                    className={`btn ${role === 'admin' ? 'btn-navy' : 'btn-outline'}`}
                    onClick={() => setRole('admin')}
                    style={{ justifyContent: 'center' }}
                  >
                    Admin Portal
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send 4-Digit OTP Code'}
              </button>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.78rem', color: '#64748B' }}>
                💡 Tip: Use any 10-digit number. Demo OTP will be <b>1234</b>.
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
                <div style={{ width: 50, height: 50, background: '#E8F5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', color: '#046A38' }}>
                  <Smartphone size={24} />
                </div>
                <h4 style={{ fontWeight: 700 }}>Enter Verification Code</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Sent to +91 {phone} (Demo Code: <b style={{ color: '#FF671F' }}>{demoOtp || '1234'}</b>)
                </p>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px', fontWeight: 800 }}
                  placeholder="1234" 
                  value={otpInput} 
                  onChange={(e) => setOtpInput(e.target.value)} 
                  maxLength={4}
                  required
                />
              </div>

              <button type="submit" className="btn btn-saffron" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP & Access Account'}
              </button>

              <button 
                type="button" 
                className="btn btn-outline btn-sm" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}
                onClick={() => setStep(1)}
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
