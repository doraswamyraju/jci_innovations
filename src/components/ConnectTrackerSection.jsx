import React from 'react';
import { 
  TrendingUp, 
  Coins, 
  Handshake, 
  CheckCircle2, 
  Building, 
  ArrowRight, 
  ShieldCheck, 
  PlusCircle, 
  Sparkles 
} from 'lucide-react';
import { LIVE_CONNECT_STATS, RECENT_CONNECT_FEED } from '../data/mockData';

export default function ConnectTrackerSection({ onOpenLogConnect }) {
  return (
    <section id="connect-tracker" className="section-padding" style={{
      background: 'linear-gradient(180deg, #090e17 0%, #0d1b33 100%)',
      color: 'white',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag badge-gold">
            <Coins size={14} />
            <span>Jaycee B2B Commerce Exchange</span>
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            Tirupati Jaycees Business Connect & Value Tracker
          </h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Tracking real economic impact: transparently logging qualified connects, mutual referrals, and verified closed deal values across all Tirupati JCI chapters.
          </p>
        </div>

        {/* Top 3 Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Card 1: Value */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Verified Closed Value
              </span>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                <Coins size={22} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              ₹ 1,18,45,000
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              + ₹ 14.5 Lakhs closed in current quarter
            </div>
          </div>

          {/* Card 2: Connects Passed */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(3, 105, 161, 0.05) 100%)',
            border: '1px solid rgba(2, 132, 199, 0.35)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Qualified Referrals Passed
              </span>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <Handshake size={22} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {LIVE_CONNECT_STATS.totalConnectsPassed} Leads
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              {LIVE_CONNECT_STATS.dealsClosed} deals successfully converted (64% Win Rate)
            </div>
          </div>

          {/* Card 3: Participating Chapters */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                City-Wide Ecosystem
              </span>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                <Building size={22} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {LIVE_CONNECT_STATS.participatingChapters} Chapters
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              {LIVE_CONNECT_STATS.activeJayceesRegistered} registered Jaycees trading together
            </div>
          </div>
        </div>

        {/* Live Deal Activity Feed & Action Trigger */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '30px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} color="#f59e0b" />
                Recent Verified B2B Deals & Connects
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Inter-chapter referrals verified and acknowledged by members
              </p>
            </div>

            <button 
              onClick={onOpenLogConnect}
              className="btn btn-gold btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <PlusCircle size={16} />
              <span>Pass a Connect / Log Closed Deal</span>
            </button>
          </div>

          {/* Feed List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {RECENT_CONNECT_FEED.map((feed) => (
              <div key={feed.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '18px 24px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0284c7 0%, #005696 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Handshake size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.98rem' }}>
                        {feed.fromMember} ({feed.fromChapter})
                      </span>
                      <ArrowRight size={14} color="#f59e0b" />
                      <span style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.98rem' }}>
                        {feed.toMember} ({feed.toChapter})
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                      Deal: <strong>{feed.category}</strong> • <span style={{ color: '#64748b' }}>{feed.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10b981' }}>
                      {feed.valueINR}
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      color: '#059669',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '99px'
                    }}>
                      <CheckCircle2 size={12} />
                      CLOSED DEAL
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
