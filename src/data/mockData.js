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
