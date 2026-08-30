import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ provider, isOpen, onClose, onConfirmBooking }) {
  if (!isOpen || !provider) return null;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState("Immediately (Within 30 Mins)");
  const [address, setAddress] = useState("Flat 402, Green Valley Apartments, Connaught Place, New Delhi");
  const [phone, setPhone] = useState("9876543210");
  const [userName, setUserName] = useState("Demo Customer");
  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay / PhonePe)");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      providerId: provider.id,
      providerName: provider.name,
      providerCategory: provider.category,
      providerContact: provider.contact,
      providerIdNo: provider.idNo,
      amount: provider.price,
      bookingDate: date,
      timeSlot,
      userAddress: address,
      userPhone: phone,
      userName,
      paymentMethod
    };

    setTimeout(() => {
      onConfirmBooking(bookingPayload);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Title */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">Confirm Service Booking</h3>
            <p className="text-xs text-gray-500">Doorstep Experts • Instant Dispatch</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Selected Provider Card Summary */}
          <div className="p-3.5 bg-saffron-50/60 border border-saffron-200 rounded-xl flex items-center gap-3">
            <img 
              src={provider.avatar} 
              alt={provider.name} 
              className="w-12 h-12 rounded-lg object-cover border border-saffron-300 shadow-xs"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-gray-900 text-sm">{provider.name}</h4>
                <span className="font-black text-saffron-700 text-sm">₹{provider.price}</span>
              </div>
              <p className="text-[11px] font-semibold text-gray-600">
                {provider.category} • ID: <span className="font-mono text-gray-800">{provider.idNo}</span>
              </p>
              <p className="text-[10px] text-indiaGreen-700 font-bold mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Govt Verified Expert
              </p>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Service Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-500 font-medium text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Time Slot</label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-500 font-medium text-xs cursor-pointer"
                >
                  <option value="Immediately (Within 30 Mins)">Immediately (Within 30 Mins)</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Your Name</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-500 font-medium"
                required
              />
            </div>
          </div>

          {/* Doorstep Address */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Doorstep Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-saffron-600" />
              <textarea 
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-500 font-medium resize-none"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                'UPI (Google Pay / PhonePe)',
                'Cash on Delivery',
                'Debit / Credit Card'
              ].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    paymentMethod === method
                      ? 'bg-indiaGreen-50 text-indiaGreen-700 border-indiaGreen-500 shadow-xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {method.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-saffron-500 via-amber-500 to-indiaGreen-600 hover:from-saffron-600 hover:to-indiaGreen-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Booking (₹{provider.price})</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
