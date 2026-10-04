import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  HeartHandshake, 
  Award 
} from 'lucide-react';
import { LIVE_CONNECT_STATS, TIRUPATI_CHAPTERS } from '../data/mockData';

export default function Hero({ onOpenRegister, onOpenLogConnect, onSelectBusiness, businessOfTheDay }) {
  return (
    <section style={{
      position: 'relative',
      background: 'radial-gradient(ellipse at top, #0f2b5c 0%, #08162f 50%, #040a17 100%)',
      color: 'white',
      paddingTop: '60px',
      paddingBottom: '70px',
      overflow: 'hidden'
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '5%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.28) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '0%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main 2-Column Hero Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '50px'
        }} className="hero-main-grid">
          
          {/* Left Column: Vision & Calls to Action */}
          <div>
            {/* Top Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '99px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              marginBottom: '22px',
              fontSize: '0.85rem'
            }}>
              <span style={{
                background: '#f59e0b',
                color: '#000',
                fontSize: '0.72rem',
                fontWeight: '900',
                padding: '2px 8px',
                borderRadius: '99px'
              }}>
                4th LO IN TIRUPATI
              </span>
              <span style={{ color: '#e2e8f0', fontWeight: '600' }}>
                Unifying All 4 Jaycee Chapters
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.7rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-0.025em',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Uniting Tirupati Jaycees. <br />
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 40%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Accelerating Local Trade & Community Impact.
              </span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              lineHeight: '1.7',
              marginBottom: '32px',
              maxWidth: '620px'
            }}>
              The digital gateway built by <strong>JCI Tirupati Innovations</strong> connecting members across all 4 Local Organizations in Tirupati. Showcase your enterprise, generate high-trust referrals, and celebrate collective achievements.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px' }}>
              <a href="#directory" className="btn btn-primary" style={{ padding: '14px 26px', fontSize: '0.98rem' }}>
                <Building2 size={18} />
                <span>Explore Jaycee Businesses</span>
              </a>

              <button 
                onClick={onOpenRegister}
                className="btn btn-gold"
                style={{ padding: '14px 26px', fontSize: '0.98rem' }}
              >
                <Users size={18} />
                <span>Register as Tirupati Jaycee</span>
              </button>

              <button 
                onClick={onOpenLogConnect}
                className="btn btn-outline-white"
                style={{ padding: '14px 22px', fontSize: '0.92rem' }}
              >
                <TrendingUp size={16} color="#f59e0b" />
                <span>Pass Connect / Log Deal</span>
              </button>
            </div>

            {/* 4 LOs Badges Strip */}
            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: '700' }}>
                Participating Local Organizations (4 LOs in Tirupati):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TIRUPATI_CHAPTERS.map(ch => (
                  <span key={ch.id} style={{
                    background: ch.isHost ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: ch.isHost ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: ch.isHost ? '#fde68a' : '#e2e8f0',
                    fontSize: '0.8rem',
                    fontWeight: ch.isHost ? '800' : '600',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {ch.isHost && <Award size={13} color="#f59e0b" />}
                    {ch.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Ecosystem Interactive Card */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '24px',
            padding: '28px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
          }}>
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Coins size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>
                    Live Economic Impact
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ffffff' }}>
                    ₹ 1.18+ Crore
                  </div>
                </div>
              </div>

              <span style={{
                background: '#10b981',
                color: '#022c22',
                fontSize: '0.7rem',
                fontWeight: '900',
                padding: '4px 10px',
                borderRadius: '99px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={12} />
                VERIFIED
              </span>
            </div>

            {/* Quick Stats 2x2 Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px',
                borderRadius: '14px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Connects Passed</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#38bdf8', marginTop: '2px' }}>
                  {LIVE_CONNECT_STATS.totalConnectsPassed}+
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Across 4 LOs</div>
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px',
                borderRadius: '14px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Listed Businesses</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#34d399', marginTop: '2px' }}>
                  {LIVE_CONNECT_STATS.approvedBusinesses}+
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Verified Enterprises</div>
              </div>
            </div>

            {/* Spotlight Showcase Preview inside Hero Card */}
            {businessOfTheDay && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.06) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} />
                    Today's Business Spotlight
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {businessOfTheDay.chapter}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={businessOfTheDay.logo} 
                    alt={businessOfTheDay.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '0.98rem', color: '#ffffff' }}>
                      {businessOfTheDay.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {businessOfTheDay.ownerName}
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectBusiness(businessOfTheDay)}
                    className="btn btn-gold btn-sm"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    View Page
                  </button>
                </div>
              </div>
            )}

            {/* Quick Action Link */}
            <div style={{ textAlign: 'center' }}>
              <a 
                href="#connect-tracker" 
                style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View Full B2B Trade & Referral Pipeline</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
