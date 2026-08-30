import express from 'express';
import cors from 'cors';
import { db } from './dbStore.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    app: "Doorstep Experts Backend API",
    time: new Date().toISOString()
  });
});

// Auth Routes
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: "Please enter a valid 10-digit phone number." });
  }
  const otp = db.generateOtp(phone);
  res.json({
    success: true,
    message: `OTP sent successfully to +91 ${phone}`,
    demoOtp: otp
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, role } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required." });
  }

  const isValid = db.verifyOtp(phone, otp);
  if (isValid) {
    const isAdmin = role === 'admin' || phone === '9999999999';
    res.json({
      success: true,
      user: {
        phone,
        role: isAdmin ? 'admin' : 'user',
        name: isAdmin ? 'Admin Manager' : `User (${phone.slice(-4)})`
      },
      token: `demo-token-${Date.now()}`
    });
  } else {
    res.status(400).json({ error: "Invalid OTP. Use demo OTP: 123456" });
  }
});

// Providers Routes
app.get('/api/providers', (req, res) => {
  const { category, gender, search, availability } = req.query;
  const providers = db.getProviders(category, gender, search, availability);
  res.json({ success: true, count: providers.length, providers });
});

app.get('/api/providers/:id', (req, res) => {
  const provider = db.getProviderById(req.params.id);
  if (!provider) {
    return res.status(404).json({ error: "Provider not found." });
  }
  res.json({ success: true, provider });
});

app.post('/api/providers', (req, res) => {
  const newProvider = db.addProvider(req.body);
  res.status(201).json({ success: true, provider: newProvider, message: "New service provider registered successfully!" });
});

app.put('/api/providers/:id', (req, res) => {
  const updated = db.updateProvider(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Provider not found." });
  }
  res.json({ success: true, provider: updated, message: "Provider details updated." });
});

app.delete('/api/providers/:id', (req, res) => {
  const success = db.deleteProvider(req.params.id);
  res.json({ success, message: "Provider removed from database." });
});

// Orders Routes
app.get('/api/orders', (req, res) => {
  const { userPhone, role } = req.query;
  const orders = db.getOrders(userPhone, role);
  res.json({ success: true, count: orders.length, orders });
});

app.post('/api/orders', (req, res) => {
  const { providerId, providerName, providerCategory, providerContact, providerIdNo, amount } = req.body;
  if (!providerId || !amount) {
    return res.status(400).json({ error: "Missing required order details." });
  }
  const newOrder = db.createOrder(req.body);
  res.status(201).json({
    success: true,
    order: newOrder,
    message: `Order #${newOrder.id} confirmed! Expert is assigned.`
  });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const updatedOrder = db.updateOrderStatus(req.params.id, status);
  if (!updatedOrder) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.json({ success: true, order: updatedOrder, message: `Order status changed to '${status}'` });
});

// Inbuilt AI Troubleshooter
app.post('/api/ai-help', (req, res) => {
  const { issueQuery } = req.body;
  if (!issueQuery) {
    return res.status(400).json({ error: "Please describe your issue." });
  }

  const query = issueQuery.toLowerCase();
  let category = "Electrician";
  let safetyAdvice = "";
  let solution = "";

  if (query.includes("wire") || query.includes("spark") || query.includes("fan") || query.includes("mcb") || query.includes("fuse") || query.includes("light") || query.includes("switch") || query.includes("current") || query.includes("shock")) {
    category = "Electrician";
    safetyAdvice = "⚠️ CRITICAL SAFETY STEP: Please main switch/MCB Off instantly before touching any open socket or wire to prevent shock!";
    solution = "Electrical faults require certified diagnosis. A short circuit, blown capacitor, or overloaded circuit breaker is likely.";
  } else if (query.includes("pipe") || query.includes("leak") || query.includes("tap") || query.includes("drain") || query.includes("clog") || query.includes("tank") || query.includes("bathroom") || query.includes("flush") || query.includes("sink")) {
    category = "Plumber";
    safetyAdvice = "🚰 SAFETY TIP: Turn off the main water valve near your overhead tank or meter to stop active water overflow.";
    solution = "Water leakage can damage walls and floor tiles. Our expert plumber can seal pipe joints, clear blockages, or replace damaged washers.";
  } else if (query.includes("washing") || query.includes("machine") || query.includes("spin") || query.includes("dryer") || query.includes("drainage") || query.includes("noise")) {
    category = "Washing Repair";
    safetyAdvice = "🔌 SAFETY TIP: Unplug the washing machine power cable and turn off the inlet hose connection.";
    solution = "Issues like drum imbalance, belt slip, or motor sensor errors need technician inspection. We stock original spare parts for all major brands.";
  } else if (query.includes("wood") || query.includes("door") || query.includes("lock") || query.includes("handle") || query.includes("cabinet") || query.includes("hinge") || query.includes("bed") || query.includes("table")) {
    category = "Carpenter";
    safetyAdvice = "🔨 SAFETY TIP: Keep doors wedged open so locked doors don't trap family members inside.";
    solution = "Wooden swell, jammed mortise locks, or sagging cabinet hinges can be realigned or replaced seamlessly.";
  } else if (query.includes("paint") || query.includes("wall") || query.includes("damp") || query.includes("peel") || query.includes("putty") || query.includes("stain")) {
    category = "Wall Painter";
    safetyAdvice = "🎨 SAFETY TIP: Keep room windows open for natural airflow during damp wall inspection.";
    solution = "Wall peeling is usually caused by moisture seepage. Apply anti-damp primer followed by premium emulsion touchups.";
  } else if (query.includes("water") || query.includes("can") || query.includes("jar") || query.includes("ro") || query.includes("drinking")) {
    category = "Water Supplier";
    safetyAdvice = "💧 HYGIENE CHECK: Ensure water cans have factory tamper-evident seal caps.";
    solution = "Express 20-Litre RO purified chilled water can delivery available to your doorstep within 20-30 minutes.";
  } else if (query.includes("iron") || query.includes("press") || query.includes("cloth") || query.includes("saree") || query.includes("suit")) {
    category = "Iron Person";
    safetyAdvice = "🧺 CONVENIENCE TIP: Separate delicate silk items for temperature regulated steam pressing.";
    solution = "Professional heavy steam ironing with free doorstep pickup and hanger packaging.";
  } else if (query.includes("clean") || query.includes("drainage") || query.includes("sewer") || query.includes("septic") || query.includes("garbage") || query.includes("sanitize") || query.includes("waste")) {
    category = "Scavenger / Sanitation";
    safetyAdvice = "🧼 HYGIENE TIP: Avoid using harsh non-certified chemicals in indoor household drains.";
    solution = "Sanitation experts handle deep drain jetting, septic line clearing, and anti-bacterial fogging.";
  } else if (query.includes("ac") || query.includes("cool") || query.includes("gas") || query.includes("air conditioner") || query.includes("filter")) {
    category = "AC Repair";
    safetyAdvice = "❄️ SAFETY TIP: Turn off AC isolator switch if you notice water dripping over electrical sockets.";
    solution = "Loss of cooling is generally due to dusty condenser coils or low R32/R410 gas pressure. Jet pump cleaning will restore peak cooling.";
  } else {
    category = "Electrician";
    safetyAdvice = "🛡️ SAFETY TIP: For any home issue involving power or water, prioritize personal safety first!";
    solution = "Our verified home experts can visit your location to inspect, diagnose, and repair the problem.";
  }

  // Find top matching providers for this category
  const matchingProviders = db.getProviders(category, 'All', '', 'Available Now').slice(0, 3);

  res.json({
    success: true,
    aiResponse: {
      category,
      safetyAdvice,
      solution,
      recommendedMessage: `Based on your description, we recommend booking a verified **${category}** immediately.`,
      recommendedProviders: matchingProviders
    }
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🇮🇳 DOORSTEP EXPERTS SERVER RUNNING ON PORT ${PORT} 🇮🇳`);
  console.log(`=================================================`);
});
