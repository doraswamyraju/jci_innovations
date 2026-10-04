import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { TIRUPATI_CHAPTERS } from '../data/mockData';

export default function Footer({ onOpenRegister }) {
  return (
    <footer style={{
      background: '#071022',
      color: '#cbd5e1',
      borderTop: '1px solid #1e293b',
      paddingTop: '70px',
      paddingBottom: '30px'
    }}>
      <div className="container">
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: About LO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #005696 0%, #f59e0b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: '1.1rem'
              }}>
                JCI
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                JCI Tirupati Innovations
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '18px' }}>
              Pioneering young leaders, high-impact community programs, and B2B trade facilitation for Jaycees across the holy city of Tirupati.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: '600' }}>
              Affiliated with JCI India • Zone IV
            </div>
          </div>

          {/* Col 2: Tirupati Chapters */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Participating Tirupati Chapters
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              {TIRUPATI_CHAPTERS.map(ch => (
                <div key={ch.id} style={{ color: ch.isHost ? '#38bdf8' : '#94a3b8', fontWeight: ch.isHost ? '700' : '400' }}>
                  • {ch.name}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Key Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#highlights" style={{ color: '#cbd5e1' }}>Business of the Day</a>
              <a href="#directory" style={{ color: '#cbd5e1' }}>Jaycee Business Directory</a>
              <a href="#connect-tracker" style={{ color: '#cbd5e1' }}>B2B Connect Tracker (₹ Deals)</a>
              <a href="#events" style={{ color: '#cbd5e1' }}>Conclaves & Sports Events</a>
              <a href="#partners" style={{ color: '#cbd5e1' }}>Tirupati Partner Perks</a>
              <button 
                onClick={onOpenRegister}
                style={{ textAlign: 'left', color: '#f59e0b', fontWeight: '700', cursor: 'pointer' }}
              >
                + Register as Tirupati Jaycee
              </button>
            </div>
          </div>

          {/* Col 4: Secretariat Contact */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
              Secretariat & Chapter Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>JCI Innovations Secretariat, Air Bypass Road, Tirupati, AP - 517501</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#38bdf8" />
                <span>+91 98490 12345 / +91 94400 56789</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#38bdf8" />
                <span>connect@jcitirupatiinnovations.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © 2026-2027 JCI Tirupati Innovations. All Rights Reserved. Built with pride for Tirupati Jaycees.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#94a3b8' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94a3b8' }}>Code of Ethics</a>
            <a href="#" style={{ color: '#94a3b8' }}>Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
