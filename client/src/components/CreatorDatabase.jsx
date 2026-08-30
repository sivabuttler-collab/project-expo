import React, { useState } from 'react';
import { Lock, ShieldAlert, Key, Database, RefreshCw, Layers, ShieldCheck, Download, Code } from 'lucide-react';

export default function CreatorDatabase({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [creatorToken, setCreatorToken] = useState('');
  const [databaseData, setDatabaseData] = useState(null);
  const [activeDbTab, setActiveDbTab] = useState('providers'); // 'providers' | 'bookings' | 'subscriptions' | 'raw'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/creator/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setIsAuthenticated(true);
        setCreatorToken(data.creatorToken);
        fetchFullDatabase(data.creatorToken);
      } else {
        setErrorMsg(data.message || 'Incorrect Creator Password. Access Denied.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Network error authenticating creator portal.');
    }
  };

  const fetchFullDatabase = async (token) => {
    try {
      const res = await fetch('/api/creator/database', {
        headers: { 'x-creator-token': token }
      });
      const data = await res.json();
      if (data.success) {
        setDatabaseData(data);
      }
    } catch (err) {
      console.error('Database fetch error:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: isAuthenticated ? '950px' : '450px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #000080, #0F172A)', color: 'white' }}>
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={18} color="#FF671F" />
              Creator & Founder Master Database Portal
            </h3>
            <p style={{ fontSize: '0.78rem', opacity: 0.85 }}>Confidential Founder View • Encrypted Secret Key Auth</p>
          </div>
          <button className="close-btn" onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>✕</button>
        </div>

        <div className="modal-body">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: 54, height: 54, background: '#EFF6FF', borderRadius: '50%', color: '#000080', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                  <Key size={26} />
                </div>
                <h4 style={{ fontWeight: 800 }}>Enter Creator Master Password</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Restricted access for the project creator & founder only.
                </p>
              </div>

              {errorMsg && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <ShieldAlert size={14} style={{ display: 'inline', marginRight: 5 }} />
                  {errorMsg}
                </div>
              )}

              <div className="form-group">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter secret key..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Authenticating...' : 'Unlock Founder Database'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.78rem', color: '#64748B' }}>
                💡 Default Master Key: <code style={{ background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#FF671F', fontWeight: 700 }}>doorstep2026</code>
              </div>
            </form>
          ) : (
            <div>
              {/* Founder Header Stats */}
              {databaseData && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#FFF4EC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,103,31,0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#FF671F', fontWeight: 800 }}>SERVICE REVENUE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>₹{databaseData.stats.serviceRevenue}</div>
                  </div>
                  <div style={{ background: '#E8F5E9', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(19,136,8,0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#046A38', fontWeight: 800 }}>SUBSCRIPTION REVENUE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>₹{databaseData.stats.subscriptionRevenue}</div>
                  </div>
                  <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,128,0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#000080', fontWeight: 800 }}>TOTAL FOUNDER VALUE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#000080' }}>₹{databaseData.stats.grandTotalRevenue}</div>
                  </div>
                  <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(217,119,6,0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 800 }}>ACTIVE SUBSCRIBERS</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706' }}>{databaseData.stats.totalSubscribers} Members</div>
                  </div>
                </div>
              )}

              {/* DB Nav Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <button 
                  className={`btn btn-sm ${activeDbTab === 'providers' ? 'btn-navy' : 'btn-outline'}`}
                  onClick={() => setActiveDbTab('providers')}
                >
                  Providers ({databaseData?.databases?.providers?.length || 0})
                </button>
                <button 
                  className={`btn btn-sm ${activeDbTab === 'bookings' ? 'btn-navy' : 'btn-outline'}`}
                  onClick={() => setActiveDbTab('bookings')}
                >
                  User Bookings ({databaseData?.databases?.bookings?.length || 0})
                </button>
                <button 
                  className={`btn btn-sm ${activeDbTab === 'subscriptions' ? 'btn-navy' : 'btn-outline'}`}
                  onClick={() => setActiveDbTab('subscriptions')}
                >
                  Subscriptions ({databaseData?.databases?.subscriptions?.length || 0})
                </button>
                <button 
                  className={`btn btn-sm ${activeDbTab === 'raw' ? 'btn-saffron' : 'btn-outline'}`}
                  onClick={() => setActiveDbTab('raw')}
                >
                  <Code size={14} /> Raw JSON DB
                </button>
              </div>

              {/* DB Views */}
              <div style={{ maxHeight: '380px', overflowY: 'auto', background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                {activeDbTab === 'raw' ? (
                  <pre style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#0F172A', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(databaseData?.databases, null, 2)}
                  </pre>
                ) : activeDbTab === 'subscriptions' ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '2px solid #CBD5E1' }}>
                        <th style={{ padding: '0.5rem' }}>Sub ID</th>
                        <th style={{ padding: '0.5rem' }}>User ID & Name</th>
                        <th style={{ padding: '0.5rem' }}>Plan</th>
                        <th style={{ padding: '0.5rem' }}>Price</th>
                        <th style={{ padding: '0.5rem' }}>Status</th>
                        <th style={{ padding: '0.5rem' }}>Txn ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {databaseData?.databases?.subscriptions?.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                          <td style={{ padding: '0.5rem', fontWeight: 700, color: '#000080' }}>{s.id}</td>
                          <td style={{ padding: '0.5rem' }}>{s.userName} ({s.userId})</td>
                          <td style={{ padding: '0.5rem', fontWeight: 700 }}>{s.planName}</td>
                          <td style={{ padding: '0.5rem', color: '#046A38', fontWeight: 800 }}>₹{s.price}</td>
                          <td style={{ padding: '0.5rem' }}>
                            <span style={{ background: s.status === 'Active' ? '#E8F5E9' : '#F1F5F9', color: s.status === 'Active' ? '#046A38' : '#64748B', padding: '0.15rem 0.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem' }}>
                              {s.status}
                            </span>
                          </td>
                          <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.78rem' }}>{s.paymentTxn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <pre style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#0F172A', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(databaseData?.databases[activeDbTab], null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
