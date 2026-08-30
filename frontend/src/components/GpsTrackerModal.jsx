import React, { useState, useEffect } from 'react';
import { X, Navigation, Phone, ShieldCheck, MapPin, Clock, CheckCircle2, User, ArrowRight } from 'lucide-react';

export default function GpsTrackerModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  // Live simulation state for provider movement towards customer home
  const [progress, setProgress] = useState(35); // percentage along route (0 - 100%)
  const [etaMins, setEtaMins] = useState(12);
  const [distanceKm, setDistanceKm] = useState(1.2);
  const [statusText, setStatusText] = useState("Expert En Route on Bike");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          setStatusText("Expert Arrived at your Doorstep! 📍");
          setEtaMins(0);
          setDistanceKm(0);
          return 100;
        }
        const next = prev + 5;
        const remainingKm = Math.max(0, parseFloat((1.5 * (1 - next / 100)).toFixed(1)));
        const remainingEta = Math.max(0, Math.ceil(15 * (1 - next / 100)));
        setDistanceKm(remainingKm);
        setEtaMins(remainingEta);
        if (next > 70) setStatusText("Expert Approaching your Street");
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Bar */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-saffron-500 animate-spin" />
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <span>Live GPS Provider Tracker</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-white rounded-full font-bold">
                  LIVE DEMO
                </span>
              </h3>
              <p className="text-xs text-gray-400">Order #{order.id} • {order.providerCategory}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Map Canvas Simulation */}
        <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center">
          
          {/* Simulated Map Grid lines & roads */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Road Path (SVG line) */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 50 180 Q 200 60, 400 130 T 600 80" 
              fill="none" 
              stroke="#475569" 
              strokeWidth="12" 
              strokeLinecap="round"
            />
            <path 
              d="M 50 180 Q 200 60, 400 130 T 600 80" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="4" 
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Destination Pin (User's House) */}
          <div className="absolute right-12 top-14 flex flex-col items-center group">
            <div className="px-2 py-1 bg-white text-gray-900 font-extrabold text-[10px] rounded-md shadow-lg border border-saffron-400 mb-1 animate-bounce">
              🏠 Your Doorstep
            </div>
            <div className="w-9 h-9 rounded-full bg-saffron-500 border-2 border-white flex items-center justify-center shadow-xl text-white font-bold">
              <MapPin className="w-5 h-5 fill-white" />
            </div>
          </div>

          {/* Start Origin Pin */}
          <div className="absolute left-6 bottom-8 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gray-700 border border-gray-400 flex items-center justify-center text-xs text-gray-300">
              🏢 Hub
            </div>
          </div>

          {/* Moving Provider Bike/Pin along path based on progress */}
          <div 
            className="absolute transition-all duration-1000 ease-out flex flex-col items-center z-20"
            style={{
              left: `${10 + (progress * 0.75)}%`,
              top: `${50 - Math.sin((progress / 100) * Math.PI) * 35}%`
            }}
          >
            <div className="px-2 py-1 bg-indiaGreen-600 text-white font-extrabold text-[10px] rounded-md shadow-lg mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>{order.providerName}</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-indiaGreen-500 border-2 border-white flex items-center justify-center shadow-2xl text-white font-bold text-lg animate-pulse">
              🛵
            </div>
          </div>

          {/* Map Overlay Stats Bar */}
          <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between text-white text-xs">
            <div>
              <span className="text-gray-400 text-[10px] block font-medium">ESTIMATED ARRIVAL</span>
              <span className="text-sm font-extrabold text-indiaGreen-400 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {etaMins > 0 ? `${etaMins} Mins` : 'ARRIVED'}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-700"></div>
            <div>
              <span className="text-gray-400 text-[10px] block font-medium">DISTANCE</span>
              <span className="text-sm font-extrabold text-saffron-400">
                {distanceKm} km
              </span>
            </div>
            <div className="h-6 w-px bg-slate-700"></div>
            <div>
              <span className="text-gray-400 text-[10px] block font-medium">STATUS</span>
              <span className="text-xs font-bold text-gray-200">
                {statusText}
              </span>
            </div>
          </div>

        </div>

        {/* Provider Contact Card Footer */}
        <div className="p-6 bg-white space-y-4">
          
          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-saffron-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                {order.providerName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-gray-900 text-sm">{order.providerName}</h4>
                  <ShieldCheck className="w-4 h-4 text-blue-600" title="Verified ID" />
                </div>
                <p className="text-xs text-gray-500">
                  {order.providerCategory} • ID: <span className="font-mono font-bold text-gray-800">{order.providerIdNo}</span>
                </p>
                <p className="text-[11px] text-indiaGreen-700 font-semibold mt-0.5">
                  Verified Contact: {order.providerContact}
                </p>
              </div>
            </div>

            <a
              href={`tel:${order.providerContact}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs text-white bg-indiaGreen-600 hover:bg-indiaGreen-700 shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Expert</span>
            </a>
          </div>

          <div className="text-[11px] text-gray-500 bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2">
            <span className="text-amber-700 font-extrabold text-sm">💡</span>
            <span>
              Doorstep Experts safety guarantee: Verify the provider's ID badge <strong>({order.providerIdNo})</strong> upon arrival before allowing work to begin.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
