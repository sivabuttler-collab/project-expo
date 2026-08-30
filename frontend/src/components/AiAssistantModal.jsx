import React, { useState } from 'react';
import { X, Bot, Send, ShieldAlert, CheckCircle2, Sparkles, Wrench, ArrowRight } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose, onRecommendCategory }) {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Namaste! 🙏 I am Doorstep AI Expert. Describe any household problem (electrical spark, pipe leak, washing machine noise, damp wall, jammed lock) and I will diagnose it & recommend safety steps!",
      suggestions: [
        "Electric fan buzzing & burning smell",
        "Bathroom tap water leaking continuously",
        "Washing machine making loud drum noise",
        "Need fresh drinking water jar urgently",
        "Wall paint peeling off due to dampness"
      ]
    }
  ]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const updatedMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMsgs);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueQuery: query })
      });
      const data = await res.json();

      if (data.success) {
        setMessages([
          ...updatedMsgs,
          {
            sender: 'ai',
            aiData: data.aiResponse,
            text: data.aiResponse.recommendedMessage
          }
        ]);
      } else {
        setMessages([
          ...updatedMsgs,
          { sender: 'ai', text: "Unable to process query right now. Please try choosing a service category." }
        ]);
      }
    } catch (e) {
      setMessages([
        ...updatedMsgs,
        { sender: 'ai', text: "Network connection error. Please select a service manually." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[85vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Bar */}
        <div className="px-6 py-4 bg-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-700 border border-indigo-500 flex items-center justify-center">
              <Bot className="w-6 h-6 text-saffron-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <span>Doorstep AI Troubleshooter</span>
                <span className="text-[10px] px-2 py-0.5 bg-saffron-500 text-gray-900 rounded-full font-bold">
                  24/7 AI
                </span>
              </h3>
              <p className="text-xs text-indigo-200">Instant Diagnosis & Safety Tips</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-indigo-300 hover:text-white rounded-lg hover:bg-indigo-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3.5 rounded-2xl shadow-xs ${
                  msg.sender === 'user' 
                    ? 'bg-saffron-600 text-white rounded-br-none font-medium'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed text-xs">{msg.text}</p>

                {/* AI Structured Response Card */}
                {msg.aiData && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5">
                    
                    {/* Safety Alert */}
                    <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl font-bold flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{msg.aiData.safetyAdvice}</span>
                    </div>

                    {/* Diagnostic solution */}
                    <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded-xl text-gray-700">
                      <strong className="text-indigo-900 block mb-0.5">Diagnostic Analysis:</strong>
                      <span>{msg.aiData.solution}</span>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={() => {
                        onRecommendCategory(msg.aiData.category);
                        onClose();
                      }}
                      className="w-full py-2.5 px-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-saffron-500 to-indiaGreen-600 hover:from-saffron-600 hover:to-indiaGreen-700 shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>View & Book {msg.aiData.category}s</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                  </div>
                )}

                {/* Quick suggestions pills */}
                {msg.suggestions && (
                  <div className="mt-3 pt-2 space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Tap common problem:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-saffron-100 hover:text-saffron-800 text-gray-700 rounded-lg text-[11px] font-semibold border border-gray-200 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs p-2 bg-white rounded-xl w-max border border-indigo-100">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Doorstep AI is analyzing safety steps...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type issue (e.g. wire spark, pipe leak, fan noise)..."
              className="flex-1 px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
