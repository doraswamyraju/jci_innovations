import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Building2, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Cake, 
  ShieldCheck, 
  Check, 
  X, 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  Coins, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Download 
} from 'lucide-react';
import { 
  TIRUPATI_CHAPTERS, 
  BUSINESSES, 
  SHOWCASE_SCHEDULE, 
  LIVE_CONNECT_STATS, 
  CELEBRATIONS, 
  UPCOMING_EVENTS, 
  PARTNER_BENEFITS 
} from '../data/mockData';

export default function AdminPanel({ 
  applications, 
  onApproveApplication, 
  onRejectApplication, 
  onClose,
  connectFeed
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'approvals' | 'businesses' | 'connects' | 'events' | 'celebrations'
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('All');
  const [scheduleList, setScheduleList] = useState(SHOWCASE_SCHEDULE);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const pendingList = applications.filter(a => a.status === 'PENDING');
  const approvedList = applications.filter(a => a.status === 'APPROVED');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApprove = (app) => {
    onApproveApplication(app.id);
    showToast(`✓ Approved ${app.fullName} (${app.chapter}) successfully!`);
  };

  const handleReject = (app) => {
    onRejectApplication(app.id);
    showToast(`✗ Rejected registration for ${app.fullName}.`);
  };

  const handleSetBusinessOfTheDay = (biz) => {
    const updated = scheduleList.map((item, idx) => {
      if (idx === 0) {
        return { ...item, businessId: biz.id, businessName: biz.name, chapter: biz.chapter };
      }
      return item;
    });
    setScheduleList(updated);
    showToast(`✓ "${biz.name}" set as Business of the Day!`);
  };

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
      {/* Top Admin Navigation Header */}
      <div style={{
        background: '#0e1726',
        borderBottom: '1px solid #1e293b',
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: '700',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Public Site</span>
          </button>

          <div style={{ height: '24px', width: '1px', background: '#334155' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #005696 0%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '1rem',
              color: 'white'
            }}>
              JCI
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Admin Command Center
                <span style={{ fontSize: '0.68rem', background: '#10b981', color: '#022c22', padding: '2px 6px', borderRadius: '4px', fontWeight: '900' }}>
                  SUPER ADMIN
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                JCI Tirupati Innovations (4th LO) • Managing All 4 Chapters
              </div>
            </div>
          </div>
        </div>

        {/* Top Right Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {toastMessage && (
            <div style={{
              background: '#10b981',
              color: '#022c22',
              fontWeight: '800',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              animation: 'fadeIn 0.2s'
            }}>
              {toastMessage}
            </div>
          )}

          <div style={{ textAlign: 'right', fontSize: '0.82rem' }}>
            <div style={{ color: '#ffffff', fontWeight: '700' }}>Admin Secretariat</div>
            <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>admin@jcitirupatiinnovations.org</div>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace with Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Admin Sidebar Navigation */}
        <div style={{
          width: '260px',
          background: '#0b1322',
          borderRight: '1px solid #1e293b',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', padding: '6px 12px', letterSpacing: '0.05em' }}>
            Core Modules
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Overview Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`admin-nav-btn ${activeTab === 'approvals' ? 'active' : ''}`}
          >
            <UserCheck size={18} />
            <span>Member Approvals</span>
            {pendingList.length > 0 && (
              <span className="admin-pill-badge">{pendingList.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('businesses')}
            className={`admin-nav-btn ${activeTab === 'businesses' ? 'active' : ''}`}
          >
            <Building2 size={18} />
            <span>Business Showcase</span>
          </button>

          <button
            onClick={() => setActiveTab('connects')}
            className={`admin-nav-btn ${activeTab === 'connects' ? 'active' : ''}`}
          >
            <TrendingUp size={18} />
            <span>Connect & Trade Tracker</span>
          </button>

          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', padding: '12px 12px 6px 12px', letterSpacing: '0.05em' }}>
            Chapter Operations
          </div>

          <button
            onClick={() => setActiveTab('events')}
            className={`admin-nav-btn ${activeTab === 'events' ? 'active' : ''}`}
          >
            <Calendar size={18} />
            <span>Events & Attendees</span>
          </button>

          <button
            onClick={() => setActiveTab('celebrations')}
            className={`admin-nav-btn ${activeTab === 'celebrations' ? 'active' : ''}`}
          >
            <Cake size={18} />
            <span>Celebrations Manager</span>
          </button>
        </div>

        {/* Admin Main Body Panel */}
        <div style={{ flex: 1, padding: '28px', overflowY: 'auto', background: '#090e17' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                  Ecosystem Executive Summary
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  Consolidated metrics across all 4 Tirupati Local Organizations (Innovations, Tirupati, Odyssey, Power).
                </p>
              </div>

              {/* 4 Big KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
                    Total Trade Value
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f59e0b', marginTop: '4px' }}>
                    ₹ 1.18+ Cr
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
                    + ₹ 14.5L this quarter
                  </div>
                </div>

                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
                    Pending Registrations
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: pendingList.length > 0 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
                    {pendingList.length} Queue
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                    Awaiting Admin Approval
                  </div>
                </div>

                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
                    Verified Businesses
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#38bdf8', marginTop: '4px' }}>
                    {BUSINESSES.length} Listed
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                    Dedicated showcase pages
                  </div>
                </div>

                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
                    Participating Chapters
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#c084fc', marginTop: '4px' }}>
                    4 LOs Active
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                    184 Registered Jaycees
                  </div>
                </div>
              </div>

              {/* 4 LOs Breakdown Table */}
              <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
                  Tirupati Local Organizations Status Breakdown
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {TIRUPATI_CHAPTERS.map(ch => (
                    <div key={ch.id} style={{ background: '#0b1322', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '800', color: ch.isHost ? '#f59e0b' : '#38bdf8', fontSize: '0.95rem' }}>
                          {ch.name}
                        </span>
                        {ch.isHost && (
                          <span style={{ fontSize: '0.65rem', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: '900' }}>
                            HOST
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>
                        {ch.desc}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                        Status: <strong style={{ color: '#10b981' }}>Active & Connected</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBER APPROVALS QUEUE */}
          {activeTab === 'approvals' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
                    Jaycee Registration Approvals
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    Review credential submissions from all 4 Tirupati chapters before activating on the public directory.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <select 
                    value={selectedChapterFilter}
                    onChange={(e) => setSelectedChapterFilter(e.target.value)}
                    style={{ background: '#111a2e', border: '1px solid #1e293b', color: '#ffffff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="All">All 4 Chapters</option>
                    {TIRUPATI_CHAPTERS.map(ch => (
                      <option key={ch.id} value={ch.name}>{ch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {pendingList.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {pendingList.map(app => (
                    <div key={app.id} style={{
                      background: '#111a2e',
                      border: '1px solid #1e293b',
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>
                            {app.fullName}
                          </h4>
                          <span style={{ background: '#0284c7', color: 'white', fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '6px' }}>
                            {app.chapter}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                          JCI ID: <strong>{app.membershipId}</strong> • Role: <strong>{app.designation}</strong> • Phone: <strong>{app.phone}</strong>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#f59e0b', marginTop: '2px' }}>
                          Business: <strong>{app.businessName}</strong> ({app.businessCategory})
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => handleReject(app)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid #ef4444',
                            color: '#f87171',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>

                        <button 
                          onClick={() => handleApprove(app)}
                          style={{
                            background: '#10b981',
                            border: 'none',
                            color: '#022c22',
                            padding: '8px 18px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Check size={16} />
                          <span>Approve & Activate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#111a2e', border: '1px dashed #334155', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <ShieldCheck size={44} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '4px' }}>No Pending Applications</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>All Jaycees have been reviewed and approved.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BUSINESS SHOWCASE & SCHEDULE */}
          {activeTab === 'businesses' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
                  Business Directory & Daily Showcase Scheduler
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  Schedule the "Business of the Day" rotation and moderate member enterprise listings.
                </p>
              </div>

              {/* Showcase Schedule Strip */}
              <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f59e0b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} />
                  <span>Upcoming "Business of the Day" Rotation Schedule</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {scheduleList.map((item, idx) => (
                    <div key={idx} style={{
                      background: item.status === 'ACTIVE_TODAY' ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)' : '#0b1322',
                      border: item.status === 'ACTIVE_TODAY' ? '1px solid #f59e0b' : '1px solid #1e293b',
                      borderRadius: '12px',
                      padding: '14px'
                    }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: '800', color: item.status === 'ACTIVE_TODAY' ? '#f59e0b' : '#94a3b8', textTransform: 'uppercase' }}>
                        {item.date} {item.status === 'ACTIVE_TODAY' && '• LIVE NOW'}
                      </div>
                      <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#ffffff', marginTop: '4px' }}>
                        {item.businessName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                        {item.chapter}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Listings Table */}
              <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
                  All Verified Jaycee Enterprises ({BUSINESSES.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {BUSINESSES.map(biz => (
                    <div key={biz.id} style={{
                      background: '#0b1322',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={biz.logo} alt={biz.name} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '0.98rem' }}>{biz.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                            {biz.ownerName} • <strong>{biz.chapter}</strong> • {biz.category}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => handleSetBusinessOfTheDay(biz)}
                          style={{
                            background: '#f59e0b',
                            color: '#1a0e00',
                            fontWeight: '800',
                            fontSize: '0.78rem',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Feature as Business of the Day
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONNECT & TRADE TRACKER AUDIT */}
          {activeTab === 'connects' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
                  B2B Trade & Referral Audit Pipeline
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  Verified logs of inter-chapter referrals and closed deal amounts across 4 Tirupati LOs.
                </p>
              </div>

              <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {connectFeed.map(feed => (
                    <div key={feed.id} style={{
                      background: '#0b1322',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '0.95rem' }}>
                          {feed.fromMember} ({feed.fromChapter}) ➔ {feed.toMember} ({feed.toChapter})
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                          Project: {feed.category} • Logged {feed.timeAgo}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '900', color: '#10b981', fontSize: '1.1rem' }}>
                          {feed.valueINR}
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#059669', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '99px', fontWeight: '800' }}>
                          {feed.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EVENTS & ATTENDEES */}
          {activeTab === 'events' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
                    Programs, Expos & Attendance Control
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    Publish new chapter conclaves, monitor registrations, and manage QR passes.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {UPCOMING_EVENTS.map(ev => (
                  <div key={ev.id} style={{
                    background: '#111a2e',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={ev.image} alt={ev.title} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '1.05rem' }}>{ev.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          {ev.date} • {ev.time} • {ev.venue}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                        {ev.spotsLeft} Seats Left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CELEBRATIONS */}
          {activeTab === 'celebrations' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
                  Member Milestone & Celebration Registry
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  Automated daily Birthdays and Wedding Anniversaries across 4 Tirupati chapters.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#d946ef', marginBottom: '14px' }}>
                    Birthdays Today ({CELEBRATIONS.birthdaysToday.length})
                  </h3>
                  {CELEBRATIONS.birthdaysToday.map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0b1322', padding: '12px', borderRadius: '10px', marginBottom: '8px' }}>
                      <img src={b.avatar} alt={b.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: '#ffffff' }}>{b.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.role} • {b.chapter}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#111a2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f43f5e', marginBottom: '14px' }}>
                    Wedding Anniversaries Today ({CELEBRATIONS.anniversariesToday.length})
                  </h3>
                  {CELEBRATIONS.anniversariesToday.map(a => (
                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0b1322', padding: '12px', borderRadius: '10px', marginBottom: '8px' }}>
                      <img src={a.avatar} alt={a.names} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: '#ffffff' }}>{a.names}</div>
                        <div style={{ fontSize: '0.75rem', color: '#f43f5e' }}>{a.years} • {a.chapter}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .admin-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          color: #94a3b8;
          font-size: 0.88rem;
          font-weight: 600;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .admin-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .admin-nav-btn.active {
          background: #0284c7;
          color: #ffffff;
          font-weight: 700;
        }
        .admin-pill-badge {
          margin-left: auto;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 900;
          padding: 2px 7px;
          borderRadius: 99px;
        }
      `}</style>
    </div>
  );
}
