import React from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, MapPin, Zap, Lock, HelpCircle } from 'lucide-react';

export default function InstructionsPage({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[85vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Bar */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-saffron-500" />
            <div>
              <h3 className="font-extrabold text-base">Instructions & Platform Safety Guide</h3>
              <p className="text-xs text-gray-400">Doorstep Experts • An Indian Creation</p>
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
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
          
          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-saffron-100 text-saffron-800 rounded">How to Book in 3 Simple Steps</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <div className="p-4 bg-saffron-50/50 border border-saffron-200 rounded-xl space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-saffron-500 text-white font-extrabold flex items-center justify-center text-xs">
                  1
                </div>
                <h5 className="font-bold text-gray-900 text-xs">Select Category & Filter</h5>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  Choose Electrician, Plumber, Washing Repair, Carpenter, Wall Painter, Water Supplier, Ironing or Scavenger experts.
                </p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1.5 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
                  2
                </div>
                <h5 className="font-bold text-gray-900 text-xs">Diagnose with AI or Click Book</h5>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  Use "Doorstep AI Expert" to troubleshoot your issue, or pick an expert directly by rating, price, and gender.
                </p>
              </div>

              <div className="p-4 bg-indiaGreen-50/50 border border-indiaGreen-200 rounded-xl space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-indiaGreen-600 text-white font-extrabold flex items-center justify-center text-xs">
                  3
                </div>
                <h5 className="font-bold text-gray-900 text-xs">Track Live GPS Arrival</h5>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  Confirm booking and track the expert's bike location live on the GPS map until they reach your doorstep.
                </p>
              </div>

            </div>
          </div>

          {/* Safety Verification Rules */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Doorstep Verification & Safety Guidelines for Homes</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-blue-800 list-disc list-inside">
              <li>
                <strong>Always check the Govt ID Card Badge:</strong> Compare the provider's badge number (e.g., <code>DE-ELC-8842</code>) on the app before opening the door.
              </li>
              <li>
                <strong>Transparent Upfront Pricing:</strong> Fixed rates per hour/visit. No hidden diagnostic fee or surcharge.
              </li>
              <li>
                <strong>Gender Preference Option:</strong> Select male or female professionals according to your household comfort.
              </li>
            </ul>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 mb-3">Frequently Asked Questions (FAQ)</h4>
            <div className="space-y-2.5">
              
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-gray-900 block font-bold mb-1">Q: How does OTP Authentication work?</strong>
                <p className="text-gray-600 text-[11px]">
                  Enter your mobile number, tap 'Send OTP', and enter the 6-digit code. In this demo, the code <code>123456</code> is automatically provided for fast testing.
                </p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-gray-900 block font-bold mb-1">Q: How do I test the Live GPS Tracking?</strong>
                <p className="text-gray-600 text-[11px]">
                  After placing any booking, open 'My Orders' and click <strong>'Track Live GPS'</strong> to see the interactive animated bike moving on the map towards your doorstep!
                </p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <strong className="text-gray-900 block font-bold mb-1">Q: Can we add real members and providers later?</strong>
                <p className="text-gray-600 text-[11px]">
                  Yes! Use the Admin Console button on the top right to register real service members, set rates, or remove demo entries.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
