import React, { useState } from 'react';
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
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JciLogo from './JciLogo';

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
  onExitToWebsite, 
  onSetBusinessOfTheDay,
  onPublishCelebrationToWebsite 
}) {
  // Current user persona (Role Switcher)
  const [currentUser, setCurrentUser] = useState(DEMO_USERS[1]); // Default to President
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'catalog' | 'vcard' | 'flyers' | 'assets' | 'accounts' | 'handover' | 'showcase' | 'calendar'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dynamic state
  const [leadsList, setLeadsList] = useState(INITIAL_LEADS_PIPELINE);
  const [assetsList, setAssetsList] = useState(INITIAL_CHAPTER_ASSETS);
  const [accountsList, setAccountsList] = useState(INITIAL_ACCOUNTS_LEDGER);
  const [tenuresList, setTenuresList] = useState(PRESIDENTIAL_TENURES);
  const [calendarList, setCalendarList] = useState(CHAPTER_CALENDAR_ITEMS);
  const [scheduleList, setScheduleList] = useState(SHOWCASE_SCHEDULE);
  const [userProducts, setUserProducts] = useState(currentUser.products || []);

  // UI state
  const [toastMessage, setToastMessage] = useState('');
  const [cardThemeId, setCardThemeId] = useState(currentUser.cardTheme || 'royal-blue');
  const [tenantActive, setTenantActive] = useState(currentUser.tenantEnabled || false);
  const [copiedLink, setCopiedLink] = useState(false);

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
          showToast(`Lead stage updated to ${newStage.replace('_', ' ')}`);
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

  const handleApproveVoucher = (voucherId) => {
    setAccountsList(prev => prev.map(item => {
      if (item.id === voucherId) {
        return {
          ...item,
          status: 'APPROVED',
          approvedBy: `${currentUser.fullName} (${currentUser.designation})`
        };
      }
      return item;
    }));
    showToast('✓ Payment voucher approved with Presidential sign-off!');
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
N:${currentUser.fullName.replace('Jc. ', '')};;;;
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
    link.setAttribute('download', `${currentUser.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Contact.vcf`);
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
              </h1>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Single Page Application • JCI Tirupati Innovations
              </div>
            </div>
          </div>

          {/* Right: Persona Role Switcher & Quick Exit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Persona Switcher Dropdown */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f1f5f9',
              padding: '4px 8px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b' }} className="persona-label">
                ROLE:
              </span>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const targetUser = DEMO_USERS.find(u => u.id === e.target.value);
                  if (targetUser) handleSwitchUser(targetUser);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: '#005696',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {DEMO_USERS.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.roleTitle} ({user.fullName.replace('Jc. ', '')})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onExitToWebsite}
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
                boxShadow: '0 2px 6px rgba(0, 86, 150, 0.2)'
              }}
            >
              <span>Public Site</span>
              <ExternalLink size={14} />
            </button>
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
                          {lead.stage.replace('_', ' ')}
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
                        {currentUser.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.letstrack.org
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
                      <button
                        onClick={() => handleUpdateAssetCustodian(asset.id, `${currentUser.fullName} (${currentUser.designation})`, asset.condition)}
                        style={{
                          marginTop: 'auto',
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
                        Transfer Custody to Me
                      </button>
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>
                  Dual-Signoff Financial Transactions
                </h3>

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
                              <span style={{ color: '#d97706', fontWeight: '700' }}>⏳ Awaiting President Sign-off</span>
                            ) : (
                              <span style={{ color: '#059669', fontWeight: '700' }}>✓ Approved ({item.approvedBy?.split(' ')[1]})</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            {isPending && canManageChapter && (
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
                                Approve
                              </button>
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
              VIEW 9: CALENDAR & REMINDERS
             =================================================================== */}
          {activeTab === 'calendar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  Chapter Calendar & Reminders
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  Board meetings, General Body meets, training workshops & project deadlines.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
                {calendarList.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', fontSize: '0.7rem', fontWeight: '700', padding: '3px 8px', borderRadius: '8px' }}>
                        {item.type.replace('_', ' ')}
                      </span>
                      {item.isMandatory && (
                        <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.68rem', fontWeight: '700', padding: '2px 6px', borderRadius: '8px' }}>
                          Mandatory
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {item.title}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: '#005696', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} />
                      <span>{item.date} • {item.time}</span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      📍 {item.venue}
                    </div>

                    <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0 }}>
                      Agenda: {item.agenda}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

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
