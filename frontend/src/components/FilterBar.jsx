import React from 'react';
import { SlidersHorizontal, Star, IndianRupee, MapPin, CheckCircle2, UserCheck } from 'lucide-react';

export default function FilterBar({ 
  sortBy, 
  setSortBy, 
  genderFilter, 
  setGenderFilter, 
  availabilityFilter, 
  setAvailabilityFilter,
  totalCount
}) {
  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <SlidersHorizontal className="w-4 h-4 text-saffron-600" />
            <span>Found <strong className="text-gray-900">{totalCount}</strong> verified experts</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="rating">Top Rated ★</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="distance">Nearest First</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
              <UserCheck className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-gray-500 font-medium">Gender:</span>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male Professionals</option>
                <option value="Female">Female Professionals</option>
              </select>
            </div>

            {/* Availability Filter */}
            <button
              onClick={() => setAvailabilityFilter(availabilityFilter === 'Available Now' ? 'All' : 'Available Now')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                availabilityFilter === 'Available Now'
                  ? 'bg-indiaGreen-50 text-indiaGreen-700 border-indiaGreen-300 font-bold'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-indiaGreen-500 animate-ping inline-block"></span>
              <span>Available Now</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
