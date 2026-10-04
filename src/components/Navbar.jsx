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
  Layers, 
  LayoutDashboard 
} from 'lucide-react';

export default function Navbar({ onOpenRegister, onOpenAdminQueue, onOpenFullAdmin, pendingCount = 2 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(8, 21, 48, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Logo & Brand Identity */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #005696 0%, #0284c7 50%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '900',
            fontSize: '1.3rem',
            boxShadow: '0 4px 16px rgba(2, 132, 199, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            JCI
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.01em' }}>
                JCI Tirupati Innovations
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#1a0e00',
                fontSize: '0.65rem',
                padding: '2px 7px',
                borderRadius: '99px',
                fontWeight: '900',
                letterSpacing: '0.04em'
              }}>
                4th LO
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px' }}>
              <span>Tirupati Jaycees Unified Business & Community Portal</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '24px' }} className="desktop-nav">
          <a href="#highlights" className="nav-item">
            Daily Spotlight
          </a>
          <a href="#directory" className="nav-item">
            Business Directory
          </a>
          <a href="#connect-tracker" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b' }}>
            <TrendingUp size={15} />
            <span>Connect Tracker</span>
          </a>
          <a href="#pillars" className="nav-item">
            10 Pillars
          </a>
          <a href="#events" className="nav-item">
            Events
          </a>
          <a href="#partners" className="nav-item">
            Partner Perks
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Admin Command Center Trigger */}
          <button 
            onClick={onOpenFullAdmin}
            style={{
              background: 'rgba(2, 132, 199, 0.15)',
              border: '1px solid rgba(2, 132, 199, 0.4)',
              color: '#38bdf8',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            title="Open Admin Control Center"
          >
            <LayoutDashboard size={16} />
            <span>Admin Panel</span>
            {pendingCount > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: '900',
                padding: '2px 6px',
                borderRadius: '99px',
                marginLeft: '2px'
              }}>
                {pendingCount}
              </span>
            )}
          </button>

          {/* All Jaycees Register Button */}
          <button 
            onClick={onOpenRegister}
            className="btn btn-gold btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <UserCheck size={16} />
            <span>Register as Jaycee</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'white', padding: '6px', display: 'block' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: '#07152e',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <a onClick={() => setMobileMenuOpen(false)} href="#highlights" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Daily Spotlight</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#directory" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Business Directory</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#connect-tracker" style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> Connect Tracker (₹ Deals)
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#pillars" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>10 Pillars</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#events" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Events</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#partners" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Partner Perks</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenFullAdmin(); }}
            style={{
              marginTop: '8px',
              padding: '10px',
              borderRadius: '8px',
              background: '#0284c7',
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LayoutDashboard size={18} />
            <span>Open Admin Command Center</span>
          </button>
        </div>
      )}

      <style>{`
        .nav-item {
          font-size: 0.9rem;
          font-weight: 600;
          color: #cbd5e1;
          transition: all 0.2s ease;
        }
        .nav-item:hover {
          color: #38bdf8;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
