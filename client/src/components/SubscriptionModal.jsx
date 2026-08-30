import React, { useState } from 'react';
import { Crown, CheckCircle2, Zap, ShieldCheck, QrCode, Smartphone, CreditCard, Sparkles } from 'lucide-react';

export default function SubscriptionModal({ isOpen, onClose, user, onSubscribeSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('premium'); // 'simple' | 'premium' | 'all-access'
  const [step, setStep] = useState(1); // 1: Choose Plan, 2: Payment Checkout
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'simple',
      name: 'Simple Plan',
      price: 150,
      period: '/ month',
      badge: 'Basic Entry',
      color: '#FF671F',
      features: [
        'Standard Doorstep Booking Access',
        '2 Free Expert Phone Consultations / Month',
        'Govt Verified Partner Assurance',
        'Standard Arrival (< 30 Mins)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 200,
      period: '/ month',
      badge: 'Most Popular',
      popular: true,
      color: '#046A38',
      features: [
        'Priority Express Arrival (< 15 Mins)',
        'Unlimited Doorstep Mitra AI Diagnosis',
        '10% Discount on Service Labor Charges',
        'Dedicated Account Manager Support'
      ]
    },
    {
      id: 'all-access',
      name: 'All-Access VIP',
      price: 300,
      period: '/ month',
      badge: 'Creator VIP',
      color: '#000080',
      features: [
        '0 Platform Service Convenience Fee',
        'Free 1 x 20L BIS Drinking Water Can Monthly',
        'Priority 24/7 Hotline Support',
        'Full Access to Custom Requests',
        'Family Account Sharing (Up to 4)'
      ]
    }
  ];

  const planObj = plans.find(p => p.id === selectedPlan);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user ? user.id : 'USER-GUEST',
          userName: user ? user.name : 'Valued Resident',
          planId: selectedPlan,
          paymentMethod: paymentMethod.toUpperCase()
        })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccessMsg(`🎉 Congratulations! You are now subscribed to ${planObj.name}!`);
        setTimeout(() => {
          onSubscribeSuccess(data.subscription);
          onClose();
        }, 1800);
      } else {
        alert(data.message || 'Payment processing error.');
      }
    } catch (err) {
      setLoading(false);
      alert('Network error during checkout.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '820px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #000080, #1E293B)', color: 'white' }}>
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Crown color="#FFD700" size={24} />
              Doorstep Experts Membership Subscription
            </h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>Unlock VIP Priority, Zero Platform Fees & Free AI Diagnosis 🇮🇳</p>
          </div>
          <button className="close-btn" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>✕</button>
        </div>

        <div className="modal-body">
          {successMsg ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: 64, height: 64, background: '#E8F5E9', color: '#046A38', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{successMsg}</h3>
              <p style={{ color: '#64748B' }}>Your membership benefits are activated immediately on your profile.</p>
            </div>
          ) : step === 1 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {plans.map((p) => {
                  const isSel = selectedPlan === p.id;
                  return (
                    <div 
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      style={{
                        background: isSel ? '#F8FAFC' : 'white',
                        border: isSel ? `2px solid ${p.color}` : '1px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        cursor: 'pointer',
                        position: 'relative',
                        boxShadow: isSel ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {p.popular && (
                        <span style={{ position: 'absolute', top: '-10px', right: '12px', background: '#046A38', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                          BEST VALUE
                        </span>
                      )}

                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: p.color, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {p.badge}
                      </div>

                      <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800 }}>{p.name}</h4>

                      <div style={{ margin: '0.8rem 0' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>₹{p.price}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{p.period}</span>
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', color: '#334155', lineHeight: '1.6' }}>
                        {p.features.map((f, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.3rem' }}>
                            <CheckCircle2 size={13} color={p.color} style={{ flexShrink: 0, marginTop: 3 }} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <button 
                className="btn btn-saffron" 
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.85rem' }}
                onClick={() => setStep(2)}
              >
                Proceed with {planObj.name} (₹{planObj.price}/mo) →
              </button>
            </>
          ) : (
            <div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>SELECTED SUBSCRIPTION</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{planObj.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#046A38' }}>₹{planObj.price}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Billed Monthly</div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Payment Method</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <button 
                    type="button" 
                    className={`btn ${paymentMethod === 'upi' ? 'btn-saffron' : 'btn-outline'}`}
                    onClick={() => setPaymentMethod('upi')}
                    style={{ justifyContent: 'center' }}
                  >
                    <Smartphone size={16} /> UPI / GPay
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${paymentMethod === 'qr' ? 'btn-saffron' : 'btn-outline'}`}
                    onClick={() => setPaymentMethod('qr')}
                    style={{ justifyContent: 'center' }}
                  >
                    <QrCode size={16} /> Scan QR
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${paymentMethod === 'card' ? 'btn-saffron' : 'btn-outline'}`}
                    onClick={() => setPaymentMethod('card')}
                    style={{ justifyContent: 'center' }}
                  >
                    <CreditCard size={16} /> Debit / Credit
                  </button>
                </div>
              </div>

              {paymentMethod === 'qr' ? (
                <div style={{ textAlign: 'center', background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px dashed #CBD5E1', marginBottom: '1.2rem' }}>
                  <div style={{ width: 140, height: 140, background: '#F1F5F9', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '2px solid #000080', borderRadius: '12px' }}>
                    <QrCode size={100} color="#000080" style={{ margin: 'auto' }} />
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#046A38' }}>
                    Scan QR code with GPay, PhonePe, Paytm, or BHIM UPI
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Virtual Payment Address (VPA / UPI ID)</label>
                  <input type="text" className="form-control" defaultValue="9876543210@upi" />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(1)}>
                  ← Back to Plans
                </button>
                <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Processing Payment...' : `Pay ₹${planObj.price} & Activate Subscription`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
