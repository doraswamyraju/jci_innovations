import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  Flame, 
  GraduationCap, 
  Globe, 
  Laptop, 
  Trees, 
  Smile, 
  ArrowRight 
} from 'lucide-react';
import { PILLARS } from '../data/mockData';

const iconMap = {
  Briefcase,
  Sparkles,
  Award,
  HeartHandshake,
  Flame,
  GraduationCap,
  Globe,
  Laptop
};

export default function PillarsSection() {
  const [activePillar, setActivePillar] = useState(PILLARS[0]);

  return (
    <section id="pillars" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Award size={14} />
            <span>Strategic Focus Areas</span>
          </div>
          <h2 className="section-title">The 10 Organizational Pillars</h2>
          <p className="section-subtitle">
            JCI Tirupati Innovations structures all youth programs, B2B initiatives, community welfare, and leadership camps around 10 transformative pillars.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {PILLARS.map((pillar) => {
            const IconComponent = iconMap[pillar.icon] || Award;
            const isSelected = activePillar.id === pillar.id;

            return (
              <div 
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #005696' : '1px solid #e2e8f0',
                  background: isSelected ? 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)' : '#ffffff',
                  boxShadow: isSelected ? '0 10px 25px -5px rgba(0, 86, 150, 0.15)' : 'none',
                  transform: isSelected ? 'translateY(-4px)' : 'none'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: isSelected ? '#005696' : 'rgba(0, 86, 150, 0.08)',
                  color: isSelected ? '#ffffff' : '#005696',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  transition: 'all 0.2s'
                }}>
                  <IconComponent size={22} />
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0b1f44', marginBottom: '6px' }}>
                  {pillar.title}
                </h3>

                <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: '700', marginBottom: '8px' }}>
                  {pillar.stats}
                </div>

                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                  {pillar.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pillar Highlight Box */}
        <div style={{
          background: 'linear-gradient(135deg, #0b1f44 0%, #005696 100%)',
          color: 'white',
          borderRadius: '24px',
          padding: '36px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Spotlight Pillar: {activePillar.title}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
              {activePillar.tagline}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {activePillar.description}
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '20px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Impact Recorded</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#f59e0b' }}>{activePillar.stats}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
