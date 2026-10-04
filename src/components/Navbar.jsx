import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  UserCheck, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Gift 
} from 'lucide-react';

export default function Navbar({ onOpenRegister, onOpenAdminQueue, pendingCount = 2 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(11, 31, 68, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Logo & Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #005696 0%, #0284c7 50%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '900',
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
          }}>
            JCI
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              JCI Tirupati Innovations
              <span style={{
                background: '#f59e0b',
                color: '#000',
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '800'
              }}>2027</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Tirupati Jaycees Unified Business & Community Portal
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '28px', '@media (min-width: 1024px)': { display: 'flex' } }} className="desktop-links">
          <a href="#highlights" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1', transition: 'color 0.2s' }}>
            Daily Showcase
          </a>
          <a href="#directory" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1' }}>
            Jaycee Businesses
          </a>
          <a href="#connect-tracker" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={15} color="#f59e0b" />
            Connect Tracker
          </a>
          <a href="#pillars" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1' }}>
            10 Pillars
          </a>
          <a href="#events" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1' }}>
            Events
          </a>
          <a href="#partners" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#cbd5e1' }}>
            Partner Perks
          </a>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Admin Queue Button */}
          <button 
            onClick={onOpenAdminQueue}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#e2e8f0',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Admin Verification Queue"
          >
            <ShieldCheck size={16} color="#38bdf8" />
            <span>Admin Queue</span>
            {pendingCount > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '99px'
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

          {/* Mobile Toggle */}
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
          background: '#0b1f44',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a onClick={() => setMobileMenuOpen(false)} href="#highlights" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Daily Showcase</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#directory" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Jaycee Businesses</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#connect-tracker" style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> Connect Tracker (₹ Deals)
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#pillars" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>10 Pillars</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#events" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Events</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#partners" style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>Partner Perks</a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-links { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
