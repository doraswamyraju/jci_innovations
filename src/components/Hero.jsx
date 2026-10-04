import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Coins 
} from 'lucide-react';
import { LIVE_CONNECT_STATS } from '../data/mockData';

export default function Hero({ onOpenRegister, onOpenLogConnect }) {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #0b1f44 0%, #0d285a 45%, #07152e 100%)',
      color: 'white',
      paddingTop: '60px',
      paddingBottom: '80px',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Glow Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Top Pill Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '99px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            marginBottom: '24px',
            fontSize: '0.85rem',
            color: '#f8fafc'
          }}>
            <Sparkles size={16} color="#f59e0b" />
            <span style={{ fontWeight: '600' }}>Connecting All Jaycees Across Tirupati Chapters</span>
            <span style={{
              background: '#10b981',
              color: '#064e3b',
              fontSize: '0.68rem',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '99px'
            }}>OPEN TO ALL</span>
          </div>

          {/* Hero Heading */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            letterSpacing: '-0.025em',
            marginBottom: '20px',
            color: '#ffffff'
          }}>
            Empowering Jaycees, <br />
            <span style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 40%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Accelerating Tirupati's B2B Trade.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.15rem',
            color: '#cbd5e1',
            maxWidth: '720px',
            marginBottom: '36px',
            lineHeight: '1.7'
          }}>
            The official unified digital platform for <strong>JCI Tirupati Innovations</strong> & all fellow Jaycees in Tirupati. Showcase your enterprise with dedicated business pages, generate qualified connects, track closed deal values, and unlock partner benefits.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            marginBottom: '54px'
          }}>
            <a href="#directory" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
              <Building2 size={18} />
              <span>Explore Member Businesses</span>
            </a>

            <button 
              onClick={onOpenRegister}
              className="btn btn-gold" 
              style={{ fontSize: '1rem', padding: '14px 28px' }}
            >
              <Users size={18} />
              <span>Register as Tirupati Jaycee</span>
            </button>

            <button 
              onClick={onOpenLogConnect}
              className="btn btn-outline-white" 
              style={{ fontSize: '0.95rem', padding: '14px 24px' }}
            >
              <TrendingUp size={18} color="#f59e0b" />
              <span>Pass a Connect / Log Deal</span>
            </button>
          </div>

          {/* Live Impact Stats Strip */}
          <div style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '24px 30px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#f59e0b', marginBottom: '4px' }}>
                  <Coins size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Business Generated</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>
                  ₹ 1.18+ Cr
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Verified across Tirupati Chapters</div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#38bdf8', marginBottom: '4px' }}>
                  <TrendingUp size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connects Passed</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>
                  {LIVE_CONNECT_STATS.totalConnectsPassed}+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{LIVE_CONNECT_STATS.dealsClosed} deals closed successfully</div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', marginBottom: '4px' }}>
                  <Building2 size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member Businesses</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>
                  {LIVE_CONNECT_STATS.approvedBusinesses}+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Dedicated showcase profiles</div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#c084fc', marginBottom: '4px' }}>
                  <Users size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Jaycees</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>
                  {LIVE_CONNECT_STATS.activeJayceesRegistered}+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Across {LIVE_CONNECT_STATS.participatingChapters} Tirupati LOs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
