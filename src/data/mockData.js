// Mock Data for JCI Tirupati Innovations & All 4 Tirupati Jaycees Chapters

export const TIRUPATI_CHAPTERS = [
  { id: 'innovations', name: 'JCI Tirupati Innovations', code: 'JCI-TI', isHost: true, desc: 'Host Chapter • 4th LO in Tirupati' },
  { id: 'tirupati', name: 'JCI Tirupati', code: 'JCI-TPT', isHost: false, desc: 'Pioneer Chapter' },
  { id: 'odyssey', name: 'JCI Tirupati Odyssey', code: 'JCI-TO', isHost: false, desc: 'Active Chapter' },
  { id: 'power', name: 'JCI Tirupati Power', code: 'JCI-TP', isHost: false, desc: 'Dynamic Chapter' }
];

export const BUSINESS_CATEGORIES = [
  'All',
  'Technology & Software',
  'Healthcare & Clinics',
  'Construction & Real Estate',
  'Retail & Wholesale',
  'Education & Training',
  'Legal & Financial Services',
  'Automobile & Transport',
  'Hospitality & Events',
  'Manufacturing & Fabrication',
  'Creative & Media'
];

export const BUSINESSES = [
  {
    id: 'biz-1',
    name: 'Sri Krishna Soft Solutions',
    slug: 'sri-krishna-soft-solutions',
    category: 'Technology & Software',
    ownerName: 'Jc. R. Dinesh Kumar',
    ownerDesignation: 'Vice President (Business), JCI Tirupati Innovations',
    chapter: 'JCI Tirupati Innovations',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Custom Web & Mobile Apps, Cloud ERP & Digital Transformation',
    description: 'Premier technology development studio based in Tirupati delivering mission-critical web platforms, enterprise software, mobile apps, and e-commerce portals across South India.',
    phone: '+91 98490 12345',
    whatsapp: '919849012345',
    email: 'info@srikrishnasoft.com',
    website: 'https://srikrishnasoft.example.com',
    address: 'Plot 42, Korlagunta Main Road, Tirupati, AP - 517501',
    rating: 4.9,
    reviewsCount: 38,
    isVerified: true,
    isBusinessOfTheDay: true,
    memberOffer: '15% Discount on Custom Web & App Development for all Tirupati Jaycees',
    businessValueGenerated: '₹ 18,50,000',
    connectsReceived: 24,
    productsAndServices: [
      { name: 'Custom ERP & CRM Development', desc: 'Automate business workflows and multi-branch operations' },
      { name: 'Full-Stack Web & Mobile Apps', desc: 'React, Node, Flutter iOS & Android apps for startups & SMBs' },
      { name: 'Cloud Migration & AWS Hosting', desc: 'High availability, secure multi-tenant cloud architectures' },
      { name: 'UI/UX & Brand Design', desc: 'Design systems, interactive prototypes, and branding assets' }
    ]
  },
  {
    id: 'biz-2',
    name: 'Balaji Ortho & Trauma Care Clinic',
    slug: 'balaji-ortho-clinic',
    category: 'Healthcare & Clinics',
    ownerName: 'Dr. Jc. K. Sumanth Reddy, MS',
    ownerDesignation: 'Director (Community Impact), JCI Tirupati',
    chapter: 'JCI Tirupati',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Advanced Joint Replacement, Sports Injury Care & Physiotherapy',
    description: 'Comprehensive bone and joint wellness center equipped with state-of-the-art robotic arthroscopy, digital X-ray, and specialized rehabilitation suites.',
    phone: '+91 94400 56789',
    whatsapp: '919440056789',
    email: 'contact@balajiortho.example.com',
    website: 'https://balajiortho.example.com',
    address: 'Near Ramanuja Circle, Renigunta Road, Tirupati, AP',
    rating: 4.9,
    reviewsCount: 52,
    isVerified: true,
    isBusinessOfTheDay: false,
    memberOffer: 'Free Initial Consultation & 20% off on Physiotherapy packages for Jaycee Families',
    businessValueGenerated: '₹ 12,20,000',
    connectsReceived: 31,
    productsAndServices: [
      { name: 'Joint Replacement & Arthroscopy', desc: 'Minimally invasive knee and hip surgeries' },
      { name: 'Sports Rehabilitation', desc: 'Targeted recovery for athletes, runners, and martial artists' },
      { name: 'Bone Density & Arthritis Clinic', desc: 'Preventative care and pain management' }
    ]
  },
  {
    id: 'biz-3',
    name: 'Saptagiri Infra & Precast Developers',
    slug: 'saptagiri-infra-developers',
    category: 'Construction & Real Estate',
    ownerName: 'Jc. T. Venkatesh Chowdary',
    ownerDesignation: 'Immediate Past President, JCI Tirupati Odyssey',
    chapter: 'JCI Tirupati Odyssey',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Premium Residential Layouts, Commercial Spaces & Eco-Precast Blocks',
    description: 'TUDA approved gated community layouts, commercial complex development, and innovative precast sustainable building solutions in and around Tirupati & Chandragiri.',
    phone: '+91 98850 78901',
    whatsapp: '919885078901',
    email: 'sales@saptagiriinfra.example.com',
    website: 'https://saptagiriinfra.example.com',
    address: '4th Floor, Tirumala Bypass Road, Tirupati, AP',
    rating: 4.8,
    reviewsCount: 29,
    isVerified: true,
    isBusinessOfTheDay: false,
    memberOffer: 'Zero Documentation Charges + Special Square Foot Member Rates for Jaycees',
    businessValueGenerated: '₹ 45,00,000',
    connectsReceived: 18,
    productsAndServices: [
      { name: 'TUDA Approved Plots', desc: 'Gated community open plots with 40ft blacktop roads' },
      { name: 'Turnkey Construction', desc: 'A-Grade residential villas & commercial office construction' },
      { name: 'Eco Precast Wall Panels', desc: 'Fast-track thermal insulated concrete building systems' }
    ]
  },
  {
    id: 'biz-4',
    name: 'Seven Hills Chartered & Tax Advisors',
    slug: 'seven-hills-tax-advisors',
    category: 'Legal & Financial Services',
    ownerName: 'Jc. CA M. Swathi Rao, FCA',
    ownerDesignation: 'Treasurer, JCI Tirupati Innovations',
    chapter: 'JCI Tirupati Innovations',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    tagline: 'GST Filings, Corporate Audits, Startup Advisory & Tax Planning',
    description: 'Trusted financial consultancy firm assisting Tirupati businesses with statutory audits, company incorporation, MSME subsidies, and streamlined wealth management.',
    phone: '+91 97000 34567',
    whatsapp: '919700034567',
    email: 'ca.swathi@sevenhillstax.example.com',
    website: 'https://sevenhillstax.example.com',
    address: 'Opp. SV University Gate, Air Bypass Road, Tirupati, AP',
    rating: 5.0,
    reviewsCount: 44,
    isVerified: true,
    isBusinessOfTheDay: false,
    memberOffer: 'Complimentary Financial Health Checkup & 20% off on Annual GST Retainership',
    businessValueGenerated: '₹ 8,75,000',
    connectsReceived: 42,
    productsAndServices: [
      { name: 'Statutory & Tax Audit', desc: 'Income tax audits, international taxation, and compliance' },
      { name: 'Company & LLP Incorporation', desc: 'Startup India registration, DPIIT recognition, MSME certification' },
      { name: 'Project Financing & Loan Syndication', desc: 'Detailed Project Reports (DPR) for bank credit facilities' }
    ]
  },
  {
    id: 'biz-5',
    name: 'Vibrant Solar & Renewable Energies',
    slug: 'vibrant-solar-tirupati',
    category: 'Manufacturing & Fabrication',
    ownerName: 'Jc. P. Rajesh Varma',
    ownerDesignation: 'Vice President, JCI Tirupati Power',
    chapter: 'JCI Tirupati Power',
    logo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Rooftop On-Grid & Off-Grid Solar Power Systems with PM Surya Ghar Subsidy',
    description: 'Certified renewable energy EPC contractor providing residential, commercial, and agricultural solar rooftop installations with hassle-free government net metering.',
    phone: '+91 99899 45678',
    whatsapp: '919989945678',
    email: 'solar@vibranttirupati.example.com',
    website: 'https://vibranttirupati.example.com',
    address: 'Industrial Estate, Auto Nagar, Tirupati, AP',
    rating: 4.9,
    reviewsCount: 22,
    isVerified: true,
    isBusinessOfTheDay: false,
    memberOffer: '₹ 10,000 Extra Cash Discount on 3kW+ Residential Rooftop Solar Installations',
    businessValueGenerated: '₹ 22,00,000',
    connectsReceived: 19,
    productsAndServices: [
      { name: 'Residential Rooftop Solar', desc: '3kW to 10kW systems with central subsidy assistance' },
      { name: 'Commercial & Industrial Solar', desc: '50kW+ solar plants reducing electricity tariffs by 80%' },
      { name: 'Solar Water Heaters & Pumps', desc: 'Heavy duty pressure pump compatible solar heating solutions' }
    ]
  },
  {
    id: 'biz-6',
    name: 'Grand Tirupati Hospitality & Banquets',
    slug: 'grand-tirupati-hospitality',
    category: 'Hospitality & Events',
    ownerName: 'Jc. G. Harish Naidu',
    ownerDesignation: 'Vice President (Fellowship), JCI Tirupati Innovations',
    chapter: 'JCI Tirupati Innovations',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Luxury AC Banquet Halls, Catering & Tirumala Pilgrim Assistance Suites',
    description: 'Sophisticated event venue accommodating 100 to 1,000 guests for business conferences, JCI zone meets, weddings, and premium pilgrim group accommodation.',
    phone: '+91 98480 98765',
    whatsapp: '919848098765',
    email: 'events@grandtirupati.example.com',
    website: 'https://grandtirupati.example.com',
    address: 'Near Alipiri Tollgate, Bypass Road, Tirupati, AP',
    rating: 4.8,
    reviewsCount: 65,
    isVerified: true,
    isBusinessOfTheDay: false,
    memberOffer: '20% off on Hall Rental & Free AV Equipment setup for JCI LO Events',
    businessValueGenerated: '₹ 14,50,000',
    connectsReceived: 35,
    productsAndServices: [
      { name: 'Grand AC Banquet Hall (800 Pax)', desc: 'Acoustic sound, stage lighting, and central air conditioning' },
      { name: 'Authentic South Indian Catering', desc: 'Pure vegetarian traditional festive & wedding menus' },
      { name: 'VIP Suite Accommodation', desc: 'Pilgrim family suites with 24/7 Tirumala travel guidance' }
    ]
  }
];

export const CELEBRATIONS = {
  birthdaysToday: [
    {
      id: 'cel-b1',
      name: 'Jc. B. Naveen Kumar',
      role: 'Director (Youth & Sports)',
      chapter: 'JCI Tirupati Innovations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      wishesSent: 42
    },
    {
      id: 'cel-b2',
      name: 'Jc. Ananya Sharma',
      role: 'Charter Member',
      chapter: 'JCI Tirupati Odyssey',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      wishesSent: 28
    }
  ],
  anniversariesToday: [
    {
      id: 'cel-a1',
      names: 'Jc. CA M. Swathi Rao & Er. Ramana Rao',
      years: '10th Wedding Anniversary',
      chapter: 'JCI Tirupati Innovations',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      wishesSent: 67
    }
  ]
};

export const LIVE_CONNECT_STATS = {
  totalBusinessGeneratedINR: 11845000,
  totalConnectsPassed: 342,
  dealsClosed: 218,
  activeJayceesRegistered: 184,
  approvedBusinesses: 76,
  participatingChapters: 4
};

export const RECENT_CONNECT_FEED = [
  {
    id: 'con-1',
    fromChapter: 'JCI Tirupati Innovations',
    toChapter: 'JCI Tirupati Odyssey',
    fromMember: 'Jc. R. Dinesh Kumar',
    toMember: 'Jc. T. Venkatesh Chowdary',
    category: 'Precast Panels Supply Deal',
    valueINR: '₹ 4,80,000',
    timeAgo: '2 hours ago',
    status: 'CLOSED_WON'
  },
  {
    id: 'con-2',
    fromChapter: 'JCI Tirupati',
    toChapter: 'JCI Tirupati Innovations',
    fromMember: 'Dr. Jc. K. Sumanth Reddy',
    toMember: 'Jc. CA M. Swathi Rao',
    category: 'Corporate Hospital Audit Retainership',
    valueINR: '₹ 1,50,000',
    timeAgo: '5 hours ago',
    status: 'CLOSED_WON'
  },
  {
    id: 'con-3',
    fromChapter: 'JCI Tirupati Power',
    toChapter: 'JCI Tirupati Innovations',
    fromMember: 'Jc. P. Rajesh Varma',
    toMember: 'Jc. G. Harish Naidu',
    category: 'Zone Conference Banquet & Catering',
    valueINR: '₹ 3,20,000',
    timeAgo: '1 day ago',
    status: 'CLOSED_WON'
  }
];

export const PILLARS = [
  {
    id: 'business',
    title: 'Business & Entrepreneurship',
    icon: 'Briefcase',
    tagline: 'Driving local trade, B2B exchange & startup incubation',
    description: 'Empowering Jaycee entrepreneurs through Business of the Day, Business Expo, mutual referrals, and structured commerce across 4 Tirupati chapters.',
    stats: '₹1.18+ Cr Trade Generated'
  },
  {
    id: 'individual',
    title: 'Individual Development',
    icon: 'Sparkles',
    tagline: 'Unlocking personal potential & executive public speaking',
    description: 'Delivering JCI signature training courses, public speaking workshops, negotiation mastery, and personal branding.',
    stats: '12+ Workshops in 2026'
  },
  {
    id: 'leadership',
    title: 'Leadership & Management',
    icon: 'Award',
    tagline: 'Nurturing community leaders and ethical decision makers',
    description: 'Practical board leadership, parliamentary procedures, team governance, and strategic planning for young professionals.',
    stats: '35+ Trained Board Officers'
  },
  {
    id: 'community',
    title: 'Community & Civic Impact',
    icon: 'HeartHandshake',
    tagline: 'Sustainable civic action and welfare in Tirupati',
    description: 'From mass blood donation camps to tree planting drives and municipal citizen problem resolution initiatives.',
    stats: '1,400+ Beneficiaries'
  },
  {
    id: 'health',
    title: 'Health, Fitness & Boxing',
    icon: 'Flame',
    tagline: 'Active lifestyle, boxing academy & wellness drives',
    description: 'Promoting youth fitness through boxing camps, morning marathon walks ("Walk the Talk"), and free orthopaedic screenings.',
    stats: '8 Health Camps Conducted'
  },
  {
    id: 'youth',
    title: 'Youth & Education',
    icon: 'GraduationCap',
    tagline: 'Career guidance, skill building & school aid',
    description: 'Career guidance seminars across Tirupati colleges, digital literacy for rural schools, and leadership camps for students.',
    stats: '600+ Students Mentored'
  },
  {
    id: 'networking',
    title: 'Networking & Internationalism',
    icon: 'Globe',
    tagline: 'Inter-LO twinning and global Jaycee connections',
    description: 'Connecting Tirupati Jaycees with national and international JCI chapters for cross-border fellowship and trade exchange.',
    stats: '15+ Chapter Twinnings'
  },
  {
    id: 'innovation',
    title: 'Technology & Innovation',
    icon: 'Laptop',
    tagline: 'Pioneering digital transformation for JCI',
    description: 'Creating cutting-edge digital platforms, automated business cards, QR attendance systems, and AI-enabled chapter workflows.',
    stats: 'Flagship Digital Platform'
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'Tirupati Jaycees Mega Business Expo & Networking Conclave 2026',
    date: 'Oct 25, 2026',
    time: '09:30 AM - 06:00 PM',
    venue: 'Grand Tirupati Convention Center, Alipiri Road',
    category: 'Business & Trade',
    pillar: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    description: 'Grand 1-day exhibition with 50+ stalls from Jaycee-owned businesses across Tirupati. Featuring speed networking, investor panels, and B2B matchmaking.',
    spotsLeft: 14,
    isMembersOnly: false
  },
  {
    id: 'ev-2',
    title: 'Walk the Talk 5K & Youth Boxing Fitness Championship',
    date: 'Nov 08, 2026',
    time: '06:00 AM - 10:00 AM',
    venue: 'SV University Grounds, Tirupati',
    category: 'Health & Sports',
    pillar: 'Health, Fitness & Well-being',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    description: 'Join 300+ Jaycees and citizens for a healthy morning run followed by live boxing fitness exhibition matches and free health checks.',
    spotsLeft: 45,
    isMembersOnly: false
  },
  {
    id: 'ev-3',
    title: 'Effective Public Speaking & Executive Presence Masterclass',
    date: 'Nov 22, 2026',
    time: '05:00 PM - 08:30 PM',
    venue: 'JCI Innovations Hall, Air Bypass Road',
    category: 'Training & Development',
    pillar: 'Individual Development',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    description: 'Interactive workshop by certified JCI National Trainers on impromptu speaking, stage confidence, and storytelling for business leaders.',
    spotsLeft: 8,
    isMembersOnly: true
  }
];

export const PARTNER_BENEFITS = [
  {
    id: 'par-1',
    name: 'Hotel Bliss Tirupati',
    category: 'Dining & Stay',
    offer: 'Flat 20% off on Buffet Dining & 15% on Room Bookings',
    validTill: 'Dec 31, 2026',
    logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&auto=format&fit=crop&q=80',
    terms: 'Valid for all registered Jaycees in Tirupati upon presenting digital ID card.'
  },
  {
    id: 'par-2',
    name: 'Apollo Diagnostics Tirupati',
    category: 'Diagnostic Health',
    offer: 'Free Complete Blood Picture (CBP) + 25% on Full Body Health Packages',
    validTill: 'Jan 31, 2027',
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
    terms: 'Applicable for Jaycees and their immediate family members across all chapters.'
  },
  {
    id: 'par-3',
    name: 'Maruti Suzuki Arena (Varun Motors)',
    category: 'Automobile',
    offer: 'Special Corporate Discount of ₹15,000 + Free 2-Year Extended Warranty',
    validTill: 'Nov 30, 2026',
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&auto=format&fit=crop&q=80',
    terms: 'Valid on new vehicle bookings with JCI membership verification.'
  }
];

export const PENDING_JAYCEE_APPLICATIONS = [
  {
    id: 'app-101',
    fullName: 'Jc. S. Karthik Reddy',
    phone: '+91 98491 88231',
    email: 'karthik.reddy@gmail.com',
    chapter: 'JCI Tirupati Odyssey',
    membershipId: 'JCI-IN-2026-9812',
    designation: 'Member',
    businessName: 'Reddy Logistics & Warehousing',
    businessCategory: 'Automobile & Transport',
    appliedDate: 'Today at 02:30 PM',
    status: 'PENDING'
  },
  {
    id: 'app-102',
    fullName: 'Jc. P. Sahithi Priya',
    phone: '+91 97012 33451',
    email: 'sahithi.priya@outlook.com',
    chapter: 'JCI Tirupati Power',
    membershipId: 'JCI-IN-2025-4421',
    designation: 'Director (Programs)',
    businessName: 'Aura Interior Architecture',
    businessCategory: 'Construction & Real Estate',
    appliedDate: 'Yesterday at 06:15 PM',
    status: 'PENDING'
  }
];

export const SHOWCASE_SCHEDULE = [
  { date: 'Today (Oct 4)', businessId: 'biz-1', businessName: 'Sri Krishna Soft Solutions', chapter: 'JCI Tirupati Innovations', status: 'ACTIVE_TODAY' },
  { date: 'Tomorrow (Oct 5)', businessId: 'biz-2', businessName: 'Balaji Ortho & Trauma Care Clinic', chapter: 'JCI Tirupati', status: 'SCHEDULED' },
  { date: 'Oct 6, 2026', businessId: 'biz-3', businessName: 'Saptagiri Infra & Precast Developers', chapter: 'JCI Tirupati Odyssey', status: 'SCHEDULED' },
  { date: 'Oct 7, 2026', businessId: 'biz-5', businessName: 'Vibrant Solar & Renewable Energies', chapter: 'JCI Tirupati Power', status: 'SCHEDULED' },
  { date: 'Oct 8, 2026', businessId: 'biz-4', businessName: 'Seven Hills Chartered & Tax Advisors', chapter: 'JCI Tirupati Innovations', status: 'SCHEDULED' }
];

// USER PERSONAS & ROLE-BASED PROFILES
export const DEMO_USERS = [
  {
    id: 'user-superadmin',
    role: 'super_admin',
    roleTitle: 'Super Admin',
    fullName: 'Jc. K. Naresh Kumar',
    membershipId: 'JCI-TI-SA-001',
    designation: 'Platform Super Admin & System Custodian',
    chapter: 'JCI Tirupati Innovations',
    phone: '+91 94401 11222',
    email: 'superadmin@jcitirupati.org',
    whatsapp: '919440111222',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'O+ve',
    birthday: '14 August',
    anniversary: '28 November',
    businessName: 'Naresh Cloud & Cyber Security Labs',
    businessCategory: 'Technology & Software',
    businessTagline: 'Enterprise Cloud Infrastructure, Datacenter Audits & IT Solutions',
    businessAddress: 'Cyber Heights, 2nd Floor, AIR Bypass Road, Tirupati',
    website: 'https://nareshcyberlabs.example.com',
    memberDiscount: '20% Special Discount on IT Audits for Jaycees',
    tenantEnabled: true,
    cardTheme: 'royal-blue',
    products: [
      { name: 'Cloud Infrastructure Setup', price: '₹ 45,000+', desc: 'High availability AWS/Azure setups with automated backups' },
      { name: 'Cyber Security & Vulnerability Audit', price: '₹ 25,000', desc: 'Penetration testing and compliance certification' },
      { name: 'Managed IT Retainership', price: '₹ 12,000/mo', desc: '24/7 server monitoring and priority helpdesk' }
    ]
  },
  {
    id: 'user-president',
    role: 'president',
    roleTitle: 'Admin - Current Year President',
    fullName: 'Jc. Er. P. Ramachandra Raju',
    membershipId: 'JCI-TI-2026-PRES',
    designation: 'Chapter President (2026)',
    chapter: 'JCI Tirupati Innovations',
    phone: '+91 98490 55443',
    email: 'president2026@jcitirupati.org',
    whatsapp: '919849055443',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'B+ve',
    birthday: '05 October',
    anniversary: '18 February',
    businessName: 'Seven Hills Structural Consultants & Builders',
    businessCategory: 'Construction & Real Estate',
    businessTagline: 'Architectural Planning, Structural Designs & Turnkey Building Works',
    businessAddress: 'Opp. Police Parade Grounds, Korlagunta, Tirupati',
    website: 'https://sevenhillsengineers.example.com',
    memberDiscount: 'Complimentary Soil & Structural Audit + 10% on Commercial Layouts',
    tenantEnabled: true,
    cardTheme: 'executive-gold',
    products: [
      { name: 'Structural Engineering & Stability Testing', price: '₹ 35,000', desc: 'Certified structural drawings for commercial & multi-story apartments' },
      { name: 'Turnkey Residential Villa Construction', price: '₹ 2,400/sqft', desc: 'Premium materials, earthquake-resistant design, 5-year guarantee' },
      { name: 'TUDA & Municipal Plan Approvals', price: '₹ 15,000', desc: 'End-to-end liaison and legal documentation clearances' }
    ]
  },
  {
    id: 'user-secretary',
    role: 'officer',
    roleTitle: 'Officer - Chapter Secretary',
    fullName: 'Jc. Adv. S. Venkat Reddy',
    membershipId: 'JCI-TI-2026-SEC',
    designation: 'Secretary (2026)',
    chapter: 'JCI Tirupati Innovations',
    phone: '+91 98851 22334',
    email: 'secretary@jcitirupati.org',
    whatsapp: '919885122334',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'A+ve',
    birthday: '12 December',
    anniversary: '04 May',
    businessName: 'Venkat Reddy & Associates (Legal Advocates)',
    businessCategory: 'Legal & Financial Services',
    businessTagline: 'Corporate Law, Real Estate Title Verifications & Civil Arbitration',
    businessAddress: 'Near District Court Complex, Tirupati',
    website: 'https://venkatlegal.example.com',
    memberDiscount: 'Zero Initial Consultation Fee for all Jaycees in Tirupati',
    tenantEnabled: false,
    cardTheme: 'minimal-slate',
    products: [
      { name: 'Property Title Verification & Legal Opinion', price: '₹ 7,500', desc: '30-year search report with encumbrance verification' },
      { name: 'Commercial Contract & Partnership Drafting', price: '₹ 10,000', desc: 'NDAs, shareholder agreements, MoUs & vendor terms' },
      { name: 'Dispute Arbitration & Legal Representation', price: 'Case-based', desc: 'Civil dispute resolution and company law tribunal representation' }
    ]
  },
  {
    id: 'user-treasurer',
    role: 'officer',
    roleTitle: 'Officer - Chapter Treasurer',
    fullName: 'Jc. CA M. Swathi Rao, FCA',
    membershipId: 'JCI-TI-2026-TREAS',
    designation: 'Treasurer (2026)',
    chapter: 'JCI Tirupati Innovations',
    phone: '+91 97000 34567',
    email: 'treasurer@jcitirupati.org',
    whatsapp: '919700034567',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'B+ve',
    birthday: '21 January',
    anniversary: '10th Wedding Anniversary',
    businessName: 'Seven Hills Chartered & Tax Advisors',
    businessCategory: 'Legal & Financial Services',
    businessTagline: 'GST Filings, Corporate Audits, Startup Advisory & Tax Planning',
    businessAddress: 'Opp. SV University Gate, Air Bypass Road, Tirupati',
    website: 'https://sevenhillstax.example.com',
    memberDiscount: 'Complimentary Financial Health Checkup & 20% on Annual Retainership',
    tenantEnabled: true,
    cardTheme: 'royal-blue',
    products: [
      { name: 'Statutory & Tax Audit', price: '₹ 30,000+', desc: 'Income tax audits, international taxation, and compliance' },
      { name: 'Company & LLP Incorporation', price: '₹ 12,000', desc: 'Startup India registration, DPIIT recognition, MSME certification' },
      { name: 'Project Financing & Loan Syndication DPR', price: '₹ 25,000', desc: 'Detailed Project Reports for bank credit facilities' }
    ]
  },
  {
    id: 'user-member',
    role: 'member',
    roleTitle: 'Member - Entrepreneur',
    fullName: 'Jc. R. Dinesh Kumar',
    membershipId: 'JCI-TI-2026-M042',
    designation: 'Active Member / Entrepreneur',
    chapter: 'JCI Tirupati Innovations',
    phone: '+91 98490 12345',
    email: 'dinesh@srikrishnasoft.com',
    whatsapp: '919849012345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    bloodGroup: 'O+ve',
    birthday: '18 March',
    anniversary: '22 October',
    businessName: 'Sri Krishna Soft Solutions',
    businessCategory: 'Technology & Software',
    businessTagline: 'Custom Web & Mobile Apps, Cloud ERP & Digital Transformation',
    businessAddress: 'Plot 42, Korlagunta Main Road, Tirupati',
    website: 'https://srikrishnasoft.example.com',
    memberDiscount: '15% Discount on Custom Web & App Development for all Tirupati Jaycees',
    tenantEnabled: true,
    cardTheme: 'modern-dark',
    products: [
      { name: 'Custom ERP & Business Portals', price: '₹ 60,000+', desc: 'Multi-branch operations, invoicing, inventory & analytics' },
      { name: 'Full-Stack Mobile Apps (Android/iOS)', price: '₹ 80,000+', desc: 'React Native & Flutter mobile applications' },
      { name: 'E-commerce & WhatsApp Ordering Bots', price: '₹ 35,000', desc: 'Automated catalog ordering and UPI payment integration' }
    ]
  }
];

// CHAPTER ASSETS MANAGEMENT
export const INITIAL_CHAPTER_ASSETS = [
  {
    id: 'ast-101',
    name: 'Presidential Brass Collar & Gold-Plated Medallion',
    category: 'Regalia & Ceremonial',
    custodian: 'Jc. Er. P. Ramachandra Raju (President 2026)',
    location: 'Presidential Safe Box / Meeting Hall',
    condition: 'Excellent',
    valuationINR: 65000,
    purchaseYear: 2022,
    lastAudited: 'Oct 01, 2026',
    notes: 'Worn strictly during Installation, Zone Visits, and Official GB Meetings.'
  },
  {
    id: 'ast-102',
    name: 'Official Heavy Brass Gavel & Sounding Block',
    category: 'Ceremonial & Parliamentary',
    custodian: 'Jc. Adv. S. Venkat Reddy (Secretary 2026)',
    location: 'Secretariat Kit / Meeting Hall',
    condition: 'Excellent',
    valuationINR: 8500,
    purchaseYear: 2021,
    lastAudited: 'Oct 01, 2026',
    notes: 'Used to call meetings to order, adjourn, and declare voting outcomes.'
  },
  {
    id: 'ast-103',
    name: 'JCI Flag & Indian National Flag with Chrome Telescopic Stands',
    category: 'Protocol & Stage Decor',
    custodian: 'Jc. Adv. S. Venkat Reddy (Secretary 2026)',
    location: 'Innovations Chapter Office Store',
    condition: 'Good',
    valuationINR: 14000,
    purchaseYear: 2023,
    lastAudited: 'Sep 15, 2026',
    notes: '2 sets: 1 for outdoor community camps, 1 premium set for indoor conderences.'
  },
  {
    id: 'ast-104',
    name: 'JBL PartyBox Stage PA System + Dual Wireless UHF Microphones',
    category: 'Audio / Visual Equipment',
    custodian: 'Jc. B. Naveen Kumar (Director Youth & Sports)',
    location: 'Sports & Training Center',
    condition: 'Excellent',
    valuationINR: 42000,
    purchaseYear: 2024,
    lastAudited: 'Sep 28, 2026',
    notes: 'Includes wireless transmitter, battery backup, and stand.'
  },
  {
    id: 'ast-105',
    name: 'Epson 3800 Lumens Full HD Projector with 100" Tripod Screen',
    category: 'Audio / Visual Equipment',
    custodian: 'Jc. R. Dinesh Kumar (VP Business)',
    location: 'Chapter Training Hall',
    condition: 'Good',
    valuationINR: 58000,
    purchaseYear: 2023,
    lastAudited: 'Aug 20, 2026',
    notes: 'Includes 15m HDMI cable, remote, and padded travel bag.'
  },
  {
    id: 'ast-106',
    name: 'Health Camp Portable Canopy Tents & Rollup Banners (3 Sets)',
    category: 'Community Camp Equipment',
    custodian: 'Dr. Jc. K. Sumanth Reddy (Director Community)',
    location: 'Clinic Logistics Room',
    condition: 'Fair',
    valuationINR: 19500,
    purchaseYear: 2024,
    lastAudited: 'Sep 10, 2026',
    notes: 'Requires replacement of 1 standee base before next Mega Blood Donation camp.'
  }
];

// TREASURY & ACCOUNTS MANAGEMENT (DUAL-SIGNOFF WORKFLOW)
export const INITIAL_ACCOUNTS_LEDGER = [
  {
    id: 'tx-201',
    date: '2026-10-02',
    type: 'INCOME',
    category: 'Annual Membership Dues',
    description: 'Annual membership renewal - 12 Jaycees batch (Zone IV quota cleared)',
    amountINR: 72000,
    initiatedBy: 'Jc. CA M. Swathi Rao (Treasurer)',
    approvedBy: 'Jc. Er. P. Ramachandra Raju (President)',
    status: 'APPROVED',
    receiptVoucherNo: 'REC-2026-088',
    paymentMethod: 'HDFC Bank NEFT'
  },
  {
    id: 'tx-202',
    date: '2026-10-01',
    type: 'EXPENSE',
    category: 'Meeting & Hospitality',
    description: 'General Body Dinner Meeting & Guest Speaker Honorarium at Grand Tirupati',
    amountINR: 28500,
    initiatedBy: 'Jc. CA M. Swathi Rao (Treasurer)',
    approvedBy: 'Jc. Er. P. Ramachandra Raju (President)',
    status: 'APPROVED',
    receiptVoucherNo: 'VOUCH-2026-042',
    paymentMethod: 'UPI Chapter Official'
  },
  {
    id: 'tx-203',
    date: '2026-09-26',
    type: 'INCOME',
    category: 'Corporate Sponsorship',
    description: 'Title Sponsorship from Seven Hills Builders for Mega Business Expo 2026',
    amountINR: 150000,
    initiatedBy: 'Jc. CA M. Swathi Rao (Treasurer)',
    approvedBy: 'Jc. Er. P. Ramachandra Raju (President)',
    status: 'APPROVED',
    receiptVoucherNo: 'REC-2026-087',
    paymentMethod: 'Cheque Cleared'
  },
  {
    id: 'tx-204',
    date: '2026-09-22',
    type: 'EXPENSE',
    category: 'Community Welfare & Health',
    description: 'Medical Camp Medicine Kits & Blood Donation Bag supplies',
    amountINR: 18200,
    initiatedBy: 'Jc. CA M. Swathi Rao (Treasurer)',
    approvedBy: 'Jc. Er. P. Ramachandra Raju (President)',
    status: 'APPROVED',
    receiptVoucherNo: 'VOUCH-2026-041',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'tx-205',
    date: '2026-10-03',
    type: 'EXPENSE',
    category: 'Digital & Media Branding',
    description: 'Flyer printing, digital stage backdrop, and domain maintenance',
    amountINR: 9400,
    initiatedBy: 'Jc. CA M. Swathi Rao (Treasurer)',
    approvedBy: null,
    status: 'PENDING_PRESIDENT_APPROVAL',
    receiptVoucherNo: 'VOUCH-2026-043',
    paymentMethod: 'Pending Approval'
  }
];

// PRESIDENTIAL TENURES & CABINET HANDOVER
export const PRESIDENTIAL_TENURES = [
  {
    year: 2025,
    status: 'ARCHIVED',
    presidentName: 'Jc. T. Venkatesh Chowdary',
    theme: 'Unite, Empower, Lead',
    secretary: 'Jc. P. Rajesh Varma',
    treasurer: 'Jc. CA M. Swathi Rao',
    totalTradeGeneratedINR: '₹ 84,00,000',
    totalProjectsCompleted: 28,
    membersInducted: 16
  },
  {
    year: 2026,
    status: 'ACTIVE_TENURE',
    presidentName: 'Jc. Er. P. Ramachandra Raju',
    theme: 'Innovate to Elevate: Trade, Health & Youth',
    secretary: 'Jc. Adv. S. Venkat Reddy',
    treasurer: 'Jc. CA M. Swathi Rao',
    totalTradeGeneratedINR: '₹ 1,18,45,000',
    totalProjectsCompleted: 34,
    membersInducted: 24,
    officersList: [
      { portfolio: 'Secretary', name: 'Jc. Adv. S. Venkat Reddy', contact: '+91 98851 22334' },
      { portfolio: 'Treasurer', name: 'Jc. CA M. Swathi Rao', contact: '+91 97000 34567' },
      { portfolio: 'VP (Business & Commerce)', name: 'Jc. R. Dinesh Kumar', contact: '+91 98490 12345' },
      { portfolio: 'VP (Community & Civic Action)', name: 'Dr. Jc. K. Sumanth Reddy', contact: '+91 94400 56789' },
      { portfolio: 'VP (Fellowship & PR)', name: 'Jc. G. Harish Naidu', contact: '+91 98480 98765' },
      { portfolio: 'Director (Youth & Boxing Sports)', name: 'Jc. B. Naveen Kumar', contact: '+91 98491 55667' },
      { portfolio: 'Director (Training & Development)', name: 'Jc. Ananya Sharma', contact: '+91 98850 44332' }
    ]
  },
  {
    year: 2027,
    status: 'INCOMING_ELECT',
    presidentName: 'Jc. R. Dinesh Kumar (President-Elect)',
    theme: 'Digital Jaycees: Empowering Local Enterprises',
    secretary: 'Jc. CA M. Swathi Rao (Proposed)',
    treasurer: 'Jc. B. Naveen Kumar (Proposed)',
    handoverDate: 'December 28, 2026',
    isHandoverReady: true
  }
];

// LEADS & BUSINESS REFERRALS CRM PIPELINE
export const INITIAL_LEADS_PIPELINE = [
  {
    id: 'lead-301',
    title: 'Hospital Management ERP & Patient Portal',
    clientName: 'Dr. Madhavan (Apollo Reach Clinic, Tirupati)',
    clientPhone: '+91 98495 23411',
    clientEmail: 'admin@apolloreach.example.com',
    source: 'Website Public Directory / WhatsApp Click',
    assignedToId: 'user-member', // Jc. R. Dinesh Kumar
    assignedToName: 'Jc. R. Dinesh Kumar (Sri Krishna Soft)',
    referrerName: 'Public Inbound / Website Visitor',
    stage: 'IN_DISCUSSION', // 'NEW' | 'CONTACTED' | 'IN_DISCUSSION' | 'PROPOSAL_SENT' | 'CLOSED_WON' | 'CLOSED_LOST'
    estimatedValueINR: 180000,
    actualClosedValueINR: 0,
    notes: 'Demo completed on Oct 2nd. Needs integration with pathology billing module. Follow up on Tuesday.',
    nextFollowUpDate: '2026-10-06',
    createdAt: '2026-09-29'
  },
  {
    id: 'lead-302',
    title: 'Commercial Office Space 30kW Rooftop Solar',
    clientName: 'Mr. B. Ravindra (Tirupati Auto Mall)',
    clientPhone: '+91 94403 77890',
    clientEmail: 'facilities@tirupatiauto.example.com',
    source: 'P2P Jaycee Referral',
    assignedToId: 'user-superadmin',
    assignedToName: 'Jc. P. Rajesh Varma (Vibrant Solar)',
    referrerName: 'Jc. Er. P. Ramachandra Raju (President 2026)',
    stage: 'CLOSED_WON',
    estimatedValueINR: 1450000,
    actualClosedValueINR: 1450000,
    notes: 'Net metering approved by APSPDCL. Advance of ₹ 5,00,000 received. Closed successfully!',
    nextFollowUpDate: 'Project Underway',
    createdAt: '2026-09-18'
  },
  {
    id: 'lead-303',
    title: 'Annual Statutory Tax Audit & Startup DPIIT Certification',
    clientName: 'Praveen Teja (NutriFoods Agro Pvt Ltd)',
    clientPhone: '+91 97004 55661',
    clientEmail: 'finance@nutrifoods.example.com',
    source: 'Social Media / Flyer Link',
    assignedToId: 'user-treasurer', // Jc. CA M. Swathi Rao
    assignedToName: 'Jc. CA M. Swathi Rao (Seven Hills Tax)',
    referrerName: 'LinkedIn Profile Shared Flyer',
    stage: 'PROPOSAL_SENT',
    estimatedValueINR: 65000,
    actualClosedValueINR: 0,
    notes: 'Proposal sent with 3-tier audit pricing. Awaiting board resolution.',
    nextFollowUpDate: '2026-10-08',
    createdAt: '2026-10-01'
  },
  {
    id: 'lead-304',
    title: 'Turnkey Construction of 4-BHK Luxury Duplex Villa',
    clientName: 'NR Jaycee Srinivasan (California, USA - Tirupati native)',
    clientPhone: '+1 408 555 0199',
    clientEmail: 'srini.v@gmail.com',
    source: 'Digital Visiting Card QR Scan at Expo',
    assignedToId: 'user-president', // Jc. Er. P. Ramachandra Raju
    assignedToName: 'Jc. Er. P. Ramachandra Raju (Seven Hills Structural)',
    referrerName: 'Jc. Adv. S. Venkat Reddy (Secretary 2026)',
    stage: 'IN_DISCUSSION',
    estimatedValueINR: 6200000,
    actualClosedValueINR: 0,
    notes: 'Plan submitted. Virtual walkthrough scheduled via Zoom this Sunday.',
    nextFollowUpDate: '2026-10-07',
    createdAt: '2026-09-25'
  },
  {
    id: 'lead-305',
    title: 'Precast Boundary Walls & Security Cabin (1200 running ft)',
    clientName: 'K. Somasekhar Naidu (Warehouse developer)',
    clientPhone: '+91 98852 99001',
    clientEmail: 'soma.naidu@gmail.com',
    source: 'Website Public Directory',
    assignedToId: 'user-member',
    assignedToName: 'Jc. T. Venkatesh Chowdary (Saptagiri Infra)',
    referrerName: 'Website Visitor Form',
    stage: 'NEW',
    estimatedValueINR: 380000,
    actualClosedValueINR: 0,
    notes: 'Inquiry received for Renigunta road industrial corridor. Need to schedule site visit.',
    nextFollowUpDate: '2026-10-05',
    createdAt: '2026-10-04'
  }
];

// CALENDAR EVENTS & REMINDERS
export const CHAPTER_CALENDAR_ITEMS = [
  {
    id: 'cal-1',
    title: '10th Board of Directors (BOD) Meeting',
    date: '2026-10-12',
    time: '07:30 PM - 09:30 PM',
    venue: 'Board Room, Hotel Bliss, Tirupati',
    type: 'BOD_MEETING', // 'BOD_MEETING' | 'GB_MEETING' | 'EXPO_TRAINING' | 'CELEBRATION'
    attendees: 'PST & Board Officers Only',
    agenda: 'Accounts audit approval, Review of Mega Business Expo stalls, Presidential handover timeline',
    isMandatory: true,
    reminderHours: 24
  },
  {
    id: 'cal-2',
    title: 'General Body (GB) Meeting & Jaycee Business Spotlight',
    date: '2026-10-18',
    time: '06:30 PM - 09:30 PM',
    venue: 'Grand Tirupati Convention Center, Alipiri Road',
    type: 'GB_MEETING',
    attendees: 'All Active Chapter Jaycees & Jayceerettes',
    agenda: 'Business of the Month recognition, Induction of 4 new members, Fellowship Dinner',
    isMandatory: true,
    reminderHours: 48
  },
  {
    id: 'cal-3',
    title: 'Tirupati Jaycees Mega Business Expo 2026',
    date: '2026-10-25',
    time: '09:30 AM - 06:00 PM',
    venue: 'Grand Tirupati Convention Center, Alipiri Road',
    type: 'EXPO_TRAINING',
    attendees: 'Open to All Public, Jaycees & Business Delegations',
    agenda: '50+ member stalls, speed networking, investment talks, B2B lead signing ceremonies',
    isMandatory: false,
    reminderHours: 72
  },
  {
    id: 'cal-4',
    title: 'Jc. B. Naveen Kumar Birthday Celebration',
    date: '2026-10-04',
    time: 'All Day',
    venue: 'Online / WhatsApp Wishes & Social Banner',
    type: 'CELEBRATION',
    attendees: 'Chapter Fellowship',
    agenda: 'Automated greeting flyer dispatch & digital congratulations',
    isMandatory: false,
    reminderHours: 0
  }
];

