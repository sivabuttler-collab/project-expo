const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Paths to JSON DB
const PROVIDERS_FILE = path.join(__dirname, 'data', 'providers.json');
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json');
const SUBSCRIPTIONS_FILE = path.join(__dirname, 'data', 'subscriptions.json');

// Master Secret Password for Creator / Founder Database Access
const MASTER_CREATOR_KEY = process.env.CREATOR_KEY || 'doorstep2026';

// Helper to read JSON
const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

// Helper to write JSON
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Service Categories
const CATEGORIES = [
  { id: 'all', title: 'All Services', icon: '⚡', description: 'Browse all available doorstep experts', badge: '10+ Available' },
  { id: 'electrician', title: 'Electrician', icon: '⚡', description: 'Wiring, MCB, Fan, Inverter & Switchboard repair', startPrice: 299, badge: 'Popular' },
  { id: 'plumber', title: 'Plumber', icon: '🚰', description: 'Tap leakages, pipe fitting, motor repair & drainage', startPrice: 349, badge: 'Fast Delivery' },
  { id: 'washing-repair', title: 'Washing Repair', icon: '🧺', description: 'Front/Top load washing machine & dryer fixes', startPrice: 399, badge: 'Brand Certified' },
  { id: 'carpenter', title: 'Carpenter', icon: '🔨', description: 'Door lock, modular kitchen, bed & furniture woodwork', startPrice: 449, badge: 'Top Rated' },
  { id: 'wall-painter', title: 'Wall Painter', icon: '🎨', description: 'Interior/Exterior painting, touch-ups & damp proofing', startPrice: 499, badge: 'Eco-Paint' },
  { id: 'water-supplier', title: 'Water Supplier', icon: '💧', description: '20L Pure RO cans & emergency water delivery', startPrice: 120, badge: 'Express Delivery' },
  { id: 'iron-person', title: 'Ironing Person', icon: '👔', description: 'Crisp steam press & pickup laundry at doorstep', startPrice: 15, badge: 'Per Cloth' },
  { id: 'scavenger', title: 'Sanitation / Cleaner', icon: '🧹', description: 'Drain unblocking, deep sanitation & waste removal', startPrice: 399, badge: 'Hygiene First' },
  { id: 'ac-repair', title: 'AC Servicing', icon: '❄️', description: 'Cooling gas refill, deep foam jet cleaning & repair', startPrice: 599, badge: 'Summer Special' }
];

// Subscription Plans Definition
const SUBSCRIPTION_PLANS = [
  {
    id: 'simple',
    name: 'Simple Plan',
    price: 150,
    period: '/ month',
    badge: 'Popular Choice',
    features: [
      'Standard Doorstep Booking Access',
      '2 Free Expert Phone Consultations / Month',
      'Govt Verified Partner Assurance',
      'Standard Doorstep Arrival (< 30 Mins)'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 200,
    period: '/ month',
    badge: 'Best Value',
    popular: true,
    features: [
      'Priority Express Arrival (< 15 Mins)',
      'Unlimited Doorstep Mitra AI Assistant Usage',
      '10% Discount on Service Labor Charges',
      'Dedicated Account Manager Support'
    ]
  },
  {
    id: 'all-access',
    name: 'All-Access VIP',
    price: 300,
    period: '/ month',
    badge: 'Creator VIP',
    features: [
      '0 Platform Service Convenience Fee',
      'Free 1 x 20L BIS Drinking Water Can Monthly',
      'Priority 24/7 Hotline Call Support',
      'Full Access to Premium & Custom Requests',
      'Exclusive Family Member Sharing'
    ]
  }
];

// Active OTP store (in-memory)
const otpStore = new Map();

// API Routes

// GET /api/services
app.get('/api/services', (req, res) => {
  res.json({ success: true, categories: CATEGORIES });
});

// GET /api/subscriptions/plans
app.get('/api/subscriptions/plans', (req, res) => {
  res.json({ success: true, plans: SUBSCRIPTION_PLANS });
});

// GET /api/subscriptions/user/:userId - Check user active subscription
app.get('/api/subscriptions/user/:userId', (req, res) => {
  const { userId } = req.params;
  const subscriptions = readData(SUBSCRIPTIONS_FILE);
  const userSub = subscriptions.find(s => s.userId === userId && s.status === 'Active');
  
  if (userSub) {
    res.json({ success: true, subscription: userSub });
  } else {
    res.json({ success: true, subscription: null, message: 'No active subscription. Upgrade to unlock full access.' });
  }
});

// POST /api/subscriptions - Purchase/Upgrade Plan
app.post('/api/subscriptions', (req, res) => {
  const { userId, userName, planId, paymentMethod } = req.body;
  if (!userId || !planId) {
    return res.status(400).json({ success: false, message: 'User ID and Plan selection required.' });
  }

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!selectedPlan) {
    return res.status(404).json({ success: false, message: 'Invalid subscription plan' });
  }

  const subscriptions = readData(SUBSCRIPTIONS_FILE);
  // Deactivate old subscriptions for this user
  subscriptions.forEach(s => {
    if (s.userId === userId) s.status = 'Expired';
  });

  const startDate = new Date();
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  const newSub = {
    id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
    userId,
    userName: userName || 'Valued Subscriber',
    planId: selectedPlan.id,
    planName: selectedPlan.name,
    price: selectedPlan.price,
    status: 'Active',
    startDate: startDate.toISOString(),
    expiryDate: expiryDate.toISOString(),
    paymentMethod: paymentMethod || 'UPI / Instant Online',
    paymentTxn: `TXN_UPI_${Math.floor(1000000 + Math.random() * 9000000)}`
  };

  subscriptions.unshift(newSub);
  writeData(SUBSCRIPTIONS_FILE, subscriptions);

  res.status(201).json({ success: true, message: `Successfully subscribed to ${selectedPlan.name}!`, subscription: newSub });
});

// CREATOR / FOUNDER SECRET PORTAL APIs

// POST /api/creator/login - Password Authentication
app.post('/api/creator/login', (req, res) => {
  const { password } = req.body;
  if (password !== MASTER_CREATOR_KEY) {
    return res.status(401).json({ success: false, message: 'Invalid Founder Key. Access Denied.' });
  }

  res.json({
    success: true,
    message: 'Creator Access Granted! Welcome Founder.',
    creatorToken: `CREATOR_SESSION_${Date.now()}`
  });
});

// GET /api/creator/database - Returns full raw database for creator
app.get('/api/creator/database', (req, res) => {
  const token = req.headers['x-creator-token'];
  if (!token || !token.startsWith('CREATOR_SESSION_')) {
    return res.status(403).json({ success: false, message: 'Unauthorized. Creator authentication required.' });
  }

  const providers = readData(PROVIDERS_FILE);
  const bookings = readData(BOOKINGS_FILE);
  const subscriptions = readData(SUBSCRIPTIONS_FILE);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const subscriptionRevenue = subscriptions.reduce((sum, s) => sum + (s.price || 0), 0);

  res.json({
    success: true,
    founderAccess: true,
    stats: {
      totalProviders: providers.length,
      totalBookings: bookings.length,
      totalSubscribers: subscriptions.filter(s => s.status === 'Active').length,
      serviceRevenue: totalRevenue,
      subscriptionRevenue: subscriptionRevenue,
      grandTotalRevenue: totalRevenue + subscriptionRevenue
    },
    databases: {
      providers,
      bookings,
      subscriptions
    }
  });
});

// GET /api/providers
app.get('/api/providers', (req, res) => {
  let providers = readData(PROVIDERS_FILE);
  const { category, gender, availability, maxPrice, search } = req.query;

  if (category && category !== 'all') {
    providers = providers.filter(p => p.category === category);
  }
  if (gender && gender !== 'all') {
    providers = providers.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
  }
  if (availability && availability !== 'all') {
    providers = providers.filter(p => p.availability.toLowerCase() === availability.toLowerCase());
  }
  if (maxPrice) {
    providers = providers.filter(p => p.price <= parseFloat(maxPrice));
  }
  if (search) {
    const q = search.toLowerCase();
    providers = providers.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.idNo.toLowerCase().includes(q) ||
      p.about.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: providers.length, providers });
});

// POST /api/providers
app.post('/api/providers', (req, res) => {
  const { name, category, idNo, gender, contact, price, priceUnit, about, availability } = req.body;
  if (!name || !category || !contact) {
    return res.status(400).json({ success: false, message: 'Name, Category, and Contact are required' });
  }

  const providers = readData(PROVIDERS_FILE);
  const newProvider = {
    id: `EXP-${Date.now().toString().slice(-4)}`,
    idNo: idNo || `IND-AADHAAR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    category,
    gender: gender || 'Male',
    contact,
    price: parseFloat(price) || 299,
    priceUnit: priceUnit || '/ hr',
    availability: availability || 'Available',
    rating: 5.0,
    reviewsCount: 1,
    experienceYears: 3,
    badge: 'Govt Verified Member',
    about: about || 'Verified home service professional registered on Doorstep Experts platform.',
    completedJobs: 0
  };

  providers.unshift(newProvider);
  writeData(PROVIDERS_FILE, providers);

  res.status(201).json({ success: true, message: 'Provider added successfully', provider: newProvider });
});

// DELETE /api/providers/:id
app.delete('/api/providers/:id', (req, res) => {
  const { id } = req.params;
  let providers = readData(PROVIDERS_FILE);
  const initialLen = providers.length;
  providers = providers.filter(p => p.id !== id);

  if (providers.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Provider not found' });
  }

  writeData(PROVIDERS_FILE, providers);
  res.json({ success: true, message: 'Provider removed successfully' });
});

// POST /api/auth/send-otp
app.post('/api/auth/send-otp', (req, res) => {
  const { phone, role } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number' });
  }

  const demoOtp = '1234';
  otpStore.set(phone, { otp: demoOtp, createdAt: Date.now() });

  res.json({
    success: true,
    message: `OTP sent to ${phone}! (Demo OTP is: ${demoOtp})`,
    demoOtp
  });
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, role, name } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
  }

  const record = otpStore.get(phone);
  if (!record || (record.otp !== otp && otp !== '1234')) {
    return res.status(400).json({ success: false, message: 'Invalid OTP code. Try entering 1234.' });
  }

  otpStore.delete(phone);

  const userObj = {
    id: `USER-${phone.slice(-4)}`,
    phone,
    name: name || (phone === '9999999999' ? 'Doorstep Creator' : 'Valued Customer'),
    role: role || (phone === '9999999999' ? 'admin' : 'user'),
    token: `jwt_token_demo_${Date.now()}`
  };

  res.json({ success: true, message: 'Authentication successful!', user: userObj });
});

// GET /api/bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readData(BOOKINGS_FILE);
  res.json({ success: true, count: bookings.length, bookings });
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { customerName, customerPhone, customerAddress, providerId, scheduledTime, notes } = req.body;
  
  if (!customerPhone || !providerId || !customerAddress) {
    return res.status(400).json({ success: false, message: 'Address, phone, and provider selection required.' });
  }

  const providers = readData(PROVIDERS_FILE);
  const provider = providers.find(p => p.id === providerId);

  if (!provider) {
    return res.status(404).json({ success: false, message: 'Selected expert not found.' });
  }

  const bookings = readData(BOOKINGS_FILE);
  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerName || 'Valued Resident',
    customerPhone,
    customerAddress,
    providerId: provider.id,
    providerName: provider.name,
    providerCategory: provider.category,
    providerContact: provider.contact,
    providerIdNo: provider.idNo,
    price: provider.price,
    priceUnit: provider.priceUnit,
    status: 'En Route',
    paymentMethod: 'UPI / Cash on Service',
    bookingTime: new Date().toISOString(),
    scheduledTime: scheduledTime || 'Express Instant (Within 30 Mins)',
    notes: notes || 'Doorstep urgent service request',
    gpsCoordinates: {
      origin: { lat: 12.9650, lng: 77.5800 },
      current: { lat: 12.9690, lng: 77.5880 },
      destination: { lat: 12.9784, lng: 77.6091 }
    },
    etaMinutes: 12
  };

  bookings.unshift(newBooking);
  writeData(BOOKINGS_FILE, bookings);

  provider.availability = 'On-Task';
  writeData(PROVIDERS_FILE, providers);

  res.status(201).json({ success: true, message: 'Service booked successfully!', booking: newBooking });
});

// PUT /api/bookings/:id/status
app.put('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const bookings = readData(BOOKINGS_FILE);
  const index = bookings.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  bookings[index].status = status;
  writeData(BOOKINGS_FILE, bookings);

  if (status === 'Completed' || status === 'Cancelled') {
    const providers = readData(PROVIDERS_FILE);
    const pIndex = providers.findIndex(p => p.id === bookings[index].providerId);
    if (pIndex !== -1) {
      providers[pIndex].availability = 'Available';
      if (status === 'Completed') {
        providers[pIndex].completedJobs = (providers[pIndex].completedJobs || 0) + 1;
      }
      writeData(PROVIDERS_FILE, providers);
    }
  }

  res.json({ success: true, message: `Booking status updated to ${status}`, booking: bookings[index] });
});

// GET /api/tracking/:bookingId
app.get('/api/tracking/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  const bookings = readData(BOOKINGS_FILE);
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking tracking not found' });
  }

  const elapsedSec = (Date.now() - new Date(booking.bookingTime).getTime()) / 1000;
  const progress = Math.min(1.0, elapsedSec / 120);

  const startLat = 12.9650;
  const startLng = 77.5800;
  const destLat = 12.9784;
  const destLng = 77.6091;

  const currentLat = startLat + (destLat - startLat) * progress;
  const currentLng = startLng + (destLng - startLng) * progress;
  const remainingEta = Math.max(0, Math.ceil(12 * (1 - progress)));

  let liveStatus = booking.status;
  if (progress >= 1.0 && liveStatus === 'En Route') {
    liveStatus = 'Arrived';
  }

  res.json({
    success: true,
    bookingId,
    providerName: booking.providerName,
    providerContact: booking.providerContact,
    providerIdNo: booking.providerIdNo,
    status: liveStatus,
    progressPercent: Math.round(progress * 100),
    etaMinutes: remainingEta,
    coordinates: {
      origin: { lat: startLat, lng: startLng },
      current: { lat: Number(currentLat.toFixed(4)), lng: Number(currentLng.toFixed(4)) },
      destination: { lat: destLat, lng: destLng }
    }
  });
});

// POST /api/ai-assistant
app.post('/api/ai-assistant', (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, message: 'Prompt text is required' });
  }

  const query = prompt.toLowerCase();
  const providers = readData(PROVIDERS_FILE);

  let categorySuggested = 'electrician';
  let advice = '';
  let diagnosis = '';

  if (query.includes('spark') || query.includes('light') || query.includes('fuse') || query.includes('wire') || query.includes('mcb') || query.includes('electric') || query.includes('power') || query.includes('short circuit') || query.includes('shock')) {
    categorySuggested = 'electrician';
    diagnosis = 'Potential electrical short-circuit or MCB trip issue.';
    advice = '⚠️ SAFETY FIRST: Immediately turn off your main distribution board (MCB) trip switch. Do not touch exposed copper wires or switchboards with wet hands.';
  } else if (query.includes('water') || query.includes('pipe') || query.includes('leak') || query.includes('tap') || query.includes('flush') || query.includes('drain') || query.includes('sink') || query.includes('toilet') || query.includes('pump')) {
    categorySuggested = 'plumber';
    diagnosis = 'Plumbing pipeline pressure build-up or faucet seal degradation.';
    advice = '💧 SAFETY FIRST: Locate and shut off the main water valve gate under your sink or near your water tank to prevent flooding.';
  } else if (query.includes('wash') || query.includes('spin') || query.includes('machine') || query.includes('dryer') || query.includes('noise') || query.includes('drum')) {
    categorySuggested = 'washing-repair';
    diagnosis = 'Washing machine motor belt slip or PCB error code.';
    advice = '🧺 TIP: Unplug your washing machine from the wall power socket and empty trapped standing water using the front filter valve.';
  } else if (query.includes('wood') || query.includes('door') || query.includes('lock') || query.includes('hinge') || query.includes('table') || query.includes('chair') || query.includes('bed') || query.includes('cabinet')) {
    categorySuggested = 'carpenter';
    diagnosis = 'Door hinge alignment or furniture lock mechanism issue.';
    advice = '🔨 TIP: Avoid forcing jammed door handles or swollen monsoon wooden doors to prevent frame cracking.';
  } else if (query.includes('paint') || query.includes('wall') || query.includes('color') || query.includes('damp') || query.includes('seepage') || query.includes('fungus')) {
    categorySuggested = 'wall-painter';
    diagnosis = 'Wall surface moisture seepage or peeling paint finish.';
    advice = '🎨 TIP: Keep the room well-ventilated and check if background pipeline seepage needs sealing before fresh paint application.';
  } else if (query.includes('can') || query.includes('drink') || query.includes('tanker') || query.includes('20l') || query.includes('ro water')) {
    categorySuggested = 'water-supplier';
    diagnosis = 'Drinking water supply requirement.';
    advice = '💧 Express 20L BIS-certified RO drinking water cans delivered right to your kitchen step.';
  } else if (query.includes('iron') || query.includes('press') || query.includes('steam') || query.includes('shirt') || query.includes('saree') || query.includes('laundry')) {
    categorySuggested = 'iron-person';
    diagnosis = 'Doorstep clothing steam press request.';
    advice = '👔 Convenient pickup and crisp brass press service for your formal wear.';
  } else if (query.includes('smell') || query.includes('clog') || query.includes('clean') || query.includes('sewage') || query.includes('garbage') || query.includes('waste')) {
    categorySuggested = 'scavenger';
    diagnosis = 'Drain blockage or heavy sanitation cleaning requirement.';
    advice = '🧹 High-pressure jetting and hygienic waste disposal by verified sanitation workers.';
  } else if (query.includes('ac') || query.includes('cool') || query.includes('ice') || query.includes('air conditioner') || query.includes('gas')) {
    categorySuggested = 'ac-repair';
    diagnosis = 'AC compressor gas leakage or dust filter obstruction.';
    advice = '❄️ Turn off the AC unit to prevent compressor coil overheating until jet cleaning is done.';
  } else {
    diagnosis = 'General home maintenance query detected.';
    advice = 'Our expert door-step team can perform an on-site diagnosis and repair.';
  }

  const matchingExperts = providers
    .filter(p => p.category === categorySuggested && p.availability === 'Available')
    .slice(0, 3);

  res.json({
    success: true,
    diagnosis,
    advice,
    categorySuggested,
    categoryName: CATEGORIES.find(c => c.id === categorySuggested)?.title || 'Service',
    matchingExperts
  });
});

app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 DOORSTEP EXPERTS API Server running on port ${PORT}`);
  console.log(`================================================`);
});
