import React, { useState } from 'react';
import { UserPlus, LayoutDashboard, ShieldCheck, Trash2, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

export default function AdminDashboard({ providers, bookings, onAddProvider, onDeleteProvider, onUpdateBookingStatus }) {
  const [activeTab, setActiveTab] = useState('providers'); // 'providers' | 'bookings' | 'add'
  
  // Add provider form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('electrician');
  const [idNo, setIdNo] = useState('');
  const [gender, setGender] = useState('Male');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('299');
  const [priceUnit, setPriceUnit] = useState('/ hr');
  const [availability, setAvailability] = useState('Available');
  const [about, setAbout] = useState('');
  const [msg, setMsg] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !contact) {
      setMsg('Error: Name and Contact number are required.');
      return;
    }

    const formattedIdNo = idNo || `IND-AADHAAR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    onAddProvider({
      name,
      category,
      idNo: formattedIdNo,
      gender,
      contact,
      price: parseFloat(price) || 299,
      priceUnit,
      availability,
      about: about || 'Verified technician registered in Doorstep Experts network.'
    });

    setMsg('Success: New expert registered in database!');
    // Reset form
    setName('');
    setIdNo('');
    setContact('');
    setAbout('');
    setActiveTab('providers');
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', color: '#000080', fontWeight: 800 }}>
            🛡️ Admin Portal - Doorstep Experts
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Register new real & demo members, track live user bookings, and manage service categories
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'providers' ? 'btn-navy' : 'btn-outline'}`}
            onClick={() => setActiveTab('providers')}
          >
            Manage Experts ({providers.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'bookings' ? 'btn-navy' : 'btn-outline'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Customer Orders ({bookings.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'add' ? 'btn-saffron' : 'btn-outline'}`}
            onClick={() => setActiveTab('add')}
          >
            <UserPlus size={15} /> Add New Member
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#FFF4EC', border: '1px solid rgba(255,103,31,0.2)', padding: '1.25rem', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.8rem', color: '#FF671F', fontWeight: 800 }}>REGISTERED EXPERTS</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{providers.length} Members</div>
        </div>
        <div style={{ background: '#E8F5E9', border: '1px solid rgba(19,136,8,0.2)', padding: '1.25rem', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.8rem', color: '#046A38', fontWeight: 800 }}>ACTIVE USER BOOKINGS</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{bookings.length} Orders</div>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid rgba(0,0,128,0.2)', padding: '1.25rem', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.8rem', color: '#000080', fontWeight: 800 }}>TOTAL SERVICE VALUE</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#000080' }}>₹{totalRevenue}</div>
        </div>
      </div>

      {msg && (
        <div style={{ background: '#F0FDF4', color: '#166534', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 600 }}>
          {msg}
        </div>
      )}

      {/* TAB 1: Add New Provider */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddSubmit} style={{ maxWidth: '680px', background: '#F8FAFC', padding: '1.8rem', borderRadius: '16px', border: '1px solid #CBD5E1' }}>
          <h3 style={{ marginBottom: '1.2rem', fontFamily: 'Outfit, sans-serif', color: '#0F172A' }}>
            Register New Service Member / Technician
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Suresh Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Category *</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="electrician">Electrician</option>
                <option value="plumber">Plumber</option>
                <option value="washing-repair">Washing Repair</option>
                <option value="carpenter">Carpenter</option>
                <option value="wall-painter">Wall Painter</option>
                <option value="water-supplier">Water Supplier</option>
                <option value="iron-person">Ironing Person</option>
                <option value="scavenger">Sanitation / Cleaner</option>
                <option value="ac-repair">AC Repair & Servicing</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Government ID Number (Aadhaar / Voter ID)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. IND-AADHAAR-9900-1122"
                value={idNo}
                onChange={(e) => setIdNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Mobile Number *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="+91 98765 00000"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price Rate (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="299"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Specialization / About Bio</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Describe experience, certifications, and skills..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-saffron" style={{ width: '100%', justifyContent: 'center' }}>
            <UserPlus size={18} /> Register Expert to Database
          </button>
        </form>
      )}

      {/* TAB 2: Providers Table */}
      {activeTab === 'providers' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '0.8rem' }}>ID & Name</th>
                <th style={{ padding: '0.8rem' }}>Govt ID No</th>
                <th style={{ padding: '0.8rem' }}>Category</th>
                <th style={{ padding: '0.8rem' }}>Gender</th>
                <th style={{ padding: '0.8rem' }}>Contact</th>
                <th style={{ padding: '0.8rem' }}>Price</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
                <th style={{ padding: '0.8rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.8rem', fontWeight: 700 }}>
                    {p.name}
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.id}</div>
                  </td>
                  <td style={{ padding: '0.8rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.idNo}</td>
                  <td style={{ padding: '0.8rem', textTransform: 'capitalize' }}>{p.category}</td>
                  <td style={{ padding: '0.8rem' }}>{p.gender}</td>
                  <td style={{ padding: '0.8rem', color: '#000080' }}>{p.contact}</td>
                  <td style={{ padding: '0.8rem', fontWeight: 800, color: '#046A38' }}>₹{p.price} {p.priceUnit}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span className={`availability-tag ${p.availability === 'Available' ? 'available' : 'on-task'}`}>
                      {p.availability}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem' }}>
                    <button 
                      className="btn btn-sm btn-outline" 
                      style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
                      onClick={() => onDeleteProvider(p.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Customer Bookings */}
      {activeTab === 'bookings' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '0.8rem' }}>Booking ID</th>
                <th style={{ padding: '0.8rem' }}>Customer Details</th>
                <th style={{ padding: '0.8rem' }}>Assigned Expert</th>
                <th style={{ padding: '0.8rem' }}>Address</th>
                <th style={{ padding: '0.8rem' }}>Amount</th>
                <th style={{ padding: '0.8rem' }}>Order Status</th>
                <th style={{ padding: '0.8rem' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.8rem', fontWeight: 800, color: '#FF671F' }}>{b.id}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <div style={{ fontWeight: 700 }}>{b.customerName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{b.customerPhone}</div>
                  </td>
                  <td style={{ padding: '0.8rem', fontWeight: 700 }}>{b.providerName}</td>
                  <td style={{ padding: '0.8rem', fontSize: '0.82rem', maxWidth: '220px' }}>{b.customerAddress}</td>
                  <td style={{ padding: '0.8rem', fontWeight: 800, color: '#046A38' }}>₹{b.price}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span className="id-badge" style={{ background: b.status === 'Completed' ? '#E8F5E9' : '#FFF4EC', color: b.status === 'Completed' ? '#046A38' : '#FF671F', fontWeight: 700 }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem' }}>
                    <select 
                      className="filter-select"
                      value={b.status}
                      onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                    >
                      <option value="En Route">En Route</option>
                      <option value="Arrived">Arrived</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
