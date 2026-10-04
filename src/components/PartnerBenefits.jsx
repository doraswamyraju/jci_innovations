import React from 'react';
import { 
  Gift, 
  BadgePercent, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { PARTNER_BENEFITS } from '../data/mockData';

export default function PartnerBenefits() {
  return (
    <section id="partners" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag badge-gold">
            <Gift size={14} />
            <span>Exclusive Jaycee Privileges</span>
          </div>
          <h2 className="section-title">Tirupati Merchant Partner Perks</h2>
          <p className="section-subtitle">
            Special discounts, priority bookings, and medical checkups negotiated exclusively for registered Jaycees and their families across Tirupati.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid-3">
          {PARTNER_BENEFITS.map((partner) => (
            <div 
              key={partner.id}
              className="glass-card"
              style={{
                padding: '26px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #ffffff 0%, #fcfbf7 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    objectFit: 'cover',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0b1f44' }}>
                    {partner.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                    {partner.category}
                  </span>
                </div>
              </div>

              {/* Offer Callout */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                border: '1px dashed #d97706',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <BadgePercent size={22} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#78350f' }}>
                  {partner.offer}
                </div>
              </div>

              {/* Terms */}
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: '1.5', marginBottom: '16px' }}>
                {partner.terms}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} />
                  <span>Valid till {partner.validTill}</span>
                </div>

                <span style={{
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '99px'
                }}>
                  ACTIVE PERK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
