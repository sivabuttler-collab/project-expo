import React from 'react';
import { X, ShoppingBag, MapPin, Phone, ShieldCheck, Navigation, Clock, CheckCircle2 } from 'lucide-react';

export default function OrdersModal({ isOpen, onClose, orders, onTrackOrder }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[85vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Bar */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-saffron-500" />
            <div>
              <h3 className="font-extrabold text-base">My Service Bookings</h3>
              <p className="text-xs text-gray-400">{orders.length} Active / Past Orders</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 text-xs">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="font-bold text-gray-600">No active bookings found.</p>
              <p className="text-gray-400 text-[11px]">Book an Electrician, Plumber, or repair expert to test live GPS tracking!</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div 
                key={ord.id}
                className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b pb-2 border-gray-100">
                  <div>
                    <span className="font-mono font-extrabold text-gray-900 text-sm">Order #{ord.id}</span>
                    <span className="text-gray-400 text-[10px] block">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-indiaGreen-100 text-indiaGreen-800 border border-indiaGreen-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indiaGreen-600 animate-ping"></span>
                    <span>{ord.status}</span>
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{ord.providerName}</h4>
                    <p className="text-saffron-700 font-bold text-xs">
                      {ord.providerCategory} • ID: <span className="font-mono">{ord.providerIdNo}</span>
                    </p>
                    <p className="text-gray-500 text-[11px] mt-1">
                      Slot: <strong>{ord.timeSlot}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-gray-900 block">₹{ord.amount}</span>
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Track Button */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 truncate max-w-[250px]">
                    📍 {ord.userAddress}
                  </span>

                  <button
                    onClick={() => {
                      onTrackOrder(ord);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 shadow-md transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Track Live GPS</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
