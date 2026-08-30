import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  Star, 
  X,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ 
  providers, 
  orders, 
  onAddProvider, 
  onDeleteProvider, 
  onUpdateOrderStatus, 
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('providers'); // 'providers' | 'orders'
  const [showAddForm, setShowAddForm] = useState(false);

  // New Provider Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electrician',
    rating: 4.8,
    price: 350,
    priceUnit: 'hr',
    availability: 'Available Now',
    gender: 'Male',
    contact: '+91 ',
    idNo: 'DE-IND-',
    experience: '5 Years',
    completedJobs: 50,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'Professional certified expert.'
  });

  const handleSubmitProvider = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    onAddProvider(formData);
    setShowAddForm(false);
    setFormData({
      name: '',
      category: 'Electrician',
      rating: 4.8,
      price: 350,
      priceUnit: 'hr',
      availability: 'Available Now',
      gender: 'Male',
      contact: '+91 ',
      idNo: 'DE-IND-',
      experience: '5 Years',
      completedJobs: 50,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      bio: 'Professional certified expert.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[90vh]">
        
        {/* Tricolor Header */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Top Navbar */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-saffron-500 rounded-xl text-gray-900 font-black text-sm">
              ADMIN
            </div>
            <div>
              <h3 className="font-extrabold text-base">Doorstep Experts Platform Console</h3>
              <p className="text-xs text-gray-400">Manage Service Providers, Rates & Live Orders</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="p-6 bg-gray-50 border-b border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Experts</span>
            <p className="text-xl font-black text-gray-900 mt-1">{providers.length}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Orders</span>
            <p className="text-xl font-black text-saffron-600 mt-1">{orders.length}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Active Categories</span>
            <p className="text-xl font-black text-indiaGreen-700 mt-1">9 Categories</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Platform Safety</span>
            <p className="text-xl font-black text-blue-600 mt-1">100% Verified</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'providers'
                  ? 'bg-saffron-500 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Manage Experts ({providers.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-indiaGreen-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Manage User Orders ({orders.length})
            </button>
          </div>

          {activeTab === 'providers' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service Provider</span>
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 text-xs">

          {/* ADD PROVIDER MODAL / FORM */}
          {showAddForm && (
            <div className="mb-6 p-5 bg-white rounded-2xl border-2 border-saffron-400 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-extrabold text-sm text-gray-900">Register New Service Provider Member</h4>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitProvider} className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Ramesh Kumar" 
                    className="w-full px-3 py-1.5 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-1.5 border rounded-lg cursor-pointer"
                  >
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Washing Repair">Washing Repair</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Wall Painter">Wall Painter</option>
                    <option value="Water Supplier">Water Supplier</option>
                    <option value="Iron Person">Iron Person</option>
                    <option value="Scavenger / Sanitation">Scavenger / Sanitation</option>
                    <option value="AC Repair">AC Repair</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Gender</label>
                  <select 
                    value={formData.gender} 
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price Unit</label>
                  <input 
                    type="text" 
                    value={formData.priceUnit} 
                    onChange={e => setFormData({...formData, priceUnit: e.target.value})}
                    placeholder="hr / visit / room" 
                    className="w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Rating ★</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={formData.rating} 
                    onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Phone Contact</label>
                  <input 
                    type="text" 
                    value={formData.contact} 
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Govt ID Badge No</label>
                  <input 
                    type="text" 
                    value={formData.idNo} 
                    onChange={e => setFormData({...formData, idNo: e.target.value})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Availability</label>
                  <select 
                    value={formData.availability} 
                    onChange={e => setFormData({...formData, availability: e.target.value})}
                    className="w-full px-3 py-1.5 border rounded-lg"
                  >
                    <option value="Available Now">Available Now</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>

                <div className="col-span-2 md:col-span-3 pt-2 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-saffron-600 text-white rounded-xl font-bold shadow-md"
                  >
                    Save Expert Member
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* PROVIDERS TAB */}
          {activeTab === 'providers' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                    <th className="p-3">Member</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Rate</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">ID No</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {providers.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-3 flex items-center gap-2.5">
                        <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <span className="font-bold text-gray-900 block">{p.name}</span>
                          <span className="text-[10px] text-gray-500">{p.availability}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-saffron-50 text-saffron-800 rounded font-semibold text-[11px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-700">{p.gender}</td>
                      <td className="p-3 font-bold text-emerald-700">★ {p.rating}</td>
                      <td className="p-3 font-bold text-gray-900">₹{p.price}/{p.priceUnit}</td>
                      <td className="p-3 text-gray-600 font-mono">{p.contact}</td>
                      <td className="p-3 text-gray-600 font-mono">{p.idNo}</td>
                      <td className="p-3">
                        <button
                          onClick={() => onDeleteProvider(p.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Provider"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-bold text-gray-900">#{o.id}</td>
                      <td className="p-3">
                        <span className="font-bold text-gray-900 block">{o.userName}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{o.userId}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">{o.providerName}</td>
                      <td className="p-3 text-saffron-700 font-medium">{o.providerCategory}</td>
                      <td className="p-3 font-black text-gray-900">₹{o.amount}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indiaGreen-100 text-indiaGreen-800 border border-indiaGreen-300">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                          className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-bold text-[11px] cursor-pointer"
                        >
                          <option value="Placed">Placed</option>
                          <option value="En Route">En Route</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
