import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  UserCheck, 
  Menu, 
  X, 
  TrendingUp, 
  Calendar, 
  Cake, 
  Phone, 
  Award, 
  LogIn, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  User,
  ArrowUpRight
} from 'lucide-react';
import JciLogo from './JciLogo';

export default function Navbar({ 
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenRegister, 
  onOpenJayceePortal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, backdropFilter: 'blur(16px)' }}>
      {/* =========================================================================
          ROW 1: CREATIVE IMPACT & UTILITY TICKER STRIP
         ========================================================================= */}
      <div style={{
        background: 'linear-gradient(90deg, #003761 0%, #005696 50%, #0284c7 100%)',
        color: '#ffffff',
        fontSize: '0.8rem',
        fontWeight: '600',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {/* Organization Tag with Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.25)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              padding: '2px 6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Award size={12} color="#fbbf24" />
              <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#fef3c7' }}>ZONE IV</span>
            </div>
            <span style={{ color: '#e0f2fe', letterSpacing: '0.01em' }}>
              JCI India | <strong>JCI Tirupati Innovations</strong>
            </span>
          </div>

          {/* Right Live Metrics with Pulsing Dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="top-bar-right">
            {/* Live B2B Commerce Pulse */}
            <a 
              href="#connect-tracker" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fef08a',
                textDecoration: 'none',
                background: 'rgba(0, 0, 0, 0.15)',
                padding: '2px 10px',
                borderRadius: '12px',
                border: '1px solid rgba(254, 240, 138, 0.25)'
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                display: 'inline-block'
              }} />
              <span style={{ fontWeight: '700' }}>₹1.18+ Cr</span>
              <span style={{ color: '#bae6fd', fontSize: '0.74rem' }}>B2B Trade</span>
            </a>

            {/* Celebrations */}
            <a 
              href="#highlights" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#fbcfe8',
                textDecoration: 'none'
              }}
            >
              <Cake size={13} color="#f472b6" />
              <span>Today's Milestones</span>
            </a>

            {/* Helpline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1' }}>
              <Phone size={12} />
              <span>+91 98490 12345</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: CREATIVE FROSTED GLASS NAVIGATION BAR
         ========================================================================= */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.94)',
        borderBottom: '1px solid #e2e8f0',
        height: '78px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Logo with Creative Hover Glow */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} title="JCI Tirupati Innovations">
            <JciLogo height={50} />
          </a>

          {/* Creative Centered Nav Links with Hover Pills */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '6px' }} className="main-nav-links">
            <a href="#highlights" className="nav-pill-link">
              Daily Spotlight
            </a>
            <a href="#directory" className="nav-pill-link">
              Business Directory
            </a>
            <a href="#connect-tracker" className="nav-pill-link" style={{ color: '#d97706', fontWeight: '700' }}>
              <TrendingUp size={15} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
              Connect Tracker
            </a>
            <a href="#pillars" className="nav-pill-link">
              10 Pillars
            </a>
            <a href="#events" className="nav-pill-link">
              Events
            </a>
            <a href="#partners" className="nav-pill-link">
              Partner Perks
            </a>
          </nav>

          {/* Right: Clean & Creative Action Hub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentUser ? (
              /* LOGGED IN: Modern User Pill & Dashboard Access */
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={onOpenJayceePortal}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #0284c7',
                    borderRadius: '12px',
                    padding: '6px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)',
                    transition: 'all 0.2s'
                  }}
                  title="Open Your Jaycee Dashboard"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #005696'
                    }}
                  />
                  <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>
                      {currentUser.fullName.split(' ')[1] || currentUser.fullName}
                    </div>
                    <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#005696', textTransform: 'uppercase' }}>
                      {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'president' ? 'President' : currentUser.role === 'officer' ? 'Officer' : 'Member'}
                    </div>
                  </div>
                  <ChevronRight size={15} color="#0284c7" />
                </button>

                <button
                  onClick={onLogout}
                  style={{
                    background: '#f8fafc',
                    color: '#dc2626',
                    border: '1px solid #fee2e2',
                    padding: '9px 11px',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  title="Sign out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              /* NOT LOGGED IN: Sleek Creative Sign In & Register Buttons */
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Creative Member Sign In Button */}
                <button
                  onClick={onOpenAuth}
                  style={{
                    background: '#ffffff',
                    color: '#005696',
                    border: '1.5px solid #005696',
                    padding: '9px 18px',
                    borderRadius: '24px',
                    fontSize: '0.84rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0, 86, 150, 0.08)',
                    transition: 'all 0.2s'
                  }}
                >
                  <LogIn size={15} color="#005696" />
                  <span>Member Login</span>
                </button>

                {/* Creative High-Conversion Register Button with Shimmer */}
                <button
                  onClick={onOpenRegister}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#1a0e00',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Sparkles size={15} />
                  <span>Join Jaycees</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: '#0f172a', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
              className="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE SLIDE-DOWN DRAWER
         ========================================================================= */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '2px solid #005696',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <a onClick={() => setMobileMenuOpen(false)} href="#highlights" style={{ color: '#0f172a', fontSize: '0.96rem', fontWeight: '600', textDecoration: 'none' }}>Daily Spotlight</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#directory" style={{ color: '#0f172a', fontSize: '0.96rem', fontWeight: '600', textDecoration: 'none' }}>Business Directory</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#connect-tracker" style={{ color: '#d97706', fontSize: '0.96rem', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} /> Connect Tracker (₹ Deals)
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#pillars" style={{ color: '#0f172a', fontSize: '0.96rem', fontWeight: '600', textDecoration: 'none' }}>10 Pillars</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#events" style={{ color: '#0f172a', fontSize: '0.96rem', fontWeight: '600', textDecoration: 'none' }}>Events</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#partners" style={{ color: '#0f172a', fontSize: '0.96rem', fontWeight: '600', textDecoration: 'none' }}>Partner Perks</a>

          {/* Auth Action in Mobile Drawer */}
          <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenJayceePortal(); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #005696, #0284c7)',
                  color: '#ffffff',
                  fontWeight: '700',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <span>Go to My Dashboard ({currentUser.roleTitle.split('-')[0]})</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1.5px solid #005696',
                    background: '#ffffff',
                    color: '#005696',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Member Login
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#1a0e00',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Join Jaycees
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modern Pill Hover Styles */}
      <style>{`
        .nav-pill-link {
          font-size: 0.86rem;
          font-weight: 600;
          color: #334155;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        .nav-pill-link:hover {
          color: #005696;
          background: rgba(0, 86, 150, 0.06);
        }
        @media (max-width: 900px) {
          .top-bar-right { display: none !important; }
        }
        @media (min-width: 1024px) {
          .main-nav-links { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
