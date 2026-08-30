import React, { useState } from 'react';
import { Bot, Send, ShieldAlert, Sparkles, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose, onSelectExpertForBooking }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! 🙏 I am your Doorstep Mitra AI Assistant. Describe any household problem (e.g., "my ceiling fan is making noise", "kitchen tap leakage", "spark in switchboard") and I will diagnose it & recommend verified experts!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedExperts, setSuggestedExperts] = useState([]);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `🔎 **Diagnosis**: ${data.diagnosis}\n\n${data.advice}`,
            categoryName: data.categoryName
          }
        ]);
        if (data.matchingExperts && data.matchingExperts.length > 0) {
          setSuggestedExperts(data.matchingExperts);
        }
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'Apologies, I encountered an issue analyzing your query. Please select a category from the directory.' }]);
      }
    } catch (err) {
      setLoading(false);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Network connection issue. Please try again.' }]);
    }
  };

  return (
    <div className="chat-drawer">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Bot size={22} color="#FF671F" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Doorstep Mitra AI</div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>24/7 Smart Issue Diagnostic & Expert Matcher</div>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.1)' }}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-bubble ${m.sender}`}>
            {m.text.split('\n').map((line, i) => (
              <p key={i} style={{ marginBottom: i < m.text.split('\n').length - 1 ? '0.4rem' : 0 }}>
                {line}
              </p>
            ))}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B' }}>
            <Sparkles size={16} className="spin-slow" color="#FF671F" />
            Analyzing problem & searching matching experts...
          </div>
        )}

        {/* Suggested Experts Cards */}
        {suggestedExperts.length > 0 && (
          <div style={{ background: '#FFF4EC', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,103,31,0.2)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF671F', marginBottom: '0.5rem' }}>
              RECOMMENDED MATCHING EXPERTS:
            </div>
            {suggestedExperts.map((exp) => (
              <div key={exp.id} style={{ background: 'white', padding: '0.6rem 0.8rem', borderRadius: '8px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{exp.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#046A38', fontWeight: 600 }}>₹{exp.price} {exp.priceUnit} • ★ {exp.rating}</div>
                </div>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    onClose();
                    onSelectExpertForBooking(exp);
                  }}
                >
                  Book <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          className="form-control" 
          style={{ borderRadius: '20px', fontSize: '0.88rem' }}
          placeholder="Type problem (e.g. tap leaking)..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-saffron" style={{ borderRadius: '50%', width: 40, height: 40, padding: 0, justifyContent: 'center' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
