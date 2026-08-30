import React from 'react';
import { 
  Zap, 
  Droplet, 
  Shirt, 
  Hammer, 
  Paintbrush, 
  Package, 
  Sparkles, 
  Flame, 
  Wind,
  Grid
} from 'lucide-react';

const CATEGORIES = [
  { id: 'All', name: 'All Services', icon: Grid, badge: 'Popular' },
  { id: 'Electrician', name: 'Electricians', icon: Zap, color: 'text-amber-500 bg-amber-50' },
  { id: 'Plumber', name: 'Plumbers', icon: Droplet, color: 'text-blue-500 bg-blue-50' },
  { id: 'Washing Repair', name: 'Washing Repair', icon: Shirt, color: 'text-indigo-500 bg-indigo-50' },
  { id: 'Carpenter', name: 'Carpenters', icon: Hammer, color: 'text-orange-600 bg-orange-50' },
  { id: 'Wall Painter', name: 'Wall Painters', icon: Paintbrush, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'Water Supplier', name: 'Water Suppliers', icon: Package, color: 'text-cyan-600 bg-cyan-50' },
  { id: 'Iron Person', name: 'Ironing Persons', icon: Flame, color: 'text-rose-500 bg-rose-50' },
  { id: 'Scavenger / Sanitation', name: 'Scavengers/Cleaners', icon: Sparkles, color: 'text-teal-600 bg-teal-50' },
  { id: 'AC Repair', name: 'AC Technicians', icon: Wind, color: 'text-sky-500 bg-sky-50' }
];

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span>Home Need Experts</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-saffron-100 text-saffron-700 rounded-full border border-saffron-200">
                Verified & Rated
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              Select category to view available experts near your location
            </p>
          </div>
        </div>

        {/* Categories Scrollable Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs border ${
                  isSelected
                    ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white border-saffron-600 shadow-md scale-[1.02]'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-1 rounded-lg ${isSelected ? 'bg-white/20 text-white' : (cat.color || 'bg-gray-200 text-gray-700')}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="whitespace-nowrap">{cat.name}</span>
                {cat.badge && !isSelected && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-indiaGreen-100 text-indiaGreen-700 rounded font-semibold">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
