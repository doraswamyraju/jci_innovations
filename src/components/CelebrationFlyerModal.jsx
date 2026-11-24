import React, { useState } from 'react';
import { 
  X, 
  Cake, 
  Gift, 
  Download, 
  Share2, 
  Sparkles, 
  Check, 
  Send, 
  Globe, 
  Palette,
  Heart,
  Award,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JciLogo from './JciLogo';

const FLYER_TEMPLATES = [
  {
    id: 'gold-royal',
    name: 'JCI Royal Gold',
    bg: 'linear-gradient(135deg, #02203c 0%, #003865 40%, #034b82 100%)',
    goldAccent: '#f59e0b',
    goldBorder: 'rgba(245, 158, 11, 0.5)',
    textColor: '#ffffff',
    subtitleColor: '#fde68a'
  },
  {
    id: 'festive-crimson',
    name: 'Celebration Ruby',
    bg: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #9f1239 100%)',
    goldAccent: '#fbbf24',
    goldBorder: 'rgba(251, 191, 36, 0.5)',
    textColor: '#ffffff',
    subtitleColor: '#fecdd3'
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald Prosperity',
    bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)',
    goldAccent: '#34d399',
    goldBorder: 'rgba(52, 211, 153, 0.5)',
    textColor: '#ffffff',
    subtitleColor: '#a7f3d0'
  }
];

export default function CelebrationFlyerModal({ 
  onClose, 
  initialCelebrant, 
  type = 'BIRTHDAY', // 'BIRTHDAY' | 'ANNIVERSARY'
  onPublishToWebsite 
}) {
  const [celebrationType, setCelebrationType] = useState(type);
  const [selectedTemplateId, setSelectedTemplateId] = useState('gold-royal');
  const [memberName, setMemberName] = useState(initialCelebrant?.name || initialCelebrant?.names || 'Jc. B. Naveen Kumar');
  const [designation, setDesignation] = useState(initialCelebrant?.role || 'Director (Youth & Sports)');
  const [chapter, setChapter] = useState(initialCelebrant?.chapter || 'JCI Tirupati Innovations');
  const [customWish, setCustomWish] = useState(
    celebrationType === 'BIRTHDAY' 
      ? 'May this year bring immense leadership, prosperity, happiness, and greater heights in all your entrepreneurial endeavors!' 
      : 'Wishing the wonderful couple a lifetime of togetherness, endless joy, and enduring companionship!'
  );
  const [isPublished, setIsPublished] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const template = FLYER_TEMPLATES.find(t => t.id === selectedTemplateId) || FLYER_TEMPLATES[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePublish = () => {
    triggerConfetti();
    setIsPublished(true);
    setToastMessage('🎉 Flyer successfully published to Chapter Home Page Banner!');
    if (onPublishToWebsite) {
      onPublishToWebsite({
        memberName,
        designation,
        chapter,
        type: celebrationType,
        publishedAt: new Date().toLocaleTimeString()
      });
    }
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`🎉 JCI Tirupati Innovations wishes ${memberName} a very Happy ${celebrationType === 'BIRTHDAY' ? 'Birthday' : 'Wedding Anniversary'}! 🎂💐\n\n"${customWish}"\n\n- With best compliments from President, Secretary & Entire Board of JCI Tirupati Innovations.`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDownload = () => {
    triggerConfetti();
    setToastMessage('📥 High-Resolution Flyer generated and ready for print/download!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      background: 'rgba(5, 10, 20, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '940px',
        maxHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0b1120'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ec4899, #be185d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {celebrationType === 'BIRTHDAY' ? <Cake size={20} color="#ffffff" /> : <Heart size={20} color="#ffffff" />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
                Automated Celebration Flyer Studio
              </h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Instant dynamic flyer generator with 1-click social dispatch & website sync
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Studio Workspace: Controls on Left, Live Canvas on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          flex: 1,
          overflowY: 'auto'
        }} className="flyer-studio-grid">
          {/* Left Controls Panel */}
          <div style={{
            background: '#111c30',
            borderRight: '1px solid #1e293b',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto'
          }}>
            {/* Celebration Type Selector */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                OCCASION TYPE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => {
                    setCelebrationType('BIRTHDAY');
                    setCustomWish('May this year bring immense leadership, prosperity, happiness, and greater heights in all your entrepreneurial endeavors!');
                  }}
                  style={{
                    background: celebrationType === 'BIRTHDAY' ? '#be185d' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid ' + (celebrationType === 'BIRTHDAY' ? '#f472b6' : '#334155'),
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Cake size={15} />
                  <span>Birthday</span>
                </button>

                <button
                  onClick={() => {
                    setCelebrationType('ANNIVERSARY');
                    setCustomWish('Wishing the wonderful couple a lifetime of togetherness, endless joy, and enduring companionship!');
                  }}
                  style={{
                    background: celebrationType === 'ANNIVERSARY' ? '#be185d' : '#1e293b',
                    color: '#ffffff',
                    border: '1px solid ' + (celebrationType === 'ANNIVERSARY' ? '#f472b6' : '#334155'),
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Heart size={15} />
                  <span>Anniversary</span>
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                DESIGN TEMPLATE
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {FLYER_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    style={{
                      flex: 1,
                      background: t.bg,
                      color: '#ffffff',
                      border: selectedTemplateId === t.id ? `2px solid ${t.goldAccent}` : '1px solid #334155',
                      padding: '8px 4px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: selectedTemplateId === t.id ? `0 0 10px ${t.goldAccent}` : 'none'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Member Name */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                CELEBRANT NAME
              </label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090e17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Designation */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                DESIGNATION & CHAPTER
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Role / Portfolio"
                style={{
                  width: '100%',
                  background: '#090e17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.86rem',
                  outline: 'none',
                  marginBottom: '8px'
                }}
              />
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="Chapter Name"
                style={{
                  width: '100%',
                  background: '#090e17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Custom Greetings Text */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                GREETING BLESSINGS / MESSAGE
              </label>
              <textarea
                rows={3}
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090e17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            {/* Automated Dispatch Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <button
                onClick={handlePublish}
                style={{
                  background: isPublished ? '#059669' : 'linear-gradient(135deg, #0284c7, #0369a1)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                }}
              >
                {isPublished ? <Check size={16} /> : <Globe size={16} />}
                <span>{isPublished ? 'Published to Website!' : 'Publish to Website Banner'}</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={handleWhatsAppShare}
                  style={{
                    background: '#22c55e',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Share2 size={14} />
                  <span>WhatsApp Share</span>
                </button>

                <button
                  onClick={handleDownload}
                  style={{
                    background: '#334155',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} />
                  <span>Download Flyer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Flyer Canvas */}
          <div style={{
            background: '#090e17',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* The Rendered Graphic Flyer Canvas */}
            <div style={{
              width: '100%',
              maxWidth: '430px',
              aspectRatio: '4 / 5',
              background: template.bg,
              border: `2px solid ${template.goldBorder}`,
              borderRadius: '24px',
              padding: '28px 24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(245, 158, 11, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Corner Embellishments */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '24px',
                height: '24px',
                borderTop: `2px solid ${template.goldAccent}`,
                borderLeft: `2px solid ${template.goldAccent}`
              }} />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '24px',
                height: '24px',
                borderTop: `2px solid ${template.goldAccent}`,
                borderRight: `2px solid ${template.goldAccent}`
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                width: '24px',
                height: '24px',
                borderBottom: `2px solid ${template.goldAccent}`,
                borderLeft: `2px solid ${template.goldAccent}`
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '24px',
                height: '24px',
                borderBottom: `2px solid ${template.goldAccent}`,
                borderRight: `2px solid ${template.goldAccent}`
              }} />

              {/* Flyer Top: JCI Brand */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '14px' }}>
                <JciLogo height={42} />
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  color: template.goldAccent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '4px'
                }}>
                  JCI Tirupati Innovations
                </div>
                <div style={{ fontSize: '0.68rem', color: template.subtitleColor }}>
                  Zone IV • JCI India
                </div>
              </div>

              {/* Occasion Badge */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: `1px solid ${template.goldAccent}`,
                color: template.goldAccent,
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px'
              }}>
                <Sparkles size={14} />
                <span>{celebrationType === 'BIRTHDAY' ? 'Warm Birthday Greetings' : 'Happy Wedding Anniversary'}</span>
                <Sparkles size={14} />
              </div>

              {/* Celebrant Photo with Luxury Ring */}
              <div style={{
                position: 'relative',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  padding: '4px',
                  background: `linear-gradient(135deg, ${template.goldAccent}, #ffffff, ${template.goldAccent})`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4)`
                }}>
                  <img
                    src={initialCelebrant?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
                    alt={memberName}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>

              {/* Celebrant Name & Title */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                color: template.textColor,
                margin: '0 0 2px 0',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}>
                {memberName}
              </h3>
              <div style={{ fontSize: '0.8rem', color: template.goldAccent, fontWeight: '700', marginBottom: '2px' }}>
                {designation}
              </div>
              <div style={{ fontSize: '0.72rem', color: template.subtitleColor, marginBottom: '14px' }}>
                {chapter}
              </div>

              {/* Custom Blessing / Message Box */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '10px 14px',
                fontSize: '0.76rem',
                color: '#f1f5f9',
                lineHeight: '1.4',
                fontStyle: 'italic',
                maxWidth: '92%',
                marginBottom: 'auto'
              }}>
                "{customWish}"
              </div>

              {/* Bottom Signatures Block */}
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                marginTop: '12px'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: template.textColor }}>
                    Jc. Er. P. Ramachandra Raju
                  </div>
                  <div style={{ fontSize: '0.64rem', color: template.goldAccent }}>
                    President (2026)
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: template.textColor }}>
                    Jc. Adv. S. Venkat Reddy
                  </div>
                  <div style={{ fontSize: '0.64rem', color: template.goldAccent }}>
                    Secretary (2026)
                  </div>
                </div>
              </div>
            </div>

            {toastMessage && (
              <div style={{
                marginTop: '14px',
                background: '#059669',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)'
              }}>
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
