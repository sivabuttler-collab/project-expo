import React, { useState } from 'react';
import { X, Smartphone, KeyRound, ShieldCheck, ArrowRight, UserCheck, Lock } from 'lucide-react';

export default function OtpLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [phone, setPhone] = useState('9876543210');
  const [role, setRole] = useState('user');
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP
  const [otp, setOtp] = useState('');
  const [demoOtpCode, setDemoOtpCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();

      if (data.success) {
        setDemoOtpCode(data.demoOtp);
        setStep(2);
        setOtp(data.demoOtp); // Auto-fills demo code for convenience
      } else {
        setError(data.error || "Failed sending OTP.");
      }
    } catch (e) {
      setError("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, role })
      });
      const data = await res.json();

      if (data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.error || "Invalid OTP code.");
      }
    } catch (e) {
      setError("Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">
              {role === 'admin' ? 'Admin Portal Login' : 'User Account Sign In'}
            </h3>
            <p className="text-xs text-gray-500">Doorstep Experts OTP Authentication</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 text-xs">

          {/* Role Toggle Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'user' ? 'bg-white text-saffron-600 shadow-xs' : 'text-gray-600'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Customer User</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'admin' ? 'bg-white text-indiaGreen-700 shadow-xs' : 'text-gray-600'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Admin Manager</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Enter Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-extrabold text-gray-500 text-xs">
                    +91
                  </span>
                  <input 
                    type="text"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 font-extrabold text-sm tracking-wider"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-extrabold text-white bg-saffron-500 hover:bg-saffron-600 shadow-md transition-all flex items-center justify-center gap-2 text-xs"
              >
                <span>{loading ? 'Sending OTP...' : 'Send 6-Digit OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              {/* Simulated SMS Alert Box */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl space-y-1">
                <span className="font-extrabold block text-xs">📱 Simulated SMS Sent to +91 {phone}</span>
                <p className="text-[11px]">Your OTP for Doorstep Experts is: <strong className="text-emerald-700 font-mono text-sm underline">{demoOtpCode}</strong></p>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Enter 6-Digit Verification Code</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indiaGreen-500 font-mono font-extrabold text-base tracking-widest text-center"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-2 text-gray-500 font-bold hover:text-gray-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-extrabold text-white bg-indiaGreen-600 hover:bg-indiaGreen-700 shadow-md transition-all text-xs"
                >
                  {loading ? 'Verifying...' : 'Verify OTP & Login'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
