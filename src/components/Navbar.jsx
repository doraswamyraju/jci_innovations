import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  UserCheck, 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Cake, 
  Phone, 
  Award, 
  LayoutDashboard, 
  ChevronDown 
} from 'lucide-react';
import JciLogo from './JciLogo';

export default function Navbar({ onOpenRegister, onOpenAdminQueue, onOpenFullAdmin, pendingCount = 2 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      {/* ROW 1: TOP JCI UTILITY & IMPACT STRIP */}
      <div style={{
        background: 'linear-gradient(90deg, #004578 0%, #005696 50%, #0284c7 100%)',
        color: '#ffffff',
        fontSize: '0.8rem',
        fontWeight: '600',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Left: 4 LOs Ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#f59e0b',
              color: '#1a0e00',
              fontSize: '0.68rem',
              fontWeight: '900',
              padding: '1px 6px',
              borderRadius: '4px'
            }}>
              4 LOs
            </span>
            <span style={{ color: '#e0f2fe' }}>
              <strong>Tirupati Jaycees:</strong> Innovations (Host) • Tirupati • Odyssey • Power
            </span>
          </div>

          {/* Right: Connect Stats, Celebrations & Helpline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="top-bar-right">
            <a href="#connect-tracker" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fde68a' }}>
              <TrendingUp size={14} color="#f59e0b" />
              <span>₹1.18+ Cr B2B Trade</span>
            </a>

            <a href="#highlights" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbcfe8' }}>
              <Cake size={14} color="#f472b6" />
              <span>Celebrations Today</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1' }}>
              <Phone size={13} />
              <span>+91 98490 12345</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: MAIN WHITE NAVIGATION BAR */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        height: '78px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Official JCI Tirupati Innovations Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center' }} title="JCI Tirupati Innovations">
            <JciLogo height={48} />
          </a>

          {/* Center Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '26px' }} className="main-nav-links">
            <a href="#highlights" className="nav-link-item">
              Daily Spotlight
            </a>
            <a href="#directory" className="nav-link-item">
              Business Directory
            </a>
            <a href="#connect-tracker" className="nav-link-item" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: '700' }}>
              <TrendingUp size={16} />
              <span>Connect Tracker</span>
            </a>
            <a href="#pillars" className="nav-link-item">
              10 Pillars
            </a>
            <a href="#events" className="nav-link-item">
              Events
            </a>
            <a href="#partners" className="nav-link-item">
              Partner Perks
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Admin Command Center */}
            <button
              onClick={onOpenFullAdmin}
              style={{
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)'
              }}
              title="Open Admin Command Center"
            >
              <LayoutDashboard size={16} color="#38bdf8" />
              <span>Admin Panel</span>
              {pendingCount > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: '900',
                  padding: '2px 6px',
                  borderRadius: '99px'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Register as Jaycee Button */}
            <button
              onClick={onOpenRegister}
              className="btn btn-gold"
              style={{
                padding: '10px 18px',
                fontSize: '0.88rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <UserCheck size={16} />
              <span>Register as Jaycee</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: '#0f172a', padding: '6px', display: 'block' }}
              className="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '2px solid #005696',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <a onClick={() => setMobileMenuOpen(false)} href="#highlights" style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>Daily Spotlight</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#directory" style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>Business Directory</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#connect-tracker" style={{ color: '#d97706', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> Connect Tracker (₹ Deals)
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#pillars" style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>10 Pillars</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#events" style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>Events</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#partners" style={{ color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>Partner Perks</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenFullAdmin(); }}
            style={{
              marginTop: '6px',
              padding: '12px',
              borderRadius: '8px',
              background: '#0f172a',
              color: 'white',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LayoutDashboard size={18} color="#38bdf8" />
            <span>Open Admin Panel ({pendingCount} pending)</span>
          </button>
        </div>
      )}

      <style>{`
        .nav-link-item {
          font-size: 0.92rem;
          font-weight: 600;
          color: #334155;
          transition: all 0.2s ease;
        }
        .nav-link-item:hover {
          color: #005696;
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
