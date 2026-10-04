import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Cake, 
  Heart, 
  ExternalLink, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  BadgePercent 
} from 'lucide-react';
import { CELEBRATIONS, BUSINESSES } from '../data/mockData';

export default function DailyHighlights({ onSelectBusiness }) {
  const businessOfTheDay = BUSINESSES.find(b => b.isBusinessOfTheDay) || BUSINESSES[0];
  const [wishedIds, setWishedIds] = useState([]);

  const triggerConfetti = (id, name, type) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (!wishedIds.includes(id)) {
      setWishedIds(prev => [...prev, id]);
    }
    // Formulate a friendly WhatsApp greeting URL
    const message = encodeURIComponent(`Dear ${name}, wishing you a very Happy ${type}! May you be blessed with immense joy, prosperity and continued success. - Fellow Jaycee, JCI Tirupati Innovations`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <section id="highlights" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <div className="badge-tag badge-gold">
            <Sparkles size={14} />
            <span>Today's Daily Spotlight</span>
          </div>
          <h2 className="section-title">Daily Member & Business Highlights</h2>
          <p className="section-subtitle">
            Every day, the platform shines a spotlight on one Jaycee enterprise, along with celebrating our members' special milestones.
          </p>
        </div>

        {/* 3-Column / 2-Column Responsive Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Card 1: Business of the Day */}
          <div className="glass-card" style={{
            padding: '30px',
            borderRadius: '24px',
            border: '2px solid rgba(245, 158, 11, 0.35)',
            background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top Badge Strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#1a0e00',
                padding: '6px 14px',
                borderRadius: '99px',
                fontWeight: '800',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)'
              }}>
                <Sparkles size={14} />
                BUSINESS OF THE DAY
              </span>

              <div style={{
                fontSize: '0.8rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={14} />
                <span>Rotates every 24 hours</span>
              </div>
            </div>

            {/* Business Header */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <img 
                src={businessOfTheDay.logo} 
                alt={businessOfTheDay.name} 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0b1f44' }}>
                    {businessOfTheDay.name}
                  </h3>
                  <span style={{
                    color: '#0284c7',
                    background: 'rgba(2, 132, 199, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {businessOfTheDay.category}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px', fontWeight: '500' }}>
                  Owned by: <strong>{businessOfTheDay.ownerName}</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {businessOfTheDay.ownerDesignation} ({businessOfTheDay.chapter})
                </div>
              </div>
            </div>

            {/* Tagline & Description */}
            <p style={{
              fontSize: '0.98rem',
              color: '#334155',
              lineHeight: '1.6',
              marginBottom: '18px'
            }}>
              {businessOfTheDay.description}
            </p>

            {/* Exclusive Member Offer Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.06) 100%)',
              border: '1px dashed #d97706',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <BadgePercent size={24} color="#b45309" />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#b45309', textTransform: 'uppercase' }}>
                  Special Jaycee Privilege
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#78350f' }}>
                  {businessOfTheDay.memberOffer}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => onSelectBusiness(businessOfTheDay)}
                className="btn btn-primary"
                style={{ flex: '1 1 auto', minWidth: '180px' }}
              >
                <span>View Dedicated Showcase Page</span>
                <ArrowUpRight size={16} />
              </button>

              <a 
                href={`https://wa.me/${businessOfTheDay.whatsapp}?text=${encodeURIComponent(`Hi ${businessOfTheDay.ownerName}, I saw ${businessOfTheDay.name} on JCI Tirupati Innovations Portal. I'd like to connect!`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: '1 1 auto', minWidth: '150px' }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Connect</span>
              </a>

              <a 
                href={`tel:${businessOfTheDay.phone}`}
                className="btn btn-outline"
                style={{ padding: '12px 16px' }}
                title="Direct Phone Call"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Celebrations Column (Birthdays & Anniversaries) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Birthdays Card */}
            <div className="glass-card" style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)',
              border: '1px solid rgba(217, 70, 239, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(217, 70, 239, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c026d3'
                  }}>
                    <Cake size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0b1f44' }}>Birthdays Today</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Wish our beloved Jaycees</span>
                  </div>
                </div>
                <span className="badge-tag" style={{ background: 'rgba(217, 70, 239, 0.1)', color: '#a21caf', marginBottom: 0 }}>
                  {CELEBRATIONS.birthdaysToday.length} Celebrating
                </span>
              </div>

              {/* Members List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CELEBRATIONS.birthdaysToday.map((person) => (
                  <div key={person.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'white',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={person.avatar} 
                        alt={person.name} 
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0f172a' }}>{person.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{person.role} • {person.chapter}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerConfetti(person.id, person.name, 'Birthday')}
                      className="btn btn-sm"
                      style={{
                        background: wishedIds.includes(person.id) ? '#dcfce7' : 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
                        color: wishedIds.includes(person.id) ? '#166534' : 'white',
                        fontWeight: '700'
                      }}
                    >
                      {wishedIds.includes(person.id) ? '🎉 Wishes Sent!' : '🎉 Wish Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Wedding Anniversaries Card */}
            <div className="glass-card" style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
              border: '1px solid rgba(244, 63, 94, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(244, 63, 94, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e11d48'
                  }}>
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0b1f44' }}>Wedding Anniversaries</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Celebrating Jaycee Couples</span>
                  </div>
                </div>
                <span className="badge-tag" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#be123c', marginBottom: 0 }}>
                  {CELEBRATIONS.anniversariesToday.length} Couple
                </span>
              </div>

              {/* Anniversaries List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CELEBRATIONS.anniversariesToday.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'white',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={item.avatar} 
                        alt={item.names} 
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0f172a' }}>{item.names}</div>
                        <div style={{ fontSize: '0.75rem', color: '#e11d48', fontWeight: '600' }}>{item.years} ({item.chapter})</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerConfetti(item.id, item.names, 'Wedding Anniversary')}
                      className="btn btn-sm"
                      style={{
                        background: wishedIds.includes(item.id) ? '#dcfce7' : 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                        color: wishedIds.includes(item.id) ? '#166534' : 'white',
                        fontWeight: '700'
                      }}
                    >
                      {wishedIds.includes(item.id) ? '💖 Wishes Sent!' : '💖 Wish Couple'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
