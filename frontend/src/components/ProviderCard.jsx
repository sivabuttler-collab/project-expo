import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Briefcase, 
  Clock, 
  CheckCircle2,
  Calendar,
  Award
} from 'lucide-react';

export default function ProviderCard({ provider, onBook, onQuickCall }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1">
      
      {/* Card Header & Avatar */}
      <div className="relative p-5 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 border-b border-gray-100 flex items-start justify-between gap-4">
        
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img 
              src={provider.avatar} 
              alt={provider.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
            />
            {/* Availability Dot */}
            <div 
              className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1 shadow-sm ${
                provider.availability === 'Available Now' ? 'bg-indiaGreen-600' : 'bg-gray-500'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>{provider.availability === 'Available Now' ? 'Active' : 'Busy'}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-extrabold text-gray-900 group-hover:text-saffron-600 transition-colors">
                {provider.name}
              </h3>
              <ShieldCheck className="w-4 h-4 text-blue-600 fill-blue-50" title="Govt Verified ID" />
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-saffron-50 text-saffron-700 border border-saffron-200 rounded-md">
                {provider.category}
              </span>
              <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {provider.gender}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Pill */}
        <div className="flex items-center gap-1 bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
          <span>{provider.rating}</span>
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>

      </div>

      {/* Card Body & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        
        {/* Info Grid */}
        <div className="space-y-2.5 text-xs text-gray-600">
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Verified ID No:
            </span>
            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
              {provider.idNo}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              Experience & Jobs:
            </span>
            <span className="font-semibold text-gray-800">
              {provider.experience} • {provider.completedJobs}+ Done
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Distance:
            </span>
            <span className="font-bold text-gray-900">
              {provider.distanceKm} km away
            </span>
          </div>

          {provider.bio && (
            <p className="text-[11px] text-gray-500 italic line-clamp-2 bg-gray-50 p-2 rounded-lg border border-gray-100 mt-2">
              "{provider.bio}"
            </p>
          )}

        </div>

        {/* Price & CTA Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Rate Charge</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-900">₹{provider.price}</span>
              <span className="text-xs text-gray-500 font-medium">/{provider.priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickCall(provider.contact)}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              title={`Call ${provider.name}`}
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              onClick={() => onBook(provider)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 shadow-md hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
