import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const INITIAL_PROVIDERS = [
  {
    id: "P-101",
    name: "Rajesh Kumar",
    category: "Electrician",
    rating: 4.9,
    reviewsCount: 184,
    price: 299,
    priceUnit: "hr",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 98765 43210",
    idNo: "DE-ELC-8842",
    experience: "7 Years",
    completedJobs: 340,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    badges: ["Top Rated", "Govt Certified", "Safety First"],
    bio: "Certified high-voltage & home wiring expert. Specialized in fan, MCB, inverter, and smart light installations.",
    lat: 28.6139,
    lng: 77.2090,
    distanceKm: 1.2
  },
  {
    id: "P-102",
    name: "Sunita Sharma",
    category: "Electrician",
    rating: 4.8,
    reviewsCount: 120,
    price: 280,
    priceUnit: "hr",
    availability: "Available Now",
    gender: "Female",
    contact: "+91 98123 45678",
    idNo: "DE-ELC-9021",
    experience: "5 Years",
    completedJobs: 215,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    badges: ["Verified Pro", "Fast Response"],
    bio: "Expert electrical engineer handling house short-circuit repairs, switchboards, and fixture setup.",
    lat: 28.6180,
    lng: 77.2150,
    distanceKm: 1.8
  },
  {
    id: "P-103",
    name: "Ramesh Verma",
    category: "Plumber",
    rating: 4.7,
    reviewsCount: 210,
    price: 349,
    priceUnit: "hr",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 99887 76655",
    idNo: "DE-PLM-7711",
    experience: "8 Years",
    completedJobs: 490,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    badges: ["Leak Specialist", "Instant Arrival"],
    bio: "Master plumber for pipeline leak fixes, tap replacement, bathroom fittings, and tank cleaning.",
    lat: 28.6110,
    lng: 77.2050,
    distanceKm: 2.1
  },
  {
    id: "P-104",
    name: "Pooja Patel",
    category: "Plumber",
    rating: 4.9,
    reviewsCount: 95,
    price: 320,
    priceUnit: "hr",
    availability: "Available Now",
    gender: "Female",
    contact: "+91 97654 32109",
    idNo: "DE-PLM-6320",
    experience: "4 Years",
    completedJobs: 178,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    badges: ["Bathroom Expert", "Transparent Pricing"],
    bio: "Specialist in pipe fittings, water heater installation, and kitchen sink clog unclogging.",
    lat: 28.6210,
    lng: 77.2180,
    distanceKm: 2.5
  },
  {
    id: "P-105",
    name: "Amitabh Singh",
    category: "Washing Repair",
    rating: 4.8,
    reviewsCount: 156,
    price: 399,
    priceUnit: "visit",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 98450 11223",
    idNo: "DE-WSH-3321",
    experience: "6 Years",
    completedJobs: 310,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badges: ["Front & Top Load Expert", "Genuine Parts"],
    bio: "Specializes in Samsung, LG, IFB, Whirlpool washing machine repairs, motor noise fix, and drum cleaning.",
    lat: 28.6145,
    lng: 77.2120,
    distanceKm: 1.5
  },
  {
    id: "P-106",
    name: "Vikram Vishwakarma",
    category: "Carpenter",
    rating: 4.9,
    reviewsCount: 230,
    price: 450,
    priceUnit: "hr",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 99112 23344",
    idNo: "DE-CRP-5544",
    experience: "10 Years",
    completedJobs: 620,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    badges: ["Master Craftsman", "Custom Furniture"],
    bio: "Expert woodworker for door lock repairs, modular cabinet fixes, furniture assembly, and wooden bed work.",
    lat: 28.6160,
    lng: 77.2020,
    distanceKm: 2.9
  },
  {
    id: "P-107",
    name: "Anita Yadav",
    category: "Wall Painter",
    rating: 4.8,
    reviewsCount: 142,
    price: 499,
    priceUnit: "room",
    availability: "Available Now",
    gender: "Female",
    contact: "+91 98221 14433",
    idNo: "DE-PNT-9988",
    experience: "6 Years",
    completedJobs: 280,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    badges: ["Asian Paints Specialist", "Clean & Odorless"],
    bio: "Interior & exterior wall painting, waterproof putty touch-ups, texture wall designs, and dampness fix.",
    lat: 28.6195,
    lng: 77.2110,
    distanceKm: 3.1
  },
  {
    id: "P-108",
    name: "Suresh Jalwala",
    category: "Water Supplier",
    rating: 4.6,
    reviewsCount: 310,
    price: 60,
    priceUnit: "can (20L)",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 97110 55667",
    idNo: "DE-WTR-1100",
    experience: "5 Years",
    completedJobs: 1200,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    badges: ["Purified RO Water", "Express 20-Min Delivery"],
    bio: "Chilled and RO purified 20-litre water jar doorstep delivery for homes and offices.",
    lat: 28.6125,
    lng: 77.2080,
    distanceKm: 0.8
  },
  {
    id: "P-109",
    name: "Kiran Devi",
    category: "Iron Person",
    rating: 4.9,
    reviewsCount: 275,
    price: 12,
    priceUnit: "cloth",
    availability: "Available Now",
    gender: "Female",
    contact: "+91 99554 33221",
    idNo: "DE-IRN-4422",
    experience: "7 Years",
    completedJobs: 890,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    badges: ["Crisp Steam Press", "Doorstep Pickup & Drop"],
    bio: "Heavy steam ironing for sarees, suits, shirts, and daily wear with free doorstep pickup.",
    lat: 28.6140,
    lng: 77.2065,
    distanceKm: 0.5
  },
  {
    id: "P-110",
    name: "Manoj Swachh",
    category: "Scavenger / Sanitation",
    rating: 4.9,
    reviewsCount: 198,
    price: 350,
    priceUnit: "visit",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 98877 66554",
    idNo: "DE-SCV-1001",
    experience: "9 Years",
    completedJobs: 540,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    badges: ["Sanitization Certified", "Disinfection Expert"],
    bio: "Professional home drain cleaning, septic tank maintenance, sanitation, and deep hygiene services.",
    lat: 28.6172,
    lng: 77.2140,
    distanceKm: 1.4
  },
  {
    id: "P-111",
    name: "Sunil CoolCare",
    category: "AC Repair",
    rating: 4.8,
    reviewsCount: 320,
    price: 499,
    priceUnit: "service",
    availability: "Available Now",
    gender: "Male",
    contact: "+91 98711 22334",
    idNo: "DE-ACR-7722",
    experience: "8 Years",
    completedJobs: 710,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    badges: ["Gas Refill Expert", "Jet Foam Washing"],
    bio: "Split & Window AC servicing, gas charging, cooling problem diagnostic, and PCB repairing.",
    lat: 28.6130,
    lng: 77.2100,
    distanceKm: 1.1
  },
  {
    id: "P-112",
    name: "Meena CleanHome",
    category: "Scavenger / Sanitation",
    rating: 4.7,
    reviewsCount: 165,
    price: 400,
    priceUnit: "visit",
    availability: "Available Now",
    gender: "Female",
    contact: "+91 97123 99887",
    idNo: "DE-SCV-2002",
    experience: "5 Years",
    completedJobs: 330,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    badges: ["Eco-friendly Chemicals", "Deep Cleaning"],
    bio: "Kitchen degreasing, bathroom deep sanitation, drain unclogging, and waste disposal.",
    lat: 28.6155,
    lng: 77.2075,
    distanceKm: 1.6
  }
];

class DbStore {
  constructor() {
    this.data = {
      providers: INITIAL_PROVIDERS,
      orders: [
        {
          id: "ORD-9081",
          userId: "9876543210",
          userName: "Demo Customer",
          userAddress: "Flat 402, Green Valley Apartments, Connaught Place, New Delhi",
          providerId: "P-101",
          providerName: "Rajesh Kumar",
          providerCategory: "Electrician",
          providerContact: "+91 98765 43210",
          providerIdNo: "DE-ELC-8842",
          amount: 299,
          bookingDate: "2026-08-30",
          timeSlot: "04:00 PM - 05:00 PM",
          status: "En Route",
          paymentMethod: "UPI (Paid)",
          createdAt: new Date().toISOString(),
          providerLat: 28.6139,
          providerLng: 77.2090
        }
      ],
      otps: {}
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data.providers = parsed.providers || INITIAL_PROVIDERS;
        this.data.orders = parsed.orders || [];
        this.data.otps = parsed.otps || {};
      } else {
        this.save();
      }
    } catch (e) {
      console.warn("Failed reading data file, using defaults:", e.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.error("Error saving data file:", e.message);
    }
  }

  // Providers
  getProviders(category, gender, search, availability) {
    let result = [...this.data.providers];

    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (gender && gender !== 'All') {
      result = result.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    }
    if (availability && availability !== 'All') {
      result = result.filter(p => p.availability === availability);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.idNo.toLowerCase().includes(q)
      );
    }
    return result;
  }

  getProviderById(id) {
    return this.data.providers.find(p => p.id === id);
  }

  addProvider(providerData) {
    const newId = `P-${100 + this.data.providers.length + 1}`;
    const newProvider = {
      id: newId,
      name: providerData.name || "Expert Member",
      category: providerData.category || "Electrician",
      rating: parseFloat(providerData.rating || 4.8),
      reviewsCount: 1,
      price: parseInt(providerData.price || 300),
      priceUnit: providerData.priceUnit || "hr",
      availability: providerData.availability || "Available Now",
      gender: providerData.gender || "Male",
      contact: providerData.contact || "+91 99000 00000",
      idNo: providerData.idNo || `DE-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
      experience: providerData.experience || "3 Years",
      completedJobs: parseInt(providerData.completedJobs || 10),
      avatar: providerData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      badges: ["Verified Pro", "New Addition"],
      bio: providerData.bio || "Experienced service professional dedicated to quality work.",
      lat: 28.6139 + (Math.random() - 0.5) * 0.02,
      lng: 77.2090 + (Math.random() - 0.5) * 0.02,
      distanceKm: (1 + Math.random() * 3).toFixed(1)
    };
    this.data.providers.unshift(newProvider);
    this.save();
    return newProvider;
  }

  updateProvider(id, updateData) {
    const idx = this.data.providers.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.providers[idx] = { ...this.data.providers[idx], ...updateData };
      this.save();
      return this.data.providers[idx];
    }
    return null;
  }

  deleteProvider(id) {
    this.data.providers = this.data.providers.filter(p => p.id !== id);
    this.save();
    return true;
  }

  // Orders
  createOrder(orderData) {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: orderData.userPhone || "9876543210",
      userName: orderData.userName || "Customer",
      userAddress: orderData.userAddress || "House No 12, Main Street",
      providerId: orderData.providerId,
      providerName: orderData.providerName,
      providerCategory: orderData.providerCategory,
      providerContact: orderData.providerContact,
      providerIdNo: orderData.providerIdNo,
      amount: orderData.amount,
      bookingDate: orderData.bookingDate || new Date().toISOString().split('T')[0],
      timeSlot: orderData.timeSlot || "Immediately (30-45 mins)",
      status: "En Route", // Demo state starts en route so user can immediately test live GPS tracking!
      paymentMethod: orderData.paymentMethod || "Cash on Delivery",
      createdAt: new Date().toISOString(),
      providerLat: 28.6139 + (Math.random() - 0.5) * 0.01,
      providerLng: 77.2090 + (Math.random() - 0.5) * 0.01
    };
    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  getOrders(userPhone, role) {
    if (role === 'admin') {
      return this.data.orders;
    }
    if (userPhone) {
      return this.data.orders.filter(o => o.userId === userPhone);
    }
    return this.data.orders;
  }

  updateOrderStatus(orderId, status) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.save();
      return order;
    }
    return null;
  }

  // OTP
  generateOtp(phone) {
    // 6 digit demo OTP, fixed to '123456' or random for easy testing!
    const otp = "123456";
    this.data.otps[phone] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    this.save();
    return otp;
  }

  verifyOtp(phone, inputOtp) {
    // Accepts '123456' or exact matching
    if (inputOtp === "123456") return true;
    const stored = this.data.otps[phone];
    if (stored && stored.otp === inputOtp) {
      delete this.data.otps[phone];
      this.save();
      return true;
    }
    return false;
  }
}

export const db = new DbStore();
