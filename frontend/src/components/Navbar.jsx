import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Search, 
  User, 
  ShoppingBag, 
  ShieldCheck, 
  Bot, 
  HelpCircle,
  Lock,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onOpenLogin, 
  onLogout, 
  onOpenOrders, 
  ordersCount, 
  onOpenAi, 
  onOpenAdmin, 
  onOpenInstructions,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  onOpenLocationModal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      {/* 🇮🇳 Indian Tricolor Top Band */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => window.location.reload()} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-saffron-500 via-amber-500 to-indiaGreen-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-saffron-600 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-saffron-600 via-gray-900 to-indiaGreen-700 bg-clip-text text-transparent">
                    Doorstep Experts
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    🇮🇳 IN
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide">
                  Verified Home Services • An Indian Creation
                </p>
              </div>
            </div>

            {/* Swiggy Style Location Picker */}
            <div 
              onClick={onOpenLocationModal}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 cursor-pointer transition-colors"
            >
              <MapPin className="w-4 h-4 text-saffron-600" />
              <div className="text-xs">
                <span className="font-bold text-gray-900 block truncate max-w-[150px]">
                  {selectedLocation.city || "New Delhi"}
                </span>
                <span className="text-gray-500 truncate block max-w-[150px]">
                  {selectedLocation.area || "Connaught Place..."}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Electrician, Plumber, Painter, ID No..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 transition-all"
              />
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-chakraNavy bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
              title="Doorstep AI Troubleshooting Assistant"
            >
              <Bot className="w-4 h-4 text-indigo-600 animate-bounce" />
              <span className="hidden sm:inline">AI Expert</span>
            </button>

            {/* Help / Instructions */}
            <button
              onClick={onOpenInstructions}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-saffron-600 transition-colors"
            >
              <HelpCircle className="w-4.5 h-4.5 text-gray-500" />
              <span className="hidden md:inline">Instructions</span>
            </button>

            {/* My Orders */}
            <button
              onClick={onOpenOrders}
              className="relative flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-indiaGreen-600 transition-colors"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-gray-500" />
              <span className="hidden md:inline">My Orders</span>
              {ordersCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-indiaGreen-600 rounded-full">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:text-saffron-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* User Profile / OTP Login */}
            {currentUser ? (
              <div className="flex items-center gap-2 border-l pl-3 border-gray-200">
                <div className="w-8 h-8 rounded-full bg-saffron-100 border border-saffron-300 flex items-center justify-center text-saffron-700 font-bold text-xs">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-gray-900 leading-none">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-500 capitalize">{currentUser.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 shadow-sm transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login / OTP</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Electrician, Plumber, Painter..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
