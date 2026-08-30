import React, { useState } from 'react';
import { X, MapPin, Check, Search } from 'lucide-react';

const CITIES = [
  { city: "New Delhi", area: "Connaught Place, Central Delhi" },
  { city: "Mumbai", area: "Bandra West, Marine Drive" },
  { city: "Bengaluru", area: "Indiranagar, Koramangala" },
  { city: "Hyderabad", area: "Jubilee Hills, HITECH City" },
  { city: "Chennai", area: "T. Nagar, Anna Nagar" },
  { city: "Kolkata", area: "Park Street, Salt Lake" },
  { city: "Pune", area: "Koregaon Park, Viman Nagar" },
  { city: "Ahmedabad", area: "CG Road, Satellite" }
];

export default function LocationModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = CITIES.filter(
    c => c.city.toLowerCase().includes(query.toLowerCase()) || c.area.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Select Delivery Location</h3>
            <p className="text-xs text-gray-500">Doorstep Experts Local Network</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or locality..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-saffron-500 font-medium"
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1 divide-y divide-gray-100">
            {filtered.map((item, idx) => {
              const isSelected = selectedLocation.city === item.city;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectLocation(item);
                    onClose();
                  }}
                  className="p-3 flex items-center justify-between hover:bg-saffron-50/50 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-saffron-600' : 'text-gray-400'}`} />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{item.city}</h4>
                      <p className="text-[11px] text-gray-500">{item.area}</p>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-saffron-600 font-extrabold" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
