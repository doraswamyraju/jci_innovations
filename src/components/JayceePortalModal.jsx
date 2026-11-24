import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
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
  DollarSign,
  Package,
  Layers,
  Award,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Users,
  Repeat,
  FileText,
  BadgeAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JciLogo from './JciLogo';
import DigitalVisitingCardModal from './DigitalVisitingCardModal';
import CelebrationFlyerModal from './CelebrationFlyerModal';

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

export default function JayceePortalModal({ 
  onClose, 
  onSetBusinessOfTheDay,
  onPublishCelebrationToWebsite
}) {
  // Current active user persona (Role Switcher)
  const [currentUser, setCurrentUser] = useState(DEMO_USERS[1]); // Default to President
  const [activeTab, setActiveTab] = useState('leads'); // 'profile' | 'catalog' | 'leads' | 'assets' | 'accounts' | 'handover' | 'showcase' | 'calendar'

  // Dynamic state
  const [leadsList, setLeadsList] = useState(INITIAL_LEADS_PIPELINE);
  const [assetsList, setAssetsList] = useState(INITIAL_CHAPTER_ASSETS);
  const [accountsList, setAccountsList] = useState(INITIAL_ACCOUNTS_LEDGER);
  const [tenuresList, setTenuresList] = useState(PRESIDENTIAL_TENURES);
  const [calendarList, setCalendarList] = useState(CHAPTER_CALENDAR_ITEMS);
  const [scheduleList, setScheduleList] = useState(SHOWCASE_SCHEDULE);

  // Modals inside portal
  const [isDigitalCardOpen, setIsDigitalCardOpen] = useState(false);
  const [isFlyerStudioOpen, setIsFlyerStudioOpen] = useState(false);
  const [selectedCelebrant, setSelectedCelebrant] = useState(null);

  // Forms & UI state
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
  const [userProducts, setUserProducts] = useState(currentUser.products || []);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Sync user products when persona switches
  const handleSwitchUser = (user) => {
    setCurrentUser(user);
    setUserProducts(user.products || []);
    showToast(`Switched active view to: ${user.fullName} (${user.roleTitle})`);
  };

  // Roles permissions checks
  const isSuperAdmin = currentUser.role === 'super_admin';
  const isPresident = currentUser.role === 'president';
  const isOfficer = currentUser.role === 'officer';
  const canManageChapterGovernance = isSuperAdmin || isPresident;
  const canManageAccounts = isSuperAdmin || isPresident || (isOfficer && currentUser.designation?.includes('Treasurer'));
  const canManageAssets = isSuperAdmin || isPresident || (isOfficer && (currentUser.designation?.includes('Secretary') || currentUser.designation?.includes('Treasurer')));

  // Lead Pipeline Handlers
  const handleUpdateLeadStage = (leadId, newStage, closedValue = null) => {
    setLeadsList(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updated = { ...lead, stage: newStage };
        if (newStage === 'CLOSED_WON') {
          updated.actualClosedValueINR = closedValue ? Number(closedValue) : lead.estimatedValueINR;
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          showToast(`🎉 Deal Won! ₹${(updated.actualClosedValueINR).toLocaleString()} logged into Chapter Business Connect!`);
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
      referrerName: 'Manual Entry / Jaycee Portal',
      stage: 'NEW',
      estimatedValueINR: Number(newLeadForm.estimatedValueINR) || 25000,
      actualClosedValueINR: 0,
      notes: newLeadForm.notes || 'Newly registered lead via portal',
      nextFollowUpDate: newLeadForm.nextFollowUpDate || '2026-10-15',
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

  // Product Catalog Handlers
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name) return;
    setUserProducts([...userProducts, newProductForm]);
    setShowAddProductModal(false);
    setNewProductForm({ name: '', price: '', desc: '' });
    showToast('✓ Product / Service added to your live catalog!');
  };

  const handleDeleteProduct = (index) => {
    setUserProducts(userProducts.filter((_, i) => i !== index));
    showToast('Product removed.');
  };

  // Accounts Approval Handler
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
    showToast('✓ Payment Voucher officially approved with Presidential sign-off!');
  };

  // Asset Custodian Update
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
    showToast('✓ Asset custodian & audit record updated!');
  };

  // Presidential Handover Execution
  const handleExecutePresidentialHandover = () => {
    setTenuresList(prev => prev.map(t => {
      if (t.year === 2026) return { ...t, status: 'ARCHIVED (IPP)' };
      if (t.year === 2027) return { ...t, status: 'ACTIVE_TENURE' };
      return t;
    }));
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    showToast('🏛 Annual Presidential Handover Completed! 2027 Cabinet is now Active.');
  };

  // Business of the Day Handlers
  const handleSetBizOfTheDay = (biz) => {
    const updated = scheduleList.map((item, idx) => {
      if (idx === 0) {
        return { ...item, businessId: biz.id, businessName: biz.name, chapter: biz.chapter };
      }
      return item;
    });
    setScheduleList(updated);
    if (onSetBusinessOfTheDay) onSetBusinessOfTheDay(biz);
    showToast(`🌟 "${biz.name}" is now featured as Business of the Day on Homepage!`);
  };

  // Financial calculations
  const totalIncome = accountsList
    .filter(a => a.type === 'INCOME' && a.status === 'APPROVED')
    .reduce((sum, a) => sum + a.amountINR, 0);

  const totalExpense = accountsList
    .filter(a => a.type === 'EXPENSE' && a.status === 'APPROVED')
    .reduce((sum, a) => sum + a.amountINR, 0);

  const netTreasuryBalance = totalIncome - totalExpense;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: '#090e17',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* =========================================================================
          ROW 1: TOP EXECUTIVE COMMAND BAR & ROLE SWITCHER
         ========================================================================= */}
      <div style={{
        background: '#0d1527',
        borderBottom: '1px solid #1e293b',
        padding: '0 24px',
        minHeight: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        flexShrink: 0
      }}>
        {/* Left: Organization & Portal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <JciLogo height={42} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>
                Jaycee Enterprise & Governance Hub
              </span>
              <span style={{
                background: 'rgba(2, 132, 199, 0.2)',
                color: '#38bdf8',
                border: '1px solid rgba(2, 132, 199, 0.4)',
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                Web Module 2026-27
              </span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
              Logged in as: <strong style={{ color: '#fde68a' }}>{currentUser.fullName}</strong> — <span style={{ color: '#38bdf8' }}>{currentUser.designation}</span>
            </div>
          </div>
        </div>

        {/* Center: Dynamic Role Switcher (Persona Simulator) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#152033',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #1e293b'
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', padding: '0 8px' }}>
            TEST PERSONA:
          </span>
          {DEMO_USERS.map(user => {
            const isSelected = currentUser.id === user.id;
            return (
              <button
                key={user.id}
                onClick={() => handleSwitchUser(user)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#cbd5e1',
                  border: isSelected ? '1px solid #38bdf8' : 'none',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {user.role === 'super_admin' && <ShieldCheck size={13} color="#f59e0b" />}
                {user.role === 'president' && <Award size={13} color="#fbbf24" />}
                {user.role === 'officer' && <FileText size={13} color="#38bdf8" />}
                {user.role === 'member' && <Briefcase size={13} color="#4ade80" />}
                <span>{user.roleTitle.split('-')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Hub & Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsDigitalCardOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #0284c7, #025080)',
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
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
            }}
          >
            <QrCode size={16} />
            <span>My Digital Card</span>
          </button>

          <button
            onClick={() => {
              setSelectedCelebrant({
                name: currentUser.fullName,
                role: currentUser.designation,
                chapter: currentUser.chapter,
                avatar: currentUser.avatar
              });
              setIsFlyerStudioOpen(true);
            }}
            style={{
              background: 'linear-gradient(135deg, #db2777, #be185d)',
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
              boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
            }}
          >
            <Sparkles size={16} />
            <span>Flyer Studio</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '8px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: NAVIGATION TABS BAR
         ========================================================================= */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        flexShrink: 0
      }}>
        <button
          onClick={() => setActiveTab('leads')}
          style={{
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'leads' ? '3px solid #0284c7' : '3px solid transparent',
            color: activeTab === 'leads' ? '#ffffff' : '#94a3b8',
            fontSize: '0.84rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <TrendingUp size={16} color={activeTab === 'leads' ? '#38bdf8' : '#94a3b8'} />
          <span>My Leads & Referrals CRM</span>
          <span style={{
            background: '#0284c7',
            color: '#ffffff',
            fontSize: '0.68rem',
            padding: '2px 6px',
            borderRadius: '10px'
          }}>
            {leadsList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          style={{
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'catalog' ? '3px solid #0284c7' : '3px solid transparent',
            color: activeTab === 'catalog' ? '#ffffff' : '#94a3b8',
            fontSize: '0.84rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <Package size={16} color={activeTab === 'catalog' ? '#38bdf8' : '#94a3b8'} />
          <span>My Business & Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          style={{
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'calendar' ? '3px solid #0284c7' : '3px solid transparent',
            color: activeTab === 'calendar' ? '#ffffff' : '#94a3b8',
            fontSize: '0.84rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <Calendar size={16} color={activeTab === 'calendar' ? '#38bdf8' : '#94a3b8'} />
          <span>Calendar & Alerts</span>
        </button>

        {/* Chapter Governance Tabs (Officers, President, Super Admin) */}
        {canManageAssets && (
          <button
            onClick={() => setActiveTab('assets')}
            style={{
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'assets' ? '3px solid #f59e0b' : '3px solid transparent',
              color: activeTab === 'assets' ? '#fef3c7' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <ShieldCheck size={16} color={activeTab === 'assets' ? '#f59e0b' : '#94a3b8'} />
            <span>Chapter Assets Register</span>
            <span style={{
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
              fontSize: '0.68rem',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              {assetsList.length}
            </span>
          </button>
        )}

        {canManageAccounts && (
          <button
            onClick={() => setActiveTab('accounts')}
            style={{
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'accounts' ? '3px solid #10b981' : '3px solid transparent',
              color: activeTab === 'accounts' ? '#d1fae5' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <Coins size={16} color={activeTab === 'accounts' ? '#10b981' : '#94a3b8'} />
            <span>Treasury & Accounts</span>
          </button>
        )}

        {canManageChapterGovernance && (
          <button
            onClick={() => setActiveTab('handover')}
            style={{
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'handover' ? '3px solid #a855f7' : '3px solid transparent',
              color: activeTab === 'handover' ? '#f3e8ff' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <Repeat size={16} color={activeTab === 'handover' ? '#c084fc' : '#94a3b8'} />
            <span>Presidential Handover & Cabinet</span>
          </button>
        )}

        {canManageChapterGovernance && (
          <button
            onClick={() => setActiveTab('showcase')}
            style={{
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'showcase' ? '3px solid #f97316' : '3px solid transparent',
              color: activeTab === 'showcase' ? '#ffedd5' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={16} color={activeTab === 'showcase' ? '#fb923c' : '#94a3b8'} />
            <span>Business of the Day Manager</span>
          </button>
        )}
      </div>

      {/* =========================================================================
          ROW 3: TOAST NOTIFICATION STRIP
         ========================================================================= */}
      {toastMessage && (
        <div style={{
          background: 'linear-gradient(90deg, #0284c7, #0369a1)',
          color: '#ffffff',
          padding: '8px 24px',
          fontSize: '0.84rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage('')}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* =========================================================================
          MAIN TAB CONTENT AREA
         ========================================================================= */}
      <div style={{
        flex: 1,
        padding: '24px',
        overflowY: 'auto',
        background: '#090e17'
      }}>
        {/* ===================================================================
            TAB 1: LEADS & REFERRALS CRM PIPELINE
           =================================================================== */}
        {activeTab === 'leads' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Leads Top Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              background: '#0f172a',
              padding: '16px 20px',
              borderRadius: '16px',
              border: '1px solid #1e293b'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
                  End-to-End Leads & Referral Pipeline
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Manage inbound web/social inquiries, pass warm Jaycee referrals & convert to closed deal value (₹)
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  style={{
                    background: '#0284c7',
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
                  <span>Log New Lead / Pass Referral</span>
                </button>
              </div>
            </div>

            {/* Pipeline Stage Cards (Kanban Summary) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {leadsList.map(lead => {
                const isWon = lead.stage === 'CLOSED_WON';
                const isLost = lead.stage === 'CLOSED_LOST';
                return (
                  <div
                    key={lead.id}
                    style={{
                      background: '#111c30',
                      border: isWon ? '1.5px solid #10b981' : isLost ? '1.5px solid #ef4444' : '1px solid #1e293b',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        background: 'rgba(2, 132, 199, 0.15)',
                        color: '#38bdf8',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '12px'
                      }}>
                        {lead.source}
                      </span>

                      <span style={{
                        background: isWon ? 'rgba(16, 185, 129, 0.2)' : isLost ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: isWon ? '#34d399' : isLost ? '#f87171' : '#fbbf24',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}>
                        {lead.stage.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Title & Client */}
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' }}>
                        {lead.title}
                      </h4>
                      <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                        Client: <strong>{lead.clientName}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Phone: {lead.clientPhone}
                      </div>
                    </div>

                    {/* Value & Referrer */}
                    <div style={{
                      background: '#090e17',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ESTIMATED / VALUE</div>
                        <div style={{ fontSize: '0.96rem', fontWeight: '800', color: isWon ? '#34d399' : '#fde68a' }}>
                          ₹ {(isWon ? lead.actualClosedValueINR : lead.estimatedValueINR).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>NEXT FOLLOW UP</div>
                        <div style={{ fontSize: '0.76rem', color: '#cbd5e1', fontWeight: '600' }}>
                          {lead.nextFollowUpDate}
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{lead.notes}"
                    </div>

                    {/* Stage Transition Controls */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '10px',
                      borderTop: '1px solid #1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>STAGE:</label>
                      <select
                        value={lead.stage}
                        onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value)}
                        style={{
                          background: '#1e293b',
                          color: '#ffffff',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          fontSize: '0.76rem',
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
            TAB 2: MY BUSINESS & CATALOG MANAGEMENT
           =================================================================== */}
        {activeTab === 'catalog' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Business Info Header */}
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '12px'
                }}>
                  {currentUser.businessCategory}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: '6px 0 2px 0' }}>
                  {currentUser.businessName}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: '0 0 10px 0' }}>
                  {currentUser.businessTagline}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>
                  📍 {currentUser.businessAddress}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setIsDigitalCardOpen(true)}
                  style={{
                    background: '#1e293b',
                    color: '#ffffff',
                    border: '1px solid #334155',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <QrCode size={16} color="#38bdf8" />
                  <span>View Digital Card</span>
                </button>
              </div>
            </div>

            {/* Member Offer Banner */}
            <div style={{
              background: 'linear-gradient(90deg, #1e1b4b, #312e81)',
              border: '1px solid #4338ca',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#a5b4fc', textTransform: 'uppercase' }}>
                  EXCLUSIVE JAYCEE PRIVILEGE OFFER
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
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
                Live on Directory
              </span>
            </div>

            {/* Products and Services Catalog Grid */}
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                  Published Products & Services ({userProducts.length})
                </h4>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <PlusCircle size={15} />
                  <span>Add Product/Service</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {userProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#131f36',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                        {prod.name}
                      </h5>
                      <button
                        onClick={() => handleDeleteProduct(idx)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#38bdf8' }}>
                      {prod.price}
                    </div>

                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                      {prod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: CHAPTER ASSETS REGISTER
           =================================================================== */}
        {activeTab === 'assets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
                  Chapter Assets & Inventory Register
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Track chapter regalia, sound systems, flags, projectors, and current custodians
                </span>
              </div>

              <div style={{
                background: '#152033',
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                display: 'flex',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TOTAL ASSETS</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f59e0b' }}>
                    {assetsList.length} Items
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TOTAL INVENTORY VALUE</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#34d399' }}>
                    ₹ {assetsList.reduce((acc, a) => acc + a.valuationINR, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Items Table/Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {assetsList.map(asset => (
                <div
                  key={asset.id}
                  style={{
                    background: '#111c30',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#fbbf24',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '12px'
                    }}>
                      {asset.category}
                    </span>

                    <span style={{
                      background: asset.condition === 'Excellent' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: asset.condition === 'Excellent' ? '#34d399' : '#fbbf24',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '12px'
                    }}>
                      Condition: {asset.condition}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                    {asset.name}
                  </h4>

                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    Custodian: <strong style={{ color: '#38bdf8' }}>{asset.custodian}</strong>
                  </div>

                  <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    Location: {asset.location}
                  </div>

                  <div style={{
                    background: '#090e17',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.74rem'
                  }}>
                    <span style={{ color: '#94a3b8' }}>Valuation: ₹{asset.valuationINR.toLocaleString()}</span>
                    <span style={{ color: '#94a3b8' }}>Last Audited: {asset.lastAudited}</span>
                  </div>

                  <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>
                    "{asset.notes}"
                  </p>

                  {canManageAssets && (
                    <button
                      onClick={() => handleUpdateAssetCustodian(asset.id, `${currentUser.fullName} (${currentUser.designation})`, asset.condition)}
                      style={{
                        marginTop: 'auto',
                        background: '#1e293b',
                        color: '#ffffff',
                        border: '1px solid #334155',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Take Over Custody as {currentUser.fullName.split(' ')[1]}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: TREASURY & ACCOUNTS MANAGEMENT
           =================================================================== */}
        {activeTab === 'accounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Accounts Summary Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}>
              <div style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>TOTAL INCOME RECEIVED</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399', margin: '4px 0' }}>
                  ₹ {totalIncome.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>From Dues & Corporate Sponsors</div>
              </div>

              <div style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>TOTAL EXPENSES APPROVED</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f87171', margin: '4px 0' }}>
                  ₹ {totalExpense.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Events, Hospitality & Camps</div>
              </div>

              <div style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>NET CHAPTER TREASURY</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8', margin: '4px 0' }}>
                  ₹ {netTreasuryBalance.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>HDFC Bank Official Chapter A/C</div>
              </div>
            </div>

            {/* Financial Ledger Table */}
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              overflowX: 'auto'
            }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: '0 0 16px 0' }}>
                Dual-Signoff Financial Transactions
              </h4>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '10px 8px' }}>Date</th>
                    <th style={{ padding: '10px 8px' }}>Voucher No</th>
                    <th style={{ padding: '10px 8px' }}>Category & Details</th>
                    <th style={{ padding: '10px 8px' }}>Type</th>
                    <th style={{ padding: '10px 8px' }}>Amount (₹)</th>
                    <th style={{ padding: '10px 8px' }}>Sign-off Status</th>
                    <th style={{ padding: '10px 8px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsList.map(item => {
                    const isIncome = item.type === 'INCOME';
                    const isPending = item.status === 'PENDING_PRESIDENT_APPROVAL';
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid #152033' }}>
                        <td style={{ padding: '12px 8px', color: '#94a3b8' }}>{item.date}</td>
                        <td style={{ padding: '12px 8px', fontWeight: '600' }}>{item.receiptVoucherNo}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ color: '#ffffff', fontWeight: '600' }}>{item.category}</div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{item.description}</div>
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{
                            background: isIncome ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: isIncome ? '#34d399' : '#f87171',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}>
                            {item.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', fontWeight: '700', color: isIncome ? '#34d399' : '#f87171' }}>
                          ₹ {item.amountINR.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          {isPending ? (
                            <span style={{ color: '#f59e0b', fontWeight: '700' }}>
                              ⏳ Awaiting President Sign-off
                            </span>
                          ) : (
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                              <span style={{ color: '#34d399', fontWeight: '700' }}>✓ Approved</span>
                              <div>{item.approvedBy}</div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          {isPending && canManageChapterGovernance && (
                            <button
                              onClick={() => handleApproveVoucher(item.id)}
                              style={{
                                background: '#10b981',
                                color: '#ffffff',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.74rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Approve Voucher
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
            TAB 5: PRESIDENTIAL HANDOVER & CABINET APPOINTMENTS
           =================================================================== */}
        {activeTab === 'handover' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
                  Presidential Succession & Cabinet Appointments
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Seamless annual transition between Presidents and formation of new PST Team & Portfolio Leaders
                </span>
              </div>

              <button
                onClick={handleExecutePresidentialHandover}
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #7e22ce)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)'
                }}
              >
                <Repeat size={16} />
                <span>Execute Annual Presidential Handover</span>
              </button>
            </div>

            {/* Tenures Timeline Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {tenuresList.map(tenure => {
                const isActive = tenure.status.includes('ACTIVE');
                const isIncoming = tenure.status.includes('INCOMING');
                return (
                  <div
                    key={tenure.year}
                    style={{
                      background: '#111c30',
                      border: isActive ? '2px solid #0284c7' : isIncoming ? '2px solid #a855f7' : '1px solid #1e293b',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                        Year {tenure.year}
                      </span>
                      <span style={{
                        background: isActive ? 'rgba(2, 132, 199, 0.2)' : isIncoming ? 'rgba(168, 85, 247, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        color: isActive ? '#38bdf8' : isIncoming ? '#c084fc' : '#94a3b8',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '10px'
                      }}>
                        {tenure.status}
                      </span>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>PRESIDENT</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fde68a' }}>
                        {tenure.presidentName}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#38bdf8', fontStyle: 'italic', marginTop: '2px' }}>
                        Theme: "{tenure.theme}"
                      </div>
                    </div>

                    <div style={{
                      background: '#090e17',
                      padding: '12px',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      fontSize: '0.78rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Secretary:</span>
                        <span style={{ color: '#ffffff', fontWeight: '600' }}>{tenure.secretary}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Treasurer:</span>
                        <span style={{ color: '#ffffff', fontWeight: '600' }}>{tenure.treasurer}</span>
                      </div>
                    </div>

                    {tenure.officersList && (
                      <div>
                        <div style={{ fontSize: '0.74rem', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>
                          APPOINTED CABINET ({tenure.officersList.length})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {tenure.officersList.slice(0, 4).map((off, i) => (
                            <div key={i} style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                              • <strong>{off.portfolio}:</strong> {off.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: BUSINESS OF THE DAY MANAGER
           =================================================================== */}
        {activeTab === 'showcase' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
                  Business of the Day Showcase Scheduler
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Pin and promote member businesses on the high-traffic homepage banner for 24-hour spotlight
                </span>
              </div>
            </div>

            {/* List of Member Businesses to Select For Today */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
              {BUSINESSES.map(biz => {
                const isCurrentlyActive = scheduleList[0]?.businessName === biz.name;
                return (
                  <div
                    key={biz.id}
                    style={{
                      background: '#111c30',
                      border: isCurrentlyActive ? '2px solid #f59e0b' : '1px solid #1e293b',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        background: isCurrentlyActive ? '#f59e0b' : 'rgba(2, 132, 199, 0.15)',
                        color: isCurrentlyActive ? '#000000' : '#38bdf8',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '12px'
                      }}>
                        {isCurrentlyActive ? '★ ACTIVE ON HOMEPAGE' : biz.category}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                      {biz.name}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      Owner: <strong>{biz.ownerName}</strong>
                    </div>

                    <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                      "{biz.tagline}"
                    </p>

                    <button
                      onClick={() => handleSetBizOfTheDay(biz)}
                      disabled={isCurrentlyActive}
                      style={{
                        marginTop: 'auto',
                        background: isCurrentlyActive ? '#334155' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: isCurrentlyActive ? '#94a3b8' : '#ffffff',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: isCurrentlyActive ? 'default' : 'pointer'
                      }}
                    >
                      {isCurrentlyActive ? 'Currently Live Spotlight' : 'Set as Business of the Day'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 7: CALENDAR & NOTIFICATIONS
           =================================================================== */}
        {activeTab === 'calendar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
                  Chapter Calendar & Automated Reminders
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Scheduled Board (BOD) meetings, General Body (GB) meets, conclaves & member celebrations
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {calendarList.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: '#111c30',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      background: 'rgba(2, 132, 199, 0.15)',
                      color: '#38bdf8',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '12px'
                    }}>
                      {item.type.replace('_', ' ')}
                    </span>

                    {item.isMandatory && (
                      <span style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        padding: '2px 6px',
                        borderRadius: '10px'
                      }}>
                        Mandatory
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                    {item.title}
                  </h4>

                  <div style={{ fontSize: '0.8rem', color: '#fde68a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>{item.date} • {item.time}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    📍 {item.venue}
                  </div>

                  <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                    Agenda: {item.agenda}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          SUB-MODAL 1: ADD NEW LEAD / PASS REFERRAL
         ========================================================================= */}
      {showAddLeadModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                Log New Lead / Pass Referral
              </h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Requirement / Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10kW Rooftop Solar Installation"
                  value={newLeadForm.title}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, title: e.target.value })}
                  style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Client / Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. K. Rajesh"
                    value={newLeadForm.clientName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientName: e.target.value })}
                    style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98490 12345"
                    value={newLeadForm.clientPhone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, clientPhone: e.target.value })}
                    style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Est. Deal Value (₹)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={newLeadForm.estimatedValueINR}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValueINR: e.target.value })}
                    style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Lead Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                  >
                    <option value="Website Public Directory / WhatsApp Click">Website Directory</option>
                    <option value="P2P Jaycee Referral">P2P Jaycee Referral</option>
                    <option value="Social Media / Flyer Link">Social Media Flyer</option>
                    <option value="Digital Visiting Card QR Scan">Digital Card QR Scan</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Follow-up Notes</label>
                <textarea
                  rows={2}
                  placeholder="Discussion details and next action"
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  style={{ flex: 1, background: '#1e293b', border: 'none', color: '#94a3b8', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#0284c7', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-MODAL 2: ADD PRODUCT / SERVICE
         ========================================================================= */}
      {showAddProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                Add Product or Service Offering
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Offering Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Architectural Planning"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Indicative Price / Rate</label>
                <input
                  type="text"
                  placeholder="e.g. ₹ 35,000 / project"
                  value={newProductForm.price}
                  onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                  style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Description & Scope</label>
                <textarea
                  rows={3}
                  placeholder="Key features and deliverables"
                  value={newProductForm.desc}
                  onChange={(e) => setNewProductForm({ ...newProductForm, desc: e.target.value })}
                  style={{ width: '100%', background: '#090e17', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#ffffff', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  style={{ flex: 1, background: '#1e293b', border: 'none', color: '#94a3b8', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#0284c7', border: 'none', color: '#ffffff', padding: '9px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          LAUNCHABLE SUB-MODAL 3: DIGITAL VISITING CARD
         ========================================================================= */}
      {isDigitalCardOpen && (
        <DigitalVisitingCardModal
          user={currentUser}
          onClose={() => setIsDigitalCardOpen(false)}
        />
      )}

      {/* =========================================================================
          LAUNCHABLE SUB-MODAL 4: CELEBRATION FLYER STUDIO
         ========================================================================= */}
      {isFlyerStudioOpen && (
        <CelebrationFlyerModal
          initialCelebrant={selectedCelebrant}
          onClose={() => setIsFlyerStudioOpen(false)}
          onPublishToWebsite={(flyerData) => {
            if (onPublishCelebrationToWebsite) onPublishCelebrationToWebsite(flyerData);
            showToast('🎉 Celebration Flyer published live to Website Home Page Banner!');
          }}
        />
      )}
    </div>
  );
}
