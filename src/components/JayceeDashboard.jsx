import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Cake, 
  ShieldCheck, 
  Check, 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  Coins, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Download,
  QrCode,
  Sparkles,
  Phone,
  Mail,
  Share2,
  Package,
  Layers,
  Award,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Users,
  Repeat,
  FileText,
  Menu,
  X,
  ExternalLink,
  Copy,
  Zap,
  Globe,
  Heart,
  LayoutDashboard,
  LogOut,
  Bell,
  CheckSquare,
  MapPin,
  MessageCircle,
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JciLogo from './JciLogo';
import { loadStoredData, saveStoredData, exportToCSV, formatINR } from '../utils/storage';
import { DatabaseService } from '../services/databaseService';

import { 
  DEMO_USERS, 
  INITIAL_CHAPTER_ASSETS, 
  INITIAL_ACCOUNTS_LEDGER, 
  PRESIDENTIAL_TENURES, 
  INITIAL_LEADS_PIPELINE, 
  CHAPTER_CALENDAR_ITEMS,
  BUSINESSES,
  SHOWCASE_SCHEDULE
} from '../data/mockData';

const CARD_THEMES = [
  {
    id: 'royal-blue',
    name: 'JCI Royal Blue & Gold',
    bg: 'linear-gradient(135deg, #003e6d 0%, #005696 50%, #0284c7 100%)',
    accent: '#f59e0b',
    border: '#0369a1',
    textPrimary: '#ffffff',
    textSecondary: '#bae6fd',
    badgeBg: 'rgba(245, 158, 11, 0.25)',
    badgeColor: '#fef08a'
  },
  {
    id: 'executive-gold',
    name: 'Obsidian & Champagne Gold',
    bg: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
    accent: '#fbbf24',
    border: '#52525b',
    textPrimary: '#ffffff',
    textSecondary: '#e4e4e7',
    badgeBg: 'rgba(251, 191, 36, 0.2)',
    badgeColor: '#fef08a'
  },
  {
    id: 'minimal-slate',
    name: 'Executive Clean White',
    bg: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    accent: '#005696',
    border: '#cbd5e1',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    badgeBg: 'rgba(0, 86, 150, 0.1)',
    badgeColor: '#005696'
  }
];

export default function JayceeDashboard({ 
  authenticatedUser,
  onExitToWebsite, 
  onLogout,
  onSetBusinessOfTheDay,
  onPublishCelebrationToWebsite 
}) {
  // Current user persona & Logged-in session
  const [currentUser, setCurrentUser] = useState(() => {
    return authenticatedUser || loadStoredData('jci_auth_user', null) || DEMO_USERS[0];
  });
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'catalog' | 'vcard' | 'flyers' | 'assets' | 'accounts' | 'handover' | 'showcase' | 'calendar' | 'users'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [dbStatus, setDbStatus] = useState(() => DatabaseService.getStatus());

  // Topbar dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif-1',
      title: 'Deal Won: ₹ 14,50,000 Logged',
      desc: 'Commercial Office Space 30kW Solar deal closed successfully!',
      time: '12m ago',
      unread: true,
      targetTab: 'leads'
    },
    {
      id: 'notif-2',
      title: 'Dual-Signoff Treasury Action Required',
      desc: 'Voucher VCH-402 (₹25,000 for Stage Backdrop) awaits President signoff.',
      time: '45m ago',
      unread: true,
      targetTab: 'accounts'
    },
    {
      id: 'notif-3',
      title: 'Chapter GBM & Leadership Conclave',
      desc: 'General Body Meeting on Oct 25 at Hotel Bliss. RSVP is open.',
      time: '2h ago',
      unread: true,
      targetTab: 'calendar'
    }
  ]);

  // Dynamic state with production-grade LocalStorage & Cloud DB sync
  const [leadsList, setLeadsList] = useState(() => {
    const raw = loadStoredData('jci_leads', INITIAL_LEADS_PIPELINE);
    return Array.isArray(raw) ? raw.map(l => ({
      ...l,
      stage: l.stage || 'NEW'
    })) : INITIAL_LEADS_PIPELINE;
  });
  const [assetsList, setAssetsList] = useState(() => loadStoredData('jci_assets', INITIAL_CHAPTER_ASSETS));
  const [accountsList, setAccountsList] = useState(() => loadStoredData('jci_accounts', INITIAL_ACCOUNTS_LEDGER));
  const [tenuresList, setTenuresList] = useState(() => loadStoredData('jci_tenures', PRESIDENTIAL_TENURES));
  const [calendarList, setCalendarList] = useState(() => {
    const raw = loadStoredData('jci_calendar', CHAPTER_CALENDAR_ITEMS);
    return Array.isArray(raw) ? raw.map(c => ({
      ...c,
      category: c.category || c.type || 'GBM',
      type: c.type || c.category || 'GBM',
      rsvpStatus: c.rsvpStatus || 'RSVP OPEN'
    })) : CHAPTER_CALENDAR_ITEMS;
  });
  const [scheduleList, setScheduleList] = useState(() => loadStoredData('jci_showcase', SHOWCASE_SCHEDULE));
  const [userProducts, setUserProducts] = useState(currentUser.products || []);
  const [usersList, setUsersList] = useState(() => {
    const raw = loadStoredData('jci_users', null);
    let list = Array.isArray(raw) && raw.length > 0 ? raw : [...DEMO_USERS];
    const sessionUser = authenticatedUser || loadStoredData('jci_auth_user', null);
    if (sessionUser && sessionUser.email) {
      const emailLower = sessionUser.email.toLowerCase();
      const idx = list.findIndex(u => (u.email && u.email.toLowerCase() === emailLower) || u.id === sessionUser.id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...sessionUser };
      } else {
        list = [sessionUser, ...list];
      }
      saveStoredData('jci_users', list);
    }
    return list;
  });

  // Sync state changes to localStorage
  useEffect(() => { saveStoredData('jci_leads', leadsList); }, [leadsList]);
  useEffect(() => { saveStoredData('jci_assets', assetsList); }, [assetsList]);
  useEffect(() => { saveStoredData('jci_accounts', accountsList); }, [accountsList]);
  useEffect(() => { saveStoredData('jci_tenures', tenuresList); }, [tenuresList]);
  useEffect(() => { saveStoredData('jci_calendar', calendarList); }, [calendarList]);
  useEffect(() => { saveStoredData('jci_showcase', scheduleList); }, [scheduleList]);
  useEffect(() => { saveStoredData('jci_users', usersList); }, [usersList]);

  // Synchronize authenticatedUser prop into currentUser and usersList
  useEffect(() => {
    if (authenticatedUser) {
      setCurrentUser(authenticatedUser);
      setUserProducts(authenticatedUser.products || []);
      setCardThemeId(authenticatedUser.cardTheme || 'royal-blue');
      setTenantActive(authenticatedUser.tenantEnabled || false);

      setUsersList(prev => {
        const emailLower = authenticatedUser.email?.toLowerCase();
        const exists = prev.some(u => 
          (emailLower && u.email?.toLowerCase() === emailLower) || u.id === authenticatedUser.id
        );
        let updated;
        if (exists) {
          updated = prev.map(u => 
            ((emailLower && u.email?.toLowerCase() === emailLower) || u.id === authenticatedUser.id)
              ? { ...u, ...authenticatedUser }
              : u
          );
        } else {
          updated = [authenticatedUser, ...prev];
        }
        saveStoredData('jci_users', updated);
        DatabaseService.saveUser(authenticatedUser, prev);
        return updated;
      });
    }
  }, [authenticatedUser]);

  // Close topbar dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.topbar-interactive-zone')) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Live Cloud Database Sync Action
  const handleSyncDatabase = async () => {
    setIsSyncing(true);
    try {
      const [users, leads, assets, accounts, cal, sched] = await Promise.all([
        DatabaseService.getUsers(),
        DatabaseService.getLeads(),
        DatabaseService.getAssets(),
        DatabaseService.getAccounts(),
        DatabaseService.getCalendar(),
        DatabaseService.getSchedule()
      ]);
      setUsersList(users);
      setLeadsList(leads);
      setAssetsList(assets);
      setAccountsList(accounts);
      setCalendarList(cal);
      setScheduleList(sched);
      setDbStatus(DatabaseService.getStatus());
      showToast('🟢 Live Database: Data synchronized from cloud successfully!');
    } catch (err) {
      showToast('✓ Local database active and up-to-date.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Users management state
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'member',
    designation: 'Active Member / Entrepreneur',
    password: 'Password@2027',
    businessName: '',
    businessCategory: 'Technology & Software',
    bloodGroup: 'B+ve',
    businessAddress: 'Tirupati, AP, India'
  });

  // Edit User Modal State
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // UI state
  const [toastMessage, setToastMessage] = useState('');
  const [cardThemeId, setCardThemeId] = useState(currentUser.cardTheme || 'royal-blue');
  const [tenantActive, setTenantActive] = useState(currentUser.tenantEnabled || false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Calendar filter and event modals
  const [calendarFilter, setCalendarFilter] = useState('ALL');
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false);
  const [newCalendarForm, setNewCalendarForm] = useState({
    title: '',
    category: 'GBM',
    date: '2026-10-25',
    time: '06:30 PM - 08:30 PM',
    venue: 'Hotel Bliss / Minerva Grand, Tirupati',
    description: '',
    dressCode: 'Jaycee Formal (with Lapel Pin)',
    rsvpStatus: 'RSVP OPEN'
  });

  // WhatsApp Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastEvent, setBroadcastEvent] = useState(null);

  // Assets Modals
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [newAssetForm, setNewAssetForm] = useState({
    name: '',
    category: 'Regalia & Badges',
    custodian: '',
    condition: 'Excellent',
    valuationINR: 15000,
    location: 'Chapter Secretariat, Tirupati',
    notes: 'Official inventory item'
  });

  const [showTransferAssetModal, setShowTransferAssetModal] = useState(false);
  const [transferAssetTarget, setTransferAssetTarget] = useState(null);
  const [transferCustodian, setTransferCustodian] = useState('');

  // Accounts & Treasury Modal
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    category: 'Membership Dues',
    type: 'INCOME',
    amountINR: '',
    receiptVoucherNo: `VCH-${Math.floor(100 + Math.random() * 900)}`,
    description: '',
    date: new Date().toISOString().slice(0, 10)
  });

  // Forms modals
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    title: '',
    clientName: '',
    clientPhone: '',
    source: 'Website Public Directory / WhatsApp Click',
    estimatedValueINR: '',
    notes: '',
    nextFollowUpDate: ''
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductForm, setNewProductForm] = useState({ name: '', price: '', desc: '' });

  // Flyer Studio state
  const [flyerType, setFlyerType] = useState('BIRTHDAY');
  const [flyerMemberName, setFlyerMemberName] = useState('Jc. B. Naveen Kumar');
  const [flyerDesignation, setFlyerDesignation] = useState('Director (Youth & Sports)');
  const [flyerCustomWish, setFlyerCustomWish] = useState('May this year bring immense leadership, prosperity, happiness, and greater heights in all your entrepreneurial endeavors!');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // User Management Handlers (Admin & Super Admin)
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserForm.fullName || !newUserForm.email) return;

    const createdUser = {
      id: `user-${Date.now()}`,
      role: newUserForm.role,
      roleTitle: newUserForm.role === 'president' 
        ? 'Admin - Current Year President' 
        : newUserForm.role === 'officer' 
        ? 'Chapter Officer' 
        : newUserForm.role === 'super_admin' 
        ? 'Super Admin' 
        : 'Member - Entrepreneur',
      fullName: newUserForm.fullName.startsWith('Jc. ') ? newUserForm.fullName : `Jc. ${newUserForm.fullName}`,
      membershipId: `JCI-TI-${Math.floor(1000 + Math.random() * 9000)}`,
      designation: newUserForm.designation || 'Active Member / Entrepreneur',
      chapter: 'JCI Tirupati Innovations',
      phone: newUserForm.phone || '+91 98490 00000',
      email: newUserForm.email,
      password: newUserForm.password || 'Innovations@2027',
      whatsapp: newUserForm.phone?.replace(/[^0-9]/g, '') || '919849000000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bloodGroup: 'O+ve',
      businessName: newUserForm.businessName || 'Jaycee Enterprise',
      businessCategory: newUserForm.businessCategory || 'Technology & Software',
      businessTagline: 'Professional Products & Services in Tirupati',
      businessAddress: 'Tirupati, AP, India',
      website: 'https://jcitirupati.org',
      memberDiscount: '10% Exclusive Discount for Jaycees',
      tenantEnabled: false,
      cardTheme: 'royal-blue',
      status: 'Active',
      products: [
        { name: 'Initial Business Consultation', price: 'Complimentary', desc: 'B2B discussion and matchmaking' }
      ]
    };

    setUsersList([createdUser, ...usersList]);
    setShowCreateUserModal(false);
    setNewUserForm({
      fullName: '',
      email: '',
      phone: '',
      role: 'member',
      designation: 'Active Member / Entrepreneur',
      password: 'Password@2027',
      businessName: '',
      businessCategory: 'Technology & Software'
    });
    showToast(`✓ Added new user: ${createdUser.fullName} (${createdUser.roleTitle})`);
  };

  const handleUpdateUserRole = (userId, newRole, newDesignation) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          designation: newDesignation || u.designation,
          roleTitle: newRole === 'president' 
            ? 'Admin - Current Year President' 
            : newRole === 'officer' 
            ? 'Chapter Officer' 
            : newRole === 'super_admin' 
            ? 'Super Admin' 
            : 'Member - Entrepreneur'
        };
      }
      return u;
    }));
    showToast('✓ Role & portfolio updated successfully!');
  };

  const handleToggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Suspended' ? 'Active' : 'Suspended';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    showToast('User account status updated.');
  };

  const handleSwitchUser = (user) => {
    setCurrentUser(user);
    setUserProducts(user.products || []);
    setCardThemeId(user.cardTheme || 'royal-blue');
    setTenantActive(user.tenantEnabled || false);
    showToast(`Switched active view to: ${user.fullName} (${user.roleTitle})`);
  };

  // Permissions
  const isSuperAdmin = currentUser.role === 'super_admin';
  const isPresident = currentUser.role === 'president';
  const isOfficer = currentUser.role === 'officer';
  const canManageChapter = isSuperAdmin || isPresident;
  const canManageAccounts = isSuperAdmin || isPresident || (isOfficer && currentUser.designation?.includes('Treasurer'));
  const canManageAssets = isSuperAdmin || isPresident || (isOfficer && (currentUser.designation?.includes('Secretary') || currentUser.designation?.includes('Treasurer')));

  // Actions
  const handleUpdateLeadStage = (leadId, newStage, closedValue = null) => {
    setLeadsList(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updated = { ...lead, stage: newStage };
        if (newStage === 'CLOSED_WON') {
          updated.actualClosedValueINR = closedValue ? Number(closedValue) : lead.estimatedValueINR;
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          showToast(`🎉 Deal Won! ₹${(updated.actualClosedValueINR).toLocaleString()} logged into Chapter Connect Tracker!`);
        } else {
          showToast(`Lead stage updated to ${String(newStage || '').replace(/_/g, ' ')}`);
        }
        return updated;
      }
      return lead;
    }));
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.title || !newLeadForm.clientName) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      title: newLeadForm.title,
      clientName: newLeadForm.clientName,
      clientPhone: newLeadForm.clientPhone || '+91 98490 00000',
      clientEmail: 'lead@inquiry.example.com',
      source: newLeadForm.source,
      assignedToId: currentUser.id,
      assignedToName: `${currentUser.fullName} (${currentUser.businessName})`,
      referrerName: 'Manual Entry / Jaycee Dashboard',
      stage: 'NEW',
      estimatedValueINR: Number(newLeadForm.estimatedValueINR) || 25000,
      actualClosedValueINR: 0,
      notes: newLeadForm.notes || 'Newly logged opportunity',
      nextFollowUpDate: newLeadForm.nextFollowUpDate || '2026-10-20',
      createdAt: 'Just now'
    };

    setLeadsList([newLead, ...leadsList]);
    setShowAddLeadModal(false);
    setNewLeadForm({
      title: '',
      clientName: '',
      clientPhone: '',
      source: 'Website Public Directory / WhatsApp Click',
      estimatedValueINR: '',
      notes: '',
      nextFollowUpDate: ''
    });
    showToast('✓ New lead added to your CRM pipeline!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name) return;
    setUserProducts([...userProducts, newProductForm]);
    setShowAddProductModal(false);
    setNewProductForm({ name: '', price: '', desc: '' });
    showToast('✓ Product / Service added to your catalog!');
  };

  const handleDeleteProduct = (index) => {
    setUserProducts(userProducts.filter((_, i) => i !== index));
    showToast('Product removed.');
  };

  // Edit User Handler
  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsersList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setShowEditUserModal(false);
    showToast(`✓ Updated profile for ${editingUser.fullName}`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to remove this user from the chapter directory?')) {
      setUsersList(prev => prev.filter(u => u.id !== userId));
      showToast('User removed from chapter register.');
    }
  };

  // Asset Handlers
  const handleAddAssetSubmit = (e) => {
    e.preventDefault();
    if (!newAssetForm.name) return;
    const newAsset = {
      id: `ast-${Date.now()}`,
      name: newAssetForm.name,
      category: newAssetForm.category,
      custodian: newAssetForm.custodian || `${currentUser.fullName} (${currentUser.designation})`,
      condition: newAssetForm.condition,
      valuationINR: Number(newAssetForm.valuationINR) || 10000,
      location: newAssetForm.location || 'Chapter Secretariat, Tirupati',
      lastAudited: 'Today (Newly Registered)',
      notes: newAssetForm.notes || 'Official chapter property'
    };
    setAssetsList([newAsset, ...assetsList]);
    setShowAddAssetModal(false);
    setNewAssetForm({
      name: '',
      category: 'Regalia & Badges',
      custodian: '',
      condition: 'Excellent',
      valuationINR: 15000,
      location: 'Chapter Secretariat, Tirupati',
      notes: 'Official inventory item'
    });
    showToast(`✓ Asset "${newAsset.name}" registered into Chapter Assets Register!`);
  };

  const handleDeleteAsset = (assetId) => {
    if (window.confirm('Delete this asset from chapter inventory?')) {
      setAssetsList(prev => prev.filter(a => a.id !== assetId));
      showToast('Asset removed from inventory.');
    }
  };

  const handleTransferAssetSubmit = (e) => {
    e.preventDefault();
    if (!transferAssetTarget || !transferCustodian) return;
    setAssetsList(prev => prev.map(ast => {
      if (ast.id === transferAssetTarget.id) {
        return {
          ...ast,
          custodian: transferCustodian,
          lastAudited: 'Today (Live Handover by ' + currentUser.fullName.split(' ')[1] + ')'
        };
      }
      return ast;
    }));
    setShowTransferAssetModal(false);
    setTransferAssetTarget(null);
    showToast(`✓ Asset custody transferred to ${transferCustodian}!`);
  };

  // Accounts & Treasury Handlers
  const handleAddAccountSubmit = (e) => {
    e.preventDefault();
    if (!newAccountForm.amountINR || !newAccountForm.description) return;
    const newEntry = {
      id: `acc-${Date.now()}`,
      date: newAccountForm.date || new Date().toISOString().slice(0, 10),
      receiptVoucherNo: newAccountForm.receiptVoucherNo || `VCH-${Math.floor(100 + Math.random() * 900)}`,
      category: newAccountForm.category,
      type: newAccountForm.type,
      amountINR: Number(newAccountForm.amountINR) || 0,
      status: isPresident || isSuperAdmin ? 'APPROVED' : 'PENDING_PRESIDENT_APPROVAL',
      approvedBy: isPresident || isSuperAdmin ? `${currentUser.fullName} (${currentUser.designation})` : null,
      description: newAccountForm.description
    };
    setAccountsList([newEntry, ...accountsList]);
    setShowAddAccountModal(false);
    setNewAccountForm({
      category: 'Membership Dues',
      type: 'INCOME',
      amountINR: '',
      receiptVoucherNo: `VCH-${Math.floor(100 + Math.random() * 900)}`,
      description: '',
      date: new Date().toISOString().slice(0, 10)
    });
    if (newEntry.status === 'APPROVED') {
      showToast(`✓ Transaction ₹${newEntry.amountINR.toLocaleString()} recorded and approved!`);
    } else {
      showToast(`✓ Voucher ₹${newEntry.amountINR.toLocaleString()} submitted for Presidential Dual-Signoff!`);
    }
  };

  const handleRejectVoucher = (voucherId) => {
    if (window.confirm('Reject and cancel this financial voucher?')) {
      setAccountsList(prev => prev.filter(item => item.id !== voucherId));
      showToast('Voucher rejected and cancelled.');
    }
  };

  // Calendar Event Handlers
  const handleAddCalendarSubmit = (e) => {
    e.preventDefault();
    if (!newCalendarForm.title || !newCalendarForm.date) return;
    const newEvent = {
      id: `cal-${Date.now()}`,
      title: newCalendarForm.title,
      category: newCalendarForm.category,
      date: newCalendarForm.date,
      time: newCalendarForm.time || '06:30 PM - 08:30 PM',
      venue: newCalendarForm.venue || 'Hotel Bliss, Tirupati',
      description: newCalendarForm.description || 'Chapter official event',
      dressCode: newCalendarForm.dressCode || 'Jaycee Formal (with Lapel Pin)',
      rsvpStatus: 'RSVP OPEN',
      confirmedCount: 12
    };
    setCalendarList([newEvent, ...calendarList]);
    setShowAddCalendarModal(false);
    setNewCalendarForm({
      title: '',
      category: 'GBM',
      date: '2026-10-25',
      time: '06:30 PM - 08:30 PM',
      venue: 'Hotel Bliss / Minerva Grand, Tirupati',
      description: '',
      dressCode: 'Jaycee Formal (with Lapel Pin)',
      rsvpStatus: 'RSVP OPEN'
    });
    showToast(`✓ Event "${newEvent.title}" added to Chapter Calendar!`);
  };

  const handleDeleteCalendarEvent = (eventId) => {
    if (window.confirm('Remove this event from chapter calendar?')) {
      setCalendarList(prev => prev.filter(c => c.id !== eventId));
      showToast('Event removed.');
    }
  };

  const handleCopyBroadcastText = (event) => {
    const text = `🔷 *JCI TIRUPATI INNOVATIONS* 🔷\n` +
      `📅 *Official Chapter Meeting & Event Notice*\n\n` +
      `📌 *Event:* ${event.title}\n` +
      `🏷 *Category:* ${event.category}\n` +
      `📆 *Date:* ${event.date}\n` +
      `⏰ *Time:* ${event.time}\n` +
      `📍 *Venue:* ${event.venue}\n` +
      `👔 *Dress Code:* ${event.dressCode}\n\n` +
      `📝 *Agenda & Notes:* ${event.description || 'All Jaycee members, officers and partners are cordially invited to participate.'}\n\n` +
      `🤝 *Leadership:* \n` +
      `Jc. Er. P. Ramachandra Raju (President 2026)\n` +
      `Jc. Adv. S. Venkat Reddy (Secretary 2026)\n\n` +
      `🔗 *RSVP / Details:* https://innovations.sriddha.com`;
    navigator.clipboard.writeText(text);
    showToast('✓ WhatsApp Broadcast invite copied to clipboard!');
  };

  // CSV Exporters
  const handleExportUsersCSV = () => {
    const headers = [
      { label: 'Name', key: 'fullName' },
      { label: 'Membership ID', key: 'membershipId' },
      { label: 'Role', key: 'role' },
      { label: 'Portfolio / Designation', key: 'designation' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      { label: 'Business Name', key: 'businessName' },
      { label: 'Business Category', key: 'businessCategory' },
      { label: 'Blood Group', key: 'bloodGroup' },
      { label: 'Status', key: 'status' }
    ];
    exportToCSV('JCI_Innovations_Members_Roster', headers, usersList);
    showToast('✓ Members Roster exported to CSV!');
  };

  const handleExportLeadsCSV = () => {
    const headers = [
      { label: 'Lead Title', key: 'title' },
      { label: 'Client Name', key: 'clientName' },
      { label: 'Phone', key: 'clientPhone' },
      { label: 'Source', key: 'source' },
      { label: 'Assigned To', key: 'assignedToName' },
      { label: 'Stage', key: 'stage' },
      { label: 'Estimated Value (INR)', key: 'estimatedValueINR' },
      { label: 'Actual Closed Value (INR)', key: 'actualClosedValueINR' },
      { label: 'Follow Up Date', key: 'nextFollowUpDate' },
      { label: 'Notes', key: 'notes' }
    ];
    exportToCSV('JCI_Innovations_Leads_CRM', headers, leadsList);
    showToast('✓ Leads & Referrals exported to CSV!');
  };

  const handleExportAccountsCSV = () => {
    const headers = [
      { label: 'Date', key: 'date' },
      { label: 'Voucher No', key: 'receiptVoucherNo' },
      { label: 'Category', key: 'category' },
      { label: 'Type', key: 'type' },
      { label: 'Amount (INR)', key: 'amountINR' },
      { label: 'Approval Status', key: 'status' },
      { label: 'Approved By', key: 'approvedBy' },
      { label: 'Description', key: 'description' }
    ];
    exportToCSV('JCI_Innovations_Treasury_Ledger', headers, accountsList);
    showToast('✓ Treasury Ledger exported to CSV!');
  };

  const handleExportAssetsCSV = () => {
    const headers = [
      { label: 'Asset Name', key: 'name' },
      { label: 'Category', key: 'category' },
      { label: 'Custodian', key: 'custodian' },
      { label: 'Condition', key: 'condition' },
      { label: 'Valuation (INR)', key: 'valuationINR' },
      { label: 'Location', key: 'location' },
      { label: 'Last Audited', key: 'lastAudited' },
      { label: 'Notes', key: 'notes' }
    ];
    exportToCSV('JCI_Innovations_Assets_Register', headers, assetsList);
    showToast('✓ Assets Register exported to CSV!');
  };

  const handleExportCalendarCSV = () => {
    const headers = [
      { label: 'Event Title', key: 'title' },
      { label: 'Category', key: 'category' },
      { label: 'Date', key: 'date' },
      { label: 'Time', key: 'time' },
      { label: 'Venue', key: 'venue' },
      { label: 'Dress Code', key: 'dressCode' },
      { label: 'RSVP Status', key: 'rsvpStatus' },
      { label: 'Description', key: 'description' }
    ];
    exportToCSV('JCI_Innovations_Chapter_Calendar', headers, calendarList);
    showToast('✓ Chapter Calendar exported to CSV!');
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Delete this lead from pipeline?')) {
      setLeadsList(prev => prev.filter(l => l.id !== leadId));
      showToast('Lead removed.');
    }
  };

  const handleUpdateAssetCustodian = (assetId, newCustodian, newCondition) => {
    setAssetsList(prev => prev.map(ast => {
      if (ast.id === assetId) {
        return {
          ...ast,
          custodian: newCustodian,
          condition: newCondition,
          lastAudited: 'Today (Live Handover)'
        };
      }
      return ast;
    }));
    showToast('✓ Asset custodian updated in register!');
  };

  const handleExecutePresidentialHandover = () => {
    setTenuresList(prev => prev.map(t => {
      if (t.year === 2026) return { ...t, status: 'ARCHIVED (IPP)' };
      if (t.year === 2027) return { ...t, status: 'ACTIVE_TENURE' };
      return t;
    }));
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    showToast('🏛 Annual Presidential Handover Completed! 2027 Cabinet is now Active.');
  };

  const handleSetBizOfTheDay = (biz) => {
    const updated = scheduleList.map((item, idx) => {
      if (idx === 0) {
        return { ...item, businessId: biz.id, businessName: biz.name, chapter: biz.chapter };
      }
      return item;
    });
    setScheduleList(updated);
    if (onSetBusinessOfTheDay) onSetBusinessOfTheDay(biz);
    showToast(`🌟 "${biz.name}" is now featured on the Homepage!`);
  };

  // vCard (.vcf) download
  const handleDownloadVcf = () => {
    const profileUrl = window.location.origin + `/#profile/${currentUser.id || 'jc-member'}`;
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:${String(currentUser?.fullName || '').replace('Jc. ', '')};;;;
FN:${currentUser.fullName}
ORG:${currentUser.businessName || 'JCI Tirupati Innovations'}
TITLE:${currentUser.designation || 'Jaycee Member'}
TEL;TYPE=CELL,VOICE:${currentUser.phone || '+91 98490 12345'}
EMAIL;TYPE=PREF,INTERNET:${currentUser.email || 'info@jcitirupati.org'}
URL:${currentUser.website || profileUrl}
ADR;TYPE=WORK:;;${currentUser.businessAddress || 'Tirupati, AP, India'};;;;
NOTE:JCI Tirupati Innovations - Verified Member. Blood Group: ${currentUser.bloodGroup || 'N/A'}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${String(currentUser?.fullName || 'Jaycee').replace(/[^a-zA-Z0-9]/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyProfileLink = () => {
    const profileUrl = window.location.origin + `/#profile/${currentUser.id || 'jc-member'}`;
    navigator.clipboard.writeText(profileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePublishFlyer = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    if (onPublishCelebrationToWebsite) {
      onPublishCelebrationToWebsite({
        memberName: flyerMemberName,
        designation: flyerDesignation,
        chapter: currentUser.chapter,
        type: flyerType,
        publishedAt: new Date().toLocaleTimeString()
      });
    }
    showToast('🎉 Celebration Flyer published live to Website Home Page Banner!');
  };

  // Calculations
  const totalIncome = accountsList
    .filter(a => a.type === 'INCOME' && a.status === 'APPROVED')
    .reduce((sum, a) => sum + a.amountINR, 0);

  const totalExpense = accountsList
    .filter(a => a.type === 'EXPENSE' && a.status === 'APPROVED')
    .reduce((sum, a) => sum + a.amountINR, 0);

  const netBalance = totalIncome - totalExpense;

  const currentTheme = CARD_THEMES.find(t => t.id === cardThemeId) || CARD_THEMES[0];
  const profileUrl = window.location.origin + `/#profile/${currentUser.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(profileUrl)}&color=005696&bgcolor=ffffff&qzone=1`;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: '#f8fafc',
      color: '#0f172a',
      display: 'flex',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* =========================================================================
          1. DEDICATED SIDEBAR (DESKTOP & MOBILE DRAWER)
         ========================================================================= */}
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            zIndex: 1050,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}

      <aside style={{
        width: '270px',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1100,
        boxShadow: '2px 0 12px rgba(0,0,0,0.03)',
        transition: 'transform 0.25s ease-in-out',
        position: 'relative'
      }} className={`dashboard-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        
        {/* Sidebar Header: JCI Branding */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <JciLogo height={38} />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#005696', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                JCI Innovations
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#64748b' }}>
                Member & Governance Hub
              </div>
            </div>
          </div>

          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="mobile-close-btn"
            style={{ display: 'none', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card Inside Sidebar */}
        <div style={{
          padding: '16px 20px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.fullName}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #0284c7'
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.fullName}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.designation}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              Blood: <strong>{currentUser.bloodGroup}</strong> • {currentUser.membershipId}
            </div>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div style={{
          flex: 1,
          padding: '16px 12px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {/* Section 1: Business & Growth */}
          <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 12px 4px' }}>
            My Business & Growth
          </div>

          <button
            onClick={() => { setActiveTab('leads'); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'leads' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'leads' ? '#005696' : '#334155',
              fontWeight: activeTab === 'leads' ? '700' : '500',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={17} color={activeTab === 'leads' ? '#0284c7' : '#64748b'} />
              <span>Leads & Referrals CRM</span>
            </div>
            <span style={{
              background: activeTab === 'leads' ? '#0284c7' : '#e2e8f0',
              color: activeTab === 'leads' ? '#ffffff' : '#475569',
              fontSize: '0.68rem',
              fontWeight: '700',
              padding: '2px 7px',
              borderRadius: '99px'
            }}>
              {leadsList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('catalog'); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'catalog' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'catalog' ? '#005696' : '#334155',
              fontWeight: activeTab === 'catalog' ? '700' : '500',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Package size={17} color={activeTab === 'catalog' ? '#0284c7' : '#64748b'} />
            <span>Products & Services</span>
          </button>

          <button
            onClick={() => { setActiveTab('vcard'); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'vcard' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'vcard' ? '#005696' : '#334155',
              fontWeight: activeTab === 'vcard' ? '700' : '500',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <QrCode size={17} color={activeTab === 'vcard' ? '#0284c7' : '#64748b'} />
            <span>Digital Card & QR Hub</span>
          </button>

          <button
            onClick={() => { setActiveTab('flyers'); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'flyers' ? '#fce7f3' : 'transparent',
              color: activeTab === 'flyers' ? '#be185d' : '#334155',
              fontWeight: activeTab === 'flyers' ? '700' : '500',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Cake size={17} color={activeTab === 'flyers' ? '#db2777' : '#64748b'} />
            <span>Flyer Studio (Celebrations)</span>
          </button>

          <button
            onClick={() => { setActiveTab('calendar'); setMobileSidebarOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'calendar' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'calendar' ? '#005696' : '#334155',
              fontWeight: activeTab === 'calendar' ? '700' : '500',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Calendar size={17} color={activeTab === 'calendar' ? '#0284c7' : '#64748b'} />
            <span>Calendar & Reminders</span>
          </button>

          {/* Section 2: Chapter Governance (Role Restricted) */}
          {(canManageAssets || canManageAccounts || canManageChapter) && (
            <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '18px 12px 4px' }}>
              Chapter Governance
            </div>
          )}

          {canManageAssets && (
            <button
              onClick={() => { setActiveTab('assets'); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'assets' ? '#fef3c7' : 'transparent',
                color: activeTab === 'assets' ? '#b45309' : '#334155',
                fontWeight: activeTab === 'assets' ? '700' : '500',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={17} color={activeTab === 'assets' ? '#d97706' : '#64748b'} />
                <span>Chapter Assets</span>
              </div>
              <span style={{
                background: '#fef3c7',
                color: '#b45309',
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '2px 7px',
                borderRadius: '99px'
              }}>
                {assetsList.length}
              </span>
            </button>
          )}

          {canManageAccounts && (
            <button
              onClick={() => { setActiveTab('accounts'); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'accounts' ? '#d1fae5' : 'transparent',
                color: activeTab === 'accounts' ? '#065f46' : '#334155',
                fontWeight: activeTab === 'accounts' ? '700' : '500',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Coins size={17} color={activeTab === 'accounts' ? '#059669' : '#64748b'} />
              <span>Treasury & Accounts</span>
            </button>
          )}

          {canManageChapter && (
            <button
              onClick={() => { setActiveTab('handover'); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'handover' ? '#f3e8ff' : 'transparent',
                color: activeTab === 'handover' ? '#6b21a8' : '#334155',
                fontWeight: activeTab === 'handover' ? '700' : '500',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Repeat size={17} color={activeTab === 'handover' ? '#9333ea' : '#64748b'} />
              <span>Handover & Cabinet</span>
            </button>
          )}

          {canManageChapter && (
            <button
              onClick={() => { setActiveTab('showcase'); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'showcase' ? '#ffedd5' : 'transparent',
                color: activeTab === 'showcase' ? '#c2410c' : '#334155',
                fontWeight: activeTab === 'showcase' ? '700' : '500',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Sparkles size={17} color={activeTab === 'showcase' ? '#ea580c' : '#64748b'} />
              <span>Business of the Day</span>
            </button>
          )}

          {/* Members & Officers Hub (Admin & Super Admin) */}
          {canManageChapter && (
            <button
              onClick={() => { setActiveTab('users'); setMobileSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'users' ? '#e0e7ff' : 'transparent',
                color: activeTab === 'users' ? '#3730a3' : '#334155',
                fontWeight: activeTab === 'users' ? '700' : '500',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={17} color={activeTab === 'users' ? '#4f46e5' : '#64748b'} />
                <span>{isSuperAdmin ? 'Master Users Control' : 'Officers & Members'}</span>
              </div>
              <span style={{
                background: '#e0e7ff',
                color: '#3730a3',
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '2px 7px',
                borderRadius: '99px'
              }}>
                {usersList.length}
              </span>
            </button>
          )}
        </div>

        {/* Sidebar Footer: Exit to Public Website */}
        <div style={{
          padding: '14px 16px',
          borderTop: '1px solid #f1f5f9',
          background: '#ffffff'
        }}>
          <button
            onClick={onExitToWebsite}
            style={{
              width: '100%',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#334155',
              padding: '9px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={15} color="#64748b" />
            <span>Return to Public Site</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN CONTENT AREA (TOPBAR + VIEWPORT)
         ========================================================================= */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        {/* Topbar */}
        <header style={{
          height: '68px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          {/* Left: Mobile Toggle & Page Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="dashboard-hamburger"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: '#0f172a',
                padding: '4px',
                cursor: 'pointer'
              }}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                {activeTab === 'leads' && 'Leads & Business Referrals CRM'}
                {activeTab === 'catalog' && 'My Business & Products Catalog'}
                {activeTab === 'vcard' && 'Digital Visiting Card & Dynamic QR'}
                {activeTab === 'flyers' && 'Automated Celebration Flyer Studio'}
                {activeTab === 'calendar' && 'Chapter Calendar & Scheduled Alerts'}
                {activeTab === 'assets' && 'Chapter Assets & Inventory Register'}
                {activeTab === 'accounts' && 'Treasury Ledger & Dual-Signoff Accounts'}
                {activeTab === 'handover' && 'Presidential Succession & Cabinet Appointments'}
                {activeTab === 'showcase' && 'Business of the Day Showcase Scheduler'}
                {activeTab === 'users' && (isSuperAdmin ? 'Master Users Control (Admins, Officers, Members)' : 'Chapter Officers & Members Management')}
              </h1>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Single Page Application • JCI Tirupati Innovations
              </div>
            </div>
          </div>

          {/* Right: Live Cloud DB Badge, Notifications & Profile Menu */}
          <div className="topbar-interactive-zone" style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            {/* Live Database Sync Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.74rem',
              color: '#065f46',
              fontWeight: '700'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)',
                display: 'inline-block'
              }}></span>
              <span>Live DB: innovations-25dd2</span>
              <button
                onClick={handleSyncDatabase}
                disabled={isSyncing}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#059669',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Sync data with live database"
              >
                <Repeat size={12} style={{ transform: isSyncing ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s ease' }} />
              </button>
            </div>

            {/* Notification Bell Icon & Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: showNotifications ? '#e0f2fe' : '#f8fafc',
                  color: showNotifications ? '#005696' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
                title="Chapter Alerts & Notifications"
              >
                <Bell size={18} />
                {notificationsList.filter(n => n.unread).length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.66rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
                  }}>
                    {notificationsList.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notifications Popover Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '340px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                  zIndex: 1200,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f8fafc'
                  }}>
                    <div style={{ fontWeight: '800', fontSize: '0.84rem', color: '#0f172a' }}>
                      Chapter Notifications
                    </div>
                    {notificationsList.filter(n => n.unread).length > 0 && (
                      <button
                        onClick={() => {
                          setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#0284c7',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    {notificationsList.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (notif.targetTab) setActiveTab(notif.targetTab);
                          setNotificationsList(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                          setShowNotifications(false);
                        }}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #f1f5f9',
                          background: notif.unread ? 'rgba(2, 132, 199, 0.04)' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.background = notif.unread ? 'rgba(2, 132, 199, 0.04)' : '#ffffff'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: notif.unread ? '700' : '600', color: '#0f172a' }}>
                            {notif.title}
                          </span>
                          <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
                            {notif.time}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b', lineHeight: '1.4' }}>
                          {notif.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '8px 16px',
                    background: '#f8fafc',
                    borderTop: '1px solid #f1f5f9',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '600' }}>
                      JCI Tirupati Innovations Notification Stream
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill & Account Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '5px 12px 5px 6px',
                  background: showProfileMenu ? '#f1f5f9' : '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '99px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Current Logged-in Profile"
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid #005696'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    border: '1.5px solid #ffffff'
                  }}></span>
                </div>
                <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0f172a', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.fullName}
                  </div>
                  <div style={{ fontSize: '0.67rem', color: '#0284c7', fontWeight: '700' }}>
                    {currentUser.roleTitle || (currentUser.role === 'super_admin' ? 'Super Admin' : 'Active Member')}
                  </div>
                </div>
                <ChevronDown size={14} color="#64748b" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Profile Dropdown Card */}
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '280px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                  zIndex: 1200,
                  overflow: 'hidden'
                }}>
                  {/* User Profile Header */}
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #005696'
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.fullName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: '700' }}>
                        {currentUser.designation}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.email}
                      </div>
                    </div>
                  </div>

                  {/* Quick Profile Nav Items */}
                  <div style={{ padding: '8px' }}>
                    <button
                      onClick={() => { setActiveTab('vcard'); setShowProfileMenu(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <QrCode size={16} color="#0284c7" />
                      <span>My Digital Visiting Card</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('catalog'); setShowProfileMenu(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Package size={16} color="#059669" />
                      <span>My Products & Services</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('users'); setShowProfileMenu(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Users size={16} color="#7c3aed" />
                      <span>Chapter Officers & Members</span>
                    </button>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', padding: '8px' }}>
                    {onLogout && (
                      <button
                        onClick={() => { setShowProfileMenu(false); onLogout(); }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 12px',
                          background: '#fee2e2',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          color: '#b91c1c',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <LogOut size={16} color="#b91c1c" />
                        <span>Sign Out / Logout</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fecaca',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                title="Sign out from session"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* Toast Strip */}
        {toastMessage && (
          <div style={{
            background: '#0284c7',
            color: '#ffffff',
            padding: '8px 24px',
            fontSize: '0.84rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage('')} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {/* Viewport Content */}
        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          background: '#f8fafc'
        }}>
          
          {/* ===================================================================
              VIEW 1: LEADS & REFERRALS CRM
             =================================================================== */}
          {activeTab === 'leads' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Header card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    Leads Pipeline & Conversion Tracker
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Inbound opportunities from website, social media, and mutual Jaycee P2P referrals.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleExportLeadsCSV}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setShowAddLeadModal(true)}
                    style={{
                      background: '#005696',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 16px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(0, 86, 150, 0.25)'
                    }}
                  >
                    <PlusCircle size={16} />
                    <span>Log New Lead / Pass Referral</span>
                  </button>
                </div>
              </div>

              {/* Executive KPI Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>TOTAL PIPELINE LEADS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#005696', margin: '4px 0' }}>{leadsList.length} Opportunities</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>✓ 100% Verified Members</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>CLOSED WON VALUE (INR)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', margin: '4px 0' }}>
                    ₹ {leadsList.filter(l => l.stage === 'CLOSED_WON').reduce((a, b) => a + (b.actualClosedValueINR || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>🎉 Economic Impact Added</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>ESTIMATED ACTIVE VALUE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#d97706', margin: '4px 0' }}>
                    ₹ {leadsList.reduce((a, b) => a + (b.estimatedValueINR || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>In Discussion / Proposals</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>LIVE DATABASE ENGINE</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0284c7', margin: '4px 0' }}>Firebase Firestore</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>🟢 Live Reactive Sync</div>
                </div>
              </div>

              {/* Kanban / Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '16px'
              }}>
                {leadsList.map(lead => {
                  const isWon = lead.stage === 'CLOSED_WON';
                  const isLost = lead.stage === 'CLOSED_LOST';
                  return (
                    <div
                      key={lead.id}
                      style={{
                        background: '#ffffff',
                        border: isWon ? '1.5px solid #10b981' : isLost ? '1.5px solid #ef4444' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '8px'
                        }}>
                          {lead.source}
                        </span>

                        <span style={{
                          background: isWon ? '#d1fae5' : isLost ? '#fee2e2' : '#fef3c7',
                          color: isWon ? '#065f46' : isLost ? '#991b1b' : '#92400e',
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          textTransform: 'uppercase'
                        }}>
                          {String(lead?.stage || 'NEW').replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                          {lead.title}
                        </h3>
                        <div style={{ fontSize: '0.82rem', color: '#334155' }}>
                          Client: <strong>{lead.clientName}</strong>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Phone: {lead.clientPhone}
                        </div>
                      </div>

                      <div style={{
                        background: '#f8fafc',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '700' }}>DEAL VALUE</div>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: isWon ? '#059669' : '#005696' }}>
                            ₹ {(isWon ? lead.actualClosedValueINR : lead.estimatedValueINR).toLocaleString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '700' }}>FOLLOW UP</div>
                          <div style={{ fontSize: '0.78rem', color: '#334155', fontWeight: '600' }}>
                            {lead.nextFollowUpDate}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.76rem', color: '#64748b', fontStyle: 'italic', margin: 0, lineHeight: '1.4' }}>
                        "{lead.notes}"
                      </p>

                      <div style={{
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <label style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: '700' }}>UPDATE STAGE:</label>
                        <select
                          value={lead.stage}
                          onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value)}
                          style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            fontSize: '0.76rem',
                            fontWeight: '600',
                            outline: 'none',
                            cursor: 'pointer',
                            flex: 1
                          }}
                        >
                          <option value="NEW">New Lead</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="IN_DISCUSSION">In Discussion</option>
                          <option value="PROPOSAL_SENT">Proposal Sent</option>
                          <option value="CLOSED_WON">Closed Won (Success!)</option>
                          <option value="CLOSED_LOST">Closed Lost</option>
                        </select>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Delete Lead"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 2: PRODUCTS & SERVICES CATALOG
             =================================================================== */}
          {activeTab === 'catalog' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {currentUser.businessCategory}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: '8px 0 4px 0' }}>
                    {currentUser.businessName}
                  </h2>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 8px 0' }}>
                    {currentUser.businessTagline}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#005696' }}>
                    📍 {currentUser.businessAddress}
                  </div>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  style={{
                    background: '#005696',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <PlusCircle size={16} />
                  <span>Add Product / Service</span>
                </button>
              </div>

              {/* Offer Banner */}
              <div style={{
                background: 'linear-gradient(90deg, #eff6ff 0%, #e0f2fe 100%)',
                border: '1px solid #bae6fd',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase' }}>
                    SPECIAL JAYCEE PRIVILEGE OFFER
                  </div>
                  <div style={{ fontSize: '0.96rem', fontWeight: '700', color: '#005696' }}>
                    {currentUser.memberDiscount}
                  </div>
                </div>
                <span style={{
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: '700'
                }}>
                  Active on Directory
                </span>
              </div>

              {/* Products Grid */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>
                  Catalog Items ({userProducts.length})
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {userProducts.map((prod, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => handleDeleteProduct(idx)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#005696' }}>
                        {prod.price}
                      </div>

                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                        {prod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 3: DIGITAL VISITING CARD & QR HUB
             =================================================================== */}
          {activeTab === 'vcard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px' }} className="vcard-layout-grid">
              {/* Left Column: Live Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Theme Selector */}
                <div style={{
                  background: '#ffffff',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a' }}>
                    Card Theme Template:
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {CARD_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setCardThemeId(theme.id)}
                        style={{
                          background: theme.bg,
                          color: theme.id === 'minimal-slate' ? '#005696' : '#ffffff',
                          border: cardThemeId === theme.id ? '2px solid #005696' : '1px solid #cbd5e1',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {theme.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* The Physical Card Render */}
                <div style={{
                  background: currentTheme.bg,
                  border: `2px solid ${currentTheme.border}`,
                  borderRadius: '24px',
                  padding: '30px 24px',
                  color: currentTheme.textPrimary,
                  boxShadow: '0 20px 35px -10px rgba(0, 86, 150, 0.25)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <JciLogo height={36} />
                      <div>
                        <div style={{ fontSize: '0.76rem', fontWeight: '800', letterSpacing: '0.05em', color: currentTheme.accent, textTransform: 'uppercase' }}>
                          JCI Tirupati Innovations
                        </div>
                        <div style={{ fontSize: '0.68rem', color: currentTheme.textSecondary }}>
                          Zone IV • JCI India
                        </div>
                      </div>
                    </div>

                    <span style={{
                      background: currentTheme.badgeBg,
                      color: currentTheme.badgeColor,
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '20px'
                    }}>
                      {currentUser.membershipId}
                    </span>
                  </div>

                  {/* Member Bio */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '18px' }}>
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.fullName}
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${currentTheme.accent}`
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 2px 0', color: currentTheme.textPrimary }}>
                        {currentUser.fullName}
                      </h3>
                      <div style={{ fontSize: '0.84rem', fontWeight: '600', color: currentTheme.accent }}>
                        {currentUser.designation}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: currentTheme.textSecondary, marginTop: '2px' }}>
                        Blood Group: <strong>{currentUser.bloodGroup}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: '700', color: currentTheme.textPrimary }}>
                      {currentUser.businessName}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: currentTheme.textSecondary, lineHeight: '1.3' }}>
                      {currentUser.businessTagline}
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                    <a href={`tel:${currentUser.phone}`} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 2px', textAlign: 'center', color: currentTheme.textPrimary, textDecoration: 'none', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <Phone size={15} color={currentTheme.accent} />
                      <span>Call</span>
                    </a>
                    <a href={`https://wa.me/${currentUser.whatsapp}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(34, 197, 94, 0.2)', borderRadius: '8px', padding: '8px 2px', textAlign: 'center', color: '#86efac', textDecoration: 'none', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <Share2 size={15} />
                      <span>WhatsApp</span>
                    </a>
                    <a href={`mailto:${currentUser.email}`} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 2px', textAlign: 'center', color: currentTheme.textPrimary, textDecoration: 'none', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <Mail size={15} color={currentTheme.accent} />
                      <span>Email</span>
                    </a>
                    <a href={currentUser.website} target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 2px', textAlign: 'center', color: currentTheme.textPrimary, textDecoration: 'none', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <Globe size={15} color={currentTheme.accent} />
                      <span>Website</span>
                    </a>
                  </div>

                  {/* Footer vCard Download */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ fontSize: '0.7rem', color: currentTheme.textSecondary }}>
                      Scan QR to save contact instantly
                    </div>
                    <button
                      onClick={handleDownloadVcf}
                      style={{
                        background: currentTheme.accent,
                        color: currentTheme.id === 'executive-gold' ? '#000000' : '#ffffff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={14} />
                      <span>Save Contact (.vcf)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code & Tenant Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Standalone Dynamic QR */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0' }}>
                    Member Contactless QR Code
                  </h4>

                  <div style={{
                    padding: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    marginBottom: '16px'
                  }}>
                    <img src={qrCodeUrl} alt="Dynamic QR" style={{ width: '180px', height: '180px', display: 'block' }} />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '280px' }}>
                    <button
                      onClick={handleCopyProfileLink}
                      style={{
                        flex: 1,
                        background: '#f1f5f9',
                        color: '#0f172a',
                        border: '1px solid #cbd5e1',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <Copy size={14} />
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                    <a
                      href={qrCodeUrl}
                      download={`${currentUser.fullName}_QR.png`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        background: '#005696',
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <Download size={14} />
                      <span>Save QR</span>
                    </a>
                  </div>
                </div>

                {/* Letstrack Multi-Tenant Suite */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #fed7aa',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(249, 115, 22, 0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={18} color="#ea580c" />
                      <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#c2410c' }}>
                        Letstrack Tenant Suite
                      </span>
                    </div>
                    <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.68rem', fontWeight: '800', padding: '2px 8px', borderRadius: '10px' }}>
                      Paid Tier
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.4', margin: '0 0 12px 0' }}>
                    Create dedicated enterprise tenant portals with live GPS fleet tracking, employee digital ID cards, and lead dispatch.
                  </p>

                  <div style={{
                    background: '#fff7ed',
                    padding: '12px',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#9a3412' }}>
                        Status: {tenantActive ? 'Active (Enterprise)' : 'Inactive'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#c2410c' }}>
                        {String(currentUser?.businessName || 'enterprise').toLowerCase().replace(/[^a-z0-9]/g, '')}.letstrack.org
                      </div>
                    </div>

                    <button
                      onClick={() => setTenantActive(!tenantActive)}
                      style={{
                        background: tenantActive ? '#10b981' : '#ea580c',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {tenantActive ? '✓ Active' : 'Provision'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 4: FLYER STUDIO (CELEBRATIONS)
             =================================================================== */}
          {activeTab === 'flyers' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '24px' }} className="flyer-layout-grid">
              {/* Controls */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Automated Flyer Settings
                </h3>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>OCCASION</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setFlyerType('BIRTHDAY');
                        setFlyerCustomWish('May this year bring immense leadership, prosperity, happiness, and greater heights in all your entrepreneurial endeavors!');
                      }}
                      style={{
                        background: flyerType === 'BIRTHDAY' ? '#be185d' : '#f8fafc',
                        color: flyerType === 'BIRTHDAY' ? '#ffffff' : '#334155',
                        border: '1px solid ' + (flyerType === 'BIRTHDAY' ? '#be185d' : '#cbd5e1'),
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Cake size={15} />
                      <span>Birthday</span>
                    </button>
                    <button
                      onClick={() => {
                        setFlyerType('ANNIVERSARY');
                        setFlyerCustomWish('Wishing the wonderful couple a lifetime of togetherness, endless joy, and enduring companionship!');
                      }}
                      style={{
                        background: flyerType === 'ANNIVERSARY' ? '#be185d' : '#f8fafc',
                        color: flyerType === 'ANNIVERSARY' ? '#ffffff' : '#334155',
                        border: '1px solid ' + (flyerType === 'ANNIVERSARY' ? '#be185d' : '#cbd5e1'),
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Heart size={15} />
                      <span>Anniversary</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>MEMBER NAME</label>
                  <input
                    type="text"
                    value={flyerMemberName}
                    onChange={(e) => setFlyerMemberName(e.target.value)}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>PORTFOLIO / DESIGNATION</label>
                  <input
                    type="text"
                    value={flyerDesignation}
                    onChange={(e) => setFlyerDesignation(e.target.value)}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>CUSTOM BLESSINGS / GREETING</label>
                  <textarea
                    rows={3}
                    value={flyerCustomWish}
                    onChange={(e) => setFlyerCustomWish(e.target.value)}
                    style={{ width: '100%', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', resize: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={handlePublishFlyer}
                    style={{
                      background: 'linear-gradient(135deg, #005696, #0284c7)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Globe size={16} />
                    <span>Publish to Website Banner</span>
                  </button>

                  <button
                    onClick={() => {
                      window.print();
                    }}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '9px',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Download size={16} />
                    <span>Print / Save HD Flyer</span>
                  </button>

                  <button
                    onClick={() => {
                      const text = encodeURIComponent(`🎉 JCI Tirupati Innovations wishes ${flyerMemberName} a very Happy ${flyerType}! 🎂💐\n\n"${flyerCustomWish}"`);
                      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                    }}
                    style={{
                      background: '#22c55e',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Share2 size={16} />
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Live Canvas Flyer Render */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '4 / 5',
                  background: 'linear-gradient(135deg, #003e6d 0%, #005696 50%, #0284c7 100%)',
                  borderRadius: '20px',
                  padding: '24px',
                  color: '#ffffff',
                  boxShadow: '0 20px 40px rgba(0, 86, 150, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <JciLogo height={36} />
                  <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>
                    JCI Tirupati Innovations
                  </div>

                  <div style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid #f59e0b',
                    color: '#fef08a',
                    padding: '3px 12px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    margin: '12px 0'
                  }}>
                    {flyerType === 'BIRTHDAY' ? '★ Happy Birthday ★' : '★ Happy Wedding Anniversary ★'}
                  </div>

                  <img 
                    src={currentUser.avatar}
                    alt={flyerMemberName}
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #f59e0b',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                      marginBottom: '10px'
                    }}
                  />

                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 2px 0' }}>
                    {flyerMemberName}
                  </h4>
                  <div style={{ fontSize: '0.76rem', color: '#fde68a', fontWeight: '600' }}>
                    {flyerDesignation}
                  </div>

                  <p style={{
                    fontSize: '0.72rem',
                    color: '#e0f2fe',
                    fontStyle: 'italic',
                    background: 'rgba(0,0,0,0.25)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    margin: '12px 0 auto 0',
                    lineHeight: '1.4'
                  }}>
                    "{flyerCustomWish}"
                  </p>

                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '8px' }}>
                    <div style={{ textAlign: 'left', fontSize: '0.64rem', color: '#bae6fd' }}>
                      <strong>Jc. Er. P. Ramachandra Raju</strong><br/>President 2026
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.64rem', color: '#bae6fd' }}>
                      <strong>Jc. Adv. S. Venkat Reddy</strong><br/>Secretary 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW: CHAPTER CALENDAR & SCHEDULED ALERTS
             =================================================================== */}
          {activeTab === 'calendar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    Chapter Calendar & Scheduled Alerts
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Official schedule of General Body Meetings (GBM), Board Meets, Business Conclaves, and Fellowships.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleExportCalendarCSV}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>
                  {canManageChapter && (
                    <button
                      onClick={() => setShowAddCalendarModal(true)}
                      style={{
                        background: '#005696',
                        color: '#ffffff',
                        border: 'none',
                        padding: '9px 16px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(0, 86, 150, 0.25)'
                      }}
                    >
                      <PlusCircle size={16} />
                      <span>Schedule Chapter Event</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Event Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['ALL', 'GBM', 'BOARD_MEETING', 'TRAINING', 'FELLOWSHIP', 'COMMUNITY'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCalendarFilter(cat)}
                    style={{
                      background: calendarFilter === cat ? '#005696' : '#ffffff',
                      color: calendarFilter === cat ? '#ffffff' : '#475569',
                      border: '1px solid ' + (calendarFilter === cat ? '#005696' : '#cbd5e1'),
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {(cat || '').replace(/_/g, ' ')}
                  </button>
                ))}
              </div>

              {/* Event Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {calendarList
                  .filter(ev => calendarFilter === 'ALL' || (ev.category || ev.type || '') === calendarFilter)
                  .map(event => (
                    <div
                      key={event.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          textTransform: 'uppercase'
                        }}>
                          {String(event.category || event.type || 'GBM').replace(/_/g, ' ')}
                        </span>
                        <span style={{
                          background: '#dcfce7',
                          color: '#15803d',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '8px'
                        }}>
                          {event.rsvpStatus || 'RSVP OPEN'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        {event.title}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <Calendar size={15} color="#005696" />
                          <strong>{event.date}</strong> • {event.time}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <MapPin size={15} color="#d97706" />
                          <span>{event.venue}</span>
                        </div>
                        {event.dressCode && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.74rem', color: '#64748b' }}>
                            <span>👔 Dress Code: <strong>{event.dressCode}</strong></span>
                          </div>
                        )}
                      </div>

                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                        {event.description}
                      </p>

                      <div style={{
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <button
                          onClick={() => handleCopyBroadcastText(event)}
                          style={{
                            flex: 1,
                            background: '#22c55e',
                            color: '#ffffff',
                            border: 'none',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            fontSize: '0.76rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px'
                          }}
                        >
                          <MessageCircle size={14} />
                          <span>WhatsApp Broadcast</span>
                        </button>
                        {canManageChapter && (
                          <button
                            onClick={() => handleDeleteCalendarEvent(event.id)}
                            style={{
                              background: '#f1f5f9',
                              color: '#dc2626',
                              border: '1px solid #e2e8f0',
                              padding: '8px',
                              borderRadius: '8px',
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                            title="Delete Event"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 5: CHAPTER ASSETS REGISTER
             =================================================================== */}
          {activeTab === 'assets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    Chapter Assets & Inventory Register
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Official custodianship, equipment condition audit, and asset handover log.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', background: '#f8fafc', padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>TOTAL ASSETS</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#005696' }}>{assetsList.length} Items</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>VALUATION</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#059669' }}>₹ {assetsList.reduce((a, b) => a + b.valuationINR, 0).toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleExportAssetsCSV}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>

                  {canManageAssets && (
                    <button
                      onClick={() => setShowAddAssetModal(true)}
                      style={{
                        background: '#005696',
                        color: '#ffffff',
                        border: 'none',
                        padding: '9px 14px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(0, 86, 150, 0.25)'
                      }}
                    >
                      <PlusCircle size={16} />
                      <span>Register Asset</span>
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
                {assetsList.map(asset => (
                  <div
                    key={asset.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.7rem', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>
                        {asset.category}
                      </span>
                      <span style={{
                        background: asset.condition === 'Excellent' ? '#d1fae5' : '#fef3c7',
                        color: asset.condition === 'Excellent' ? '#065f46' : '#92400e',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '8px'
                      }}>
                        {asset.condition}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {asset.name}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                      Custodian: <strong style={{ color: '#005696' }}>{asset.custodian}</strong>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      Location: {asset.location}
                    </div>

                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b' }}>
                      <span>Valuation: ₹{asset.valuationINR.toLocaleString()}</span>
                      <span>Audited: {asset.lastAudited}</span>
                    </div>

                    <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
                      "{asset.notes}"
                    </p>

                    {canManageAssets && (
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setTransferAssetTarget(asset);
                            setTransferCustodian(asset.custodian || '');
                            setShowTransferAssetModal(true);
                          }}
                          style={{
                            flex: 1,
                            background: '#f1f5f9',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            padding: '7px 10px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Transfer Custody
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
                          style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            padding: '7px 10px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            cursor: 'pointer'
                          }}
                          title="Delete Asset"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 6: TREASURY & ACCOUNTS
             =================================================================== */}
          {activeTab === 'accounts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>TOTAL INCOME RECEIVED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', margin: '4px 0' }}>
                    ₹ {totalIncome.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Dues & Sponsorships</div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>TOTAL EXPENSES APPROVED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#dc2626', margin: '4px 0' }}>
                    ₹ {totalExpense.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Meetings & Community Projects</div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>NET CHAPTER TREASURY</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#005696', margin: '4px 0' }}>
                    ₹ {netBalance.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Official Chapter Bank A/C</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>
                      Dual-Signoff Financial Transactions
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                      All expenditures require dual signoff between Chapter Treasurer and Chapter President.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleExportAccountsCSV}
                      style={{
                        background: '#f1f5f9',
                        color: '#0f172a',
                        border: '1px solid #cbd5e1',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Download size={14} />
                      <span>Export CSV</span>
                    </button>
                    {canManageAccounts && (
                      <button
                        onClick={() => setShowAddAccountModal(true)}
                        style={{
                          background: '#005696',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 6px rgba(0, 86, 150, 0.25)'
                        }}
                      >
                        <PlusCircle size={15} />
                        <span>Record Transaction</span>
                      </button>
                    )}
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '10px 8px' }}>Date</th>
                      <th style={{ padding: '10px 8px' }}>Voucher No</th>
                      <th style={{ padding: '10px 8px' }}>Category & Scope</th>
                      <th style={{ padding: '10px 8px' }}>Type</th>
                      <th style={{ padding: '10px 8px' }}>Amount (₹)</th>
                      <th style={{ padding: '10px 8px' }}>Approval Status</th>
                      <th style={{ padding: '10px 8px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsList.map(item => {
                      const isIncome = item.type === 'INCOME';
                      const isPending = item.status === 'PENDING_PRESIDENT_APPROVAL';
                      return (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 8px', color: '#64748b' }}>{item.date}</td>
                          <td style={{ padding: '12px 8px', fontWeight: '600' }}>{item.receiptVoucherNo}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ color: '#0f172a', fontWeight: '600' }}>{item.category}</div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{item.description}</div>
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{
                              background: isIncome ? '#d1fae5' : '#fee2e2',
                              color: isIncome ? '#065f46' : '#991b1b',
                              padding: '2px 8px',
                              borderRadius: '8px',
                              fontSize: '0.72rem',
                              fontWeight: '700'
                            }}>
                              {item.type}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px', fontWeight: '700', color: isIncome ? '#059669' : '#dc2626' }}>
                            ₹ {item.amountINR.toLocaleString()}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            {isPending ? (
                              <span style={{ color: '#d97706', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                ⏳ Pending President Sign-off
                              </span>
                            ) : (
                              <span style={{ color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={14} color="#059669" />
                                <span>Dual-Signed ({item.approvedBy?.split(' ')[1] || 'Approved'})</span>
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            {isPending && canManageChapter ? (
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  onClick={() => handleApproveVoucher(item.id)}
                                  style={{
                                    background: '#059669',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Dual-Sign
                                </button>
                                <button
                                  onClick={() => handleRejectVoucher(item.id)}
                                  style={{
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    border: '1px solid #fecaca',
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    cursor: 'pointer'
                                  }}
                                  title="Reject Voucher"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Audited</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 7: PRESIDENTIAL HANDOVER & SUCCESSION
             =================================================================== */}
          {activeTab === 'handover' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    Annual Presidential Succession & Cabinet Appointments
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Official tenure transfer mechanism and portfolio appointments.
                  </p>
                </div>

                <button
                  onClick={handleExecutePresidentialHandover}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Repeat size={16} />
                  <span>Execute Annual Handover</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {tenuresList.map(tenure => {
                  const isActive = tenure.status.includes('ACTIVE');
                  const isIncoming = tenure.status.includes('INCOMING');
                  return (
                    <div
                      key={tenure.year}
                      style={{
                        background: '#ffffff',
                        border: isActive ? '2px solid #005696' : isIncoming ? '2px solid #9333ea' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>Year {tenure.year}</span>
                        <span style={{
                          background: isActive ? '#e0f2fe' : isIncoming ? '#f3e8ff' : '#f1f5f9',
                          color: isActive ? '#0369a1' : isIncoming ? '#7e22ce' : '#64748b',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '8px'
                        }}>
                          {tenure.status}
                        </span>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>CHAPTER PRESIDENT</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#005696' }}>{tenure.presidentName}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>
                          Theme: "{tenure.theme}"
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#64748b' }}>Secretary:</span>
                          <span style={{ color: '#0f172a', fontWeight: '600' }}>{tenure.secretary}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#64748b' }}>Treasurer:</span>
                          <span style={{ color: '#0f172a', fontWeight: '600' }}>{tenure.treasurer}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 8: BUSINESS OF THE DAY
             =================================================================== */}
          {activeTab === 'showcase' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  Business of the Day Spotlight Scheduler
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  Select which member business will be pinned on the public homepage hero banner for the day.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {BUSINESSES.map(biz => {
                  const isLive = scheduleList[0]?.businessName === biz.name;
                  return (
                    <div
                      key={biz.id}
                      style={{
                        background: '#ffffff',
                        border: isLive ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <span style={{
                        background: isLive ? '#fef3c7' : '#f1f5f9',
                        color: isLive ? '#b45309' : '#475569',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '8px',
                        alignSelf: 'flex-start'
                      }}>
                        {isLive ? '★ CURRENTLY LIVE SPOTLIGHT' : biz.category}
                      </span>

                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        {biz.name}
                      </h4>

                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Owner: <strong>{biz.ownerName}</strong>
                      </div>

                      <button
                        onClick={() => handleSetBizOfTheDay(biz)}
                        disabled={isLive}
                        style={{
                          marginTop: 'auto',
                          background: isLive ? '#e2e8f0' : '#005696',
                          color: isLive ? '#64748b' : '#ffffff',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: isLive ? 'default' : 'pointer'
                        }}
                      >
                        {isLive ? 'Featured Today' : 'Feature as Business of the Day'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 10: MEMBERS & OFFICERS MANAGEMENT (ADMIN & SUPER ADMIN)
             =================================================================== */}
          {activeTab === 'users' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Top Header Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      background: isSuperAdmin ? '#f3e8ff' : '#e0f2fe',
                      color: isSuperAdmin ? '#7e22ce' : '#0369a1',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}>
                      {isSuperAdmin ? 'SUPER ADMIN MASTER CONTROL' : 'PRESIDENTIAL GOVERNANCE'}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    {isSuperAdmin 
                      ? 'Master Users Directory (Admins, Officers, Members)' 
                      : 'Chapter Officers & Members Management'}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    {isSuperAdmin
                      ? 'Full authority to create, promote, suspend, or reassign Presidents, Officers, and Jaycee Members.'
                      : 'Appoint your cabinet officers (Secretary, Treasurer, VPs, Directors), induct new members, and manage chapter access.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleExportUsersCSV}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setShowCreateUserModal(true)}
                    style={{
                      background: '#005696',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 18px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(0, 86, 150, 0.25)'
                    }}
                  >
                    <PlusCircle size={16} />
                    <span>{isSuperAdmin ? 'Create New User' : 'Appoint Officer / Add Member'}</span>
                  </button>
                </div>
              </div>

              {/* Executive KPI Stat Cards for Users */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>TOTAL CHAPTER STRENGTH</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#005696', margin: '4px 0' }}>{usersList.length} Members</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>✓ Verified Jaycees</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>CABINET OFFICERS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#7c3aed', margin: '4px 0' }}>
                    {usersList.filter(u => u.role === 'officer' || u.role === 'president').length} Leaders
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: '600' }}>President, Secretary, Treasurer</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>ACTIVE GOOD STANDING</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', margin: '4px 0' }}>
                    {usersList.filter(u => u.status !== 'Suspended').length} Active
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>100% Operational Status</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700' }}>LIVE CLOUD REPOSITORY</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0284c7', margin: '4px 0' }}>innovations-25dd2</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>🟢 Real-time Synchronized</div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                {/* Search Input */}
                <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or portfolio..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 36px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Role Filter Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'ALL', label: 'All Users' },
                    { id: 'super_admin', label: 'Super Admin' },
                    { id: 'president', label: 'President (Admin)' },
                    { id: 'officer', label: 'Officers' },
                    { id: 'member', label: 'Members' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setUserRoleFilter(tab.id)}
                      style={{
                        background: userRoleFilter === tab.id ? '#005696' : '#f8fafc',
                        color: userRoleFilter === tab.id ? '#ffffff' : '#475569',
                        border: '1px solid ' + (userRoleFilter === tab.id ? '#005696' : '#e2e8f0'),
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Users Table */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                overflowX: 'auto',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '12px 10px' }}>Jaycee Member</th>
                      <th style={{ padding: '12px 10px' }}>Contact & Login</th>
                      <th style={{ padding: '12px 10px' }}>Role</th>
                      <th style={{ padding: '12px 10px' }}>Portfolio / Designation</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px' }}>Action & Governance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList
                      .filter(user => {
                        const matches = 
                          user.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          user.phone?.includes(userSearchQuery) ||
                          user.designation?.toLowerCase().includes(userSearchQuery.toLowerCase());
                        if (userRoleFilter === 'ALL') return matches;
                        return matches && user.role === userRoleFilter;
                      })
                      .map(user => {
                        const isSuperAdminRow = user.role === 'super_admin';
                        const isPresidentRow = user.role === 'president';
                        const isOfficerRow = user.role === 'officer';
                        const canModifyThisUser = isSuperAdmin || (isPresident && !isSuperAdminRow);

                        return (
                          <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            {/* Member info */}
                            <td style={{ padding: '14px 10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img
                                  src={user.avatar}
                                  alt={user.fullName}
                                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{user.fullName}</span>
                                    {((currentUser.email && user.email && user.email.toLowerCase() === currentUser.email.toLowerCase()) || user.id === currentUser.id) && (
                                      <span style={{
                                        background: '#dbeafe',
                                        color: '#1d4ed8',
                                        fontSize: '0.66rem',
                                        fontWeight: '800',
                                        padding: '1px 7px',
                                        borderRadius: '99px',
                                        border: '1px solid #bfdbfe'
                                      }}>
                                        You (Logged In)
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                    {user.membershipId} • {user.chapter}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Contact info */}
                            <td style={{ padding: '14px 10px' }}>
                              <div style={{ fontWeight: '600', color: '#005696' }}>{user.email}</div>
                              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{user.phone}</div>
                            </td>

                            {/* Role Badge */}
                            <td style={{ padding: '14px 10px' }}>
                              <span style={{
                                background: isSuperAdminRow 
                                  ? '#f3e8ff' 
                                  : isPresidentRow 
                                  ? '#fef3c7' 
                                  : isOfficerRow 
                                  ? '#e0f2fe' 
                                  : '#d1fae5',
                                color: isSuperAdminRow 
                                  ? '#7e22ce' 
                                  : isPresidentRow 
                                  ? '#92400e' 
                                  : isOfficerRow 
                                  ? '#0369a1' 
                                  : '#065f46',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '0.72rem',
                                fontWeight: '800',
                                textTransform: 'uppercase'
                              }}>
                                {user.role === 'super_admin' ? 'Super Admin' : user.role === 'president' ? 'President' : user.role === 'officer' ? 'Officer' : 'Member'}
                              </span>
                            </td>

                            {/* Portfolio Designation */}
                            <td style={{ padding: '14px 10px' }}>
                              <div style={{ fontWeight: '600', color: '#334155' }}>
                                {user.designation}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                {user.businessName}
                              </div>
                            </td>

                            {/* Status */}
                            <td style={{ padding: '14px 10px' }}>
                              <span style={{
                                background: user.status === 'Suspended' ? '#fee2e2' : '#d1fae5',
                                color: user.status === 'Suspended' ? '#991b1b' : '#065f46',
                                padding: '2px 8px',
                                borderRadius: '8px',
                                fontSize: '0.7rem',
                                fontWeight: '700'
                              }}>
                                {user.status || 'Active'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td style={{ padding: '14px 10px' }}>
                              {canModifyThisUser ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  {/* Quick Portfolio Reassign Dropdown */}
                                  <select
                                    value={user.role}
                                    onChange={(e) => {
                                      const nextRole = e.target.value;
                                      let nextDesig = user.designation;
                                      if (nextRole === 'officer' && user.role !== 'officer') nextDesig = 'Director (Portfolio)';
                                      if (nextRole === 'member') nextDesig = 'Active Member / Entrepreneur';
                                      if (nextRole === 'president') nextDesig = 'Chapter President (2026)';
                                      if (nextRole === 'super_admin') nextDesig = 'Platform Super Admin';
                                      handleUpdateUserRole(user.id, nextRole, nextDesig);
                                    }}
                                    style={{
                                      background: '#f8fafc',
                                      border: '1px solid #cbd5e1',
                                      borderRadius: '6px',
                                      padding: '4px 6px',
                                      fontSize: '0.72rem',
                                      fontWeight: '600',
                                      outline: 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {isSuperAdmin && <option value="super_admin">Super Admin</option>}
                                    {isSuperAdmin && <option value="president">President (Admin)</option>}
                                    <option value="officer">Chapter Officer</option>
                                    <option value="member">General Member</option>
                                  </select>

                                  <button
                                    onClick={() => {
                                      setEditingUser({ ...user });
                                      setShowEditUserModal(true);
                                    }}
                                    style={{
                                      background: '#e0f2fe',
                                      color: '#0369a1',
                                      border: '1px solid #bae6fd',
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      fontSize: '0.72rem',
                                      fontWeight: '600',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                    title="Edit Profile & Business Info"
                                  >
                                    <Edit3 size={12} />
                                    <span>Edit</span>
                                  </button>

                                  <button
                                    onClick={() => handleToggleUserStatus(user.id)}
                                    style={{
                                      background: user.status === 'Suspended' ? '#dcfce7' : '#f1f5f9',
                                      color: user.status === 'Suspended' ? '#15803d' : '#64748b',
                                      border: '1px solid #cbd5e1',
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      fontSize: '0.72rem',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {user.status === 'Suspended' ? 'Activate' : 'Suspend'}
                                  </button>

                                  {!isSuperAdminRow && (
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      style={{
                                        background: '#fee2e2',
                                        color: '#dc2626',
                                        border: '1px solid #fecaca',
                                        padding: '4px 6px',
                                        borderRadius: '6px',
                                        fontSize: '0.72rem',
                                        cursor: 'pointer'
                                      }}
                                      title="Remove from Chapter"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                  Protected Master
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          SUB-MODAL: CREATE NEW USER / APPOINT OFFICER
         ========================================================================= */}
      {showCreateUserModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1250,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {isSuperAdmin ? 'Create New System User' : 'Appoint Officer / Add Member'}
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Assign role, official portfolio & login credentials
                </span>
              </div>
              <button onClick={() => setShowCreateUserModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Karthik Reddy"
                  value={newUserForm.fullName}
                  onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Email (Login ID)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@innovations.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Password
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Min 6 characters"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Assign Role
                  </label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => {
                      const nextR = e.target.value;
                      let des = 'Active Member / Entrepreneur';
                      if (nextR === 'officer') des = 'Secretary (2026)';
                      if (nextR === 'president') des = 'Chapter President (2026)';
                      if (nextR === 'super_admin') des = 'Platform Super Admin';
                      setNewUserForm({ ...newUserForm, role: nextR, designation: des });
                    }}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    {isSuperAdmin && <option value="super_admin">Super Admin</option>}
                    {isSuperAdmin && <option value="president">Admin (President)</option>}
                    <option value="officer">Chapter Officer</option>
                    <option value="member">Jaycee Member</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Portfolio Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Secretary / VP Business"
                    value={newUserForm.designation}
                    onChange={(e) => setNewUserForm({ ...newUserForm, designation: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98490 12345"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                    Enterprise Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={newUserForm.businessName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, businessName: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Confirm & Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: LOG NEW LEAD
         ========================================================================= */}
      {showAddLeadModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                Log New Lead / Pass Referral
              </h3>
              <button onClick={() => setShowAddLeadModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Requirement / Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10kW Rooftop Solar Installation"
                  value={newLeadForm.title}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, title: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. K. Rajesh"
                    value={newLeadForm.clientName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientName: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98490 12345"
                    value={newLeadForm.clientPhone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientPhone: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Est. Deal Value (₹)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={newLeadForm.estimatedValueINR}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValueINR: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Lead Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="Website Public Directory / WhatsApp Click">Website Directory</option>
                    <option value="P2P Jaycee Referral">P2P Jaycee Referral</option>
                    <option value="Social Media / Flyer Link">Social Media Flyer</option>
                    <option value="Digital Visiting Card QR Scan">Digital Card QR Scan</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: ADD PRODUCT
         ========================================================================= */}
      {showAddProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                Add Product / Service Offering
              </h3>
              <button onClick={() => setShowAddProductModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Offering Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turnkey Construction Works"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Indicative Price / Rate</label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 2,400 / sqft"
                  value={newProductForm.price}
                  onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={3}
                  value={newProductForm.desc}
                  onChange={(e) => setNewProductForm({ ...newProductForm, desc: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Publish Offering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: EDIT USER PROFILE & BUSINESS
         ========================================================================= */}
      {showEditUserModal && editingUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            padding: '24px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Edit Member Profile & Business
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {editingUser.membershipId} • {editingUser.roleTitle}
                </span>
              </div>
              <button onClick={() => setShowEditUserModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Blood Group</label>
                  <select
                    value={editingUser.bloodGroup || 'B+ve'}
                    onChange={(e) => setEditingUser({ ...editingUser, bloodGroup: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    {['A+ve', 'A-ve', 'B+ve', 'B-ve', 'O+ve', 'O-ve', 'AB+ve', 'AB-ve'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Portfolio / Designation</label>
                <input
                  type="text"
                  value={editingUser.designation}
                  onChange={(e) => setEditingUser({ ...editingUser, designation: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Business Enterprise Name</label>
                  <input
                    type="text"
                    value={editingUser.businessName || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, businessName: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Industry Category</label>
                  <input
                    type="text"
                    value={editingUser.businessCategory || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, businessCategory: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Business Address / Location</label>
                <input
                  type="text"
                  value={editingUser.businessAddress || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, businessAddress: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: REGISTER CHAPTER ASSET
         ========================================================================= */}
      {showAddAssetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Register New Chapter Asset
              </h3>
              <button onClick={() => setShowAddAssetModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAssetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Presidential Official Gavel & Base"
                  value={newAssetForm.name}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, name: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Category</label>
                  <select
                    value={newAssetForm.category}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, category: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="Regalia & Badges">Regalia & Badges</option>
                    <option value="Audio & Visual">Audio & Visual</option>
                    <option value="Display & Signage">Display & Signage</option>
                    <option value="Office & Furniture">Office & Furniture</option>
                    <option value="Electronics & IT">Electronics & IT</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Estimated Value (₹)</label>
                  <input
                    type="number"
                    value={newAssetForm.valuationINR}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, valuationINR: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Custodian</label>
                  <select
                    value={newAssetForm.custodian}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, custodian: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="">Select Officer Custodian</option>
                    {usersList.map(u => (
                      <option key={u.id} value={`${u.fullName} (${u.designation})`}>
                        {u.fullName} ({u.designation})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Condition</label>
                  <select
                    value={newAssetForm.condition}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, condition: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="Excellent">Excellent (Mint Condition)</option>
                    <option value="Good">Good (Working Order)</option>
                    <option value="Needs Maintenance">Needs Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Physical Location</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter Secretariat / President Office"
                  value={newAssetForm.location}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, location: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddAssetModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: TRANSFER ASSET CUSTODY
         ========================================================================= */}
      {showTransferAssetModal && transferAssetTarget && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Transfer Asset Custody
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {transferAssetTarget.name}
                </span>
              </div>
              <button onClick={() => setShowTransferAssetModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleTransferAssetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>
                  Select New Custodian
                </label>
                <select
                  required
                  value={transferCustodian}
                  onChange={(e) => setTransferCustodian(e.target.value)}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                >
                  <option value="">Select Officer or Member</option>
                  {usersList.map(u => (
                    <option key={u.id} value={`${u.fullName} (${u.designation})`}>
                      {u.fullName} ({u.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowTransferAssetModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Confirm Handover
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: RECORD FINANCIAL TRANSACTION (TREASURY)
         ========================================================================= */}
      {showAddAccountModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Record Financial Voucher
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Dual-signoff approval workflow for Chapter Treasury
                </span>
              </div>
              <button onClick={() => setShowAddAccountModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAccountSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Transaction Type</label>
                  <select
                    value={newAccountForm.type}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, type: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="INCOME">INCOME (Received)</option>
                    <option value="EXPENSE">EXPENSE (Paid Out)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newAccountForm.amountINR}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, amountINR: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Category</label>
                  <select
                    value={newAccountForm.category}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, category: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="Membership Dues">Membership Dues</option>
                    <option value="Corporate Sponsorship">Corporate Sponsorship</option>
                    <option value="Meeting Venue & Food">Meeting Venue & Food</option>
                    <option value="Community Project">Community Project</option>
                    <option value="Administration & Regalia">Administration & Regalia</option>
                    <option value="Training & Faculty">Training & Faculty</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Voucher / Receipt Ref</label>
                  <input
                    type="text"
                    value={newAccountForm.receiptVoucherNo}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, receiptVoucherNo: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Description & Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual chapter dues received from 5 new members"
                  value={newAccountForm.description}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, description: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddAccountModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Submit Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL: SCHEDULE CHAPTER EVENT (CALENDAR)
         ========================================================================= */}
      {showAddCalendarModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Schedule Chapter Meeting / Event
              </h3>
              <button onClick={() => setShowAddCalendarModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCalendarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10th General Body Meeting & B2B Trade Conclave"
                  value={newCalendarForm.title}
                  onChange={(e) => setNewCalendarForm({ ...newCalendarForm, title: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Category</label>
                  <select
                    value={newCalendarForm.category}
                    onChange={(e) => setNewCalendarForm({ ...newCalendarForm, category: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  >
                    <option value="GBM">GBM (General Body Meeting)</option>
                    <option value="BOARD_MEETING">Board of Directors Meeting</option>
                    <option value="TRAINING">Training / Workshop</option>
                    <option value="FELLOWSHIP">Fellowship & Family Night</option>
                    <option value="COMMUNITY">Community Impact Project</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Date</label>
                  <input
                    type="date"
                    required
                    value={newCalendarForm.date}
                    onChange={(e) => setNewCalendarForm({ ...newCalendarForm, date: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Time</label>
                  <input
                    type="text"
                    placeholder="06:30 PM - 08:30 PM"
                    value={newCalendarForm.time}
                    onChange={(e) => setNewCalendarForm({ ...newCalendarForm, time: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Dress Code</label>
                  <input
                    type="text"
                    placeholder="Jaycee Formal with Pin"
                    value={newCalendarForm.dressCode}
                    onChange={(e) => setNewCalendarForm({ ...newCalendarForm, dressCode: e.target.value })}
                    style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Venue</label>
                <input
                  type="text"
                  placeholder="e.g. Hotel Bliss, Renigunta Road, Tirupati"
                  value={newCalendarForm.venue}
                  onChange={(e) => setNewCalendarForm({ ...newCalendarForm, venue: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '700' }}>Agenda Notes</label>
                <textarea
                  rows={2}
                  placeholder="Key agenda points to be discussed..."
                  value={newCalendarForm.description}
                  onChange={(e) => setNewCalendarForm({ ...newCalendarForm, description: e.target.value })}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCalendarModal(false)}
                  style={{ flex: 1, background: '#f1f5f9', border: 'none', color: '#475569', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#005696', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Publish to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .dashboard-sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .dashboard-sidebar.open {
            transform: translateX(0) !important;
          }
          .dashboard-hamburger {
            display: block !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
          .persona-label {
            display: none !important;
          }
          .vcard-layout-grid, .flyer-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
