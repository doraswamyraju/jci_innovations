import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Download, 
  Share2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Sparkles, 
  Award, 
  Check, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Building2,
  Copy
} from 'lucide-react';
import JciLogo from './JciLogo';

const THEMES = [
  {
    id: 'royal-blue',
    name: 'JCI Royal Blue & Gold',
    bg: 'linear-gradient(135deg, #022c4f 0%, #004578 50%, #0369a1 100%)',
    accent: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.4)',
    textPrimary: '#ffffff',
    textSecondary: '#bae6fd',
    badgeBg: 'rgba(245, 158, 11, 0.2)',
    badgeColor: '#fde68a'
  },
  {
    id: 'executive-gold',
    name: 'Obsidian & Champagne Gold',
    bg: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #292524 100%)',
    accent: '#fbbf24',
    border: 'rgba(251, 191, 36, 0.4)',
    textPrimary: '#ffffff',
    textSecondary: '#d6d3d1',
    badgeBg: 'rgba(251, 191, 36, 0.15)',
    badgeColor: '#fef08a'
  },
  {
    id: 'modern-dark',
    name: 'Cyber Slate & Cyan',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0e7490 100%)',
    accent: '#06b6d4',
    border: 'rgba(6, 182, 212, 0.35)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    badgeBg: 'rgba(6, 182, 212, 0.2)',
    badgeColor: '#a5f3fc'
  },
  {
    id: 'minimal-slate',
    name: 'Executive Minimal White',
    bg: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    accent: '#0284c7',
    border: 'rgba(2, 132, 199, 0.3)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    badgeBg: 'rgba(2, 132, 199, 0.1)',
    badgeColor: '#0284c7'
  }
];

export default function DigitalVisitingCardModal({ user, onClose }) {
  const [selectedThemeId, setSelectedThemeId] = useState(user.cardTheme || 'royal-blue');
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'qr' | 'tenant'
  const [copiedLink, setCopiedLink] = useState(false);
  const [tenantActive, setTenantActive] = useState(user.tenantEnabled || false);

  const currentTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];

  // Dynamic Profile and QR URL
  const profileUrl = window.location.origin + `/#profile/${user.id || 'jc-member'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileUrl)}&bgcolor=${selectedThemeId === 'minimal-slate' ? 'ffffff' : '0f172a'}&color=${selectedThemeId === 'minimal-slate' ? '0284c7' : '38bdf8'}&qzone=1`;

  // Download .vcf (vCard)
  const handleDownloadVcf = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:${user.fullName.replace('Jc. ', '')};;;;
FN:${user.fullName}
ORG:${user.businessName || 'JCI Tirupati Innovations'}
TITLE:${user.designation || 'Jaycee Member'}
TEL;TYPE=CELL,VOICE:${user.phone || '+91 98490 12345'}
EMAIL;TYPE=PREF,INTERNET:${user.email || 'info@jcitirupati.org'}
URL:${user.website || profileUrl}
ADR;TYPE=WORK:;;${user.businessAddress || 'Tirupati, AP, India'};;;;
NOTE:JCI Tirupati Innovations - Verified Jaycee Member. Blood Group: ${user.bloodGroup || 'N/A'}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${user.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      background: 'rgba(4, 10, 20, 0.85)',
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
        maxWidth: '820px',
        maxHeight: '92vh',
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
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
                Digital Visiting Card & Dynamic QR
              </h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Instant contactless business card & Letstrack multi-tenant gateway
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

        {/* Tab Controls & Theme Selector */}
        <div style={{
          padding: '12px 24px',
          background: '#131d31',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* View Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('card')}
              style={{
                background: activeTab === 'card' ? '#0284c7' : 'transparent',
                color: activeTab === 'card' ? '#ffffff' : '#94a3b8',
                border: '1px solid ' + (activeTab === 'card' ? '#0284c7' : '#334155'),
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Live Card Preview
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              style={{
                background: activeTab === 'qr' ? '#0284c7' : 'transparent',
                color: activeTab === 'qr' ? '#ffffff' : '#94a3b8',
                border: '1px solid ' + (activeTab === 'qr' ? '#0284c7' : '#334155'),
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Standalone QR Code
            </button>
            <button
              onClick={() => setActiveTab('tenant')}
              style={{
                background: activeTab === 'tenant' ? 'linear-gradient(135deg, #d97706, #b45309)' : 'transparent',
                color: activeTab === 'tenant' ? '#ffffff' : '#f59e0b',
                border: '1px solid ' + (activeTab === 'tenant' ? '#b45309' : '#78350f'),
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Zap size={14} />
              <span>Letstrack Tenant Suite</span>
            </button>
          </div>

          {/* Theme Selector Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Theme:</span>
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                title={theme.name}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: theme.bg,
                  border: selectedThemeId === theme.id ? `2px solid #ffffff` : `1px solid ${theme.border}`,
                  boxShadow: selectedThemeId === theme.id ? `0 0 10px ${theme.accent}` : 'none',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {activeTab === 'card' && (
            <div style={{ width: '100%', maxWidth: '440px' }}>
              {/* The Physical Card Rendering */}
              <div style={{
                background: currentTheme.bg,
                border: `1.5px solid ${currentTheme.border}`,
                borderRadius: '22px',
                padding: '28px 24px',
                color: currentTheme.textPrimary,
                boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.2)`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative watermarked emblem */}
                <div style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  opacity: 0.06,
                  pointerEvents: 'none'
                }}>
                  <JciLogo height={160} />
                </div>

                {/* Card Top Row: Org & Role */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <JciLogo height={34} />
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: '800', letterSpacing: '0.05em', color: currentTheme.accent, textTransform: 'uppercase' }}>
                        JCI Tirupati Innovations
                      </div>
                      <div style={{ fontSize: '0.68rem', color: currentTheme.textSecondary }}>
                        Zone IV • JCI India
                      </div>
                    </div>
                  </div>

                  <span style={{
                    background: currentTheme.badgeBg,
                    color: currentTheme.badgeColor,
                    border: `1px solid ${currentTheme.border}`,
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '20px'
                  }}>
                    {user.membershipId || 'VERIFIED'}
                  </span>
                </div>

                {/* Member Info */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '18px' }}>
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'} 
                    alt={user.fullName}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `2px solid ${currentTheme.accent}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 2px 0', color: currentTheme.textPrimary }}>
                      {user.fullName}
                    </h3>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: currentTheme.accent }}>
                      {user.designation}
                    </div>
                    {user.bloodGroup && (
                      <div style={{ fontSize: '0.7rem', color: currentTheme.textSecondary, marginTop: '2px' }}>
                        Blood Group: <strong>{user.bloodGroup}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Information Box */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Building2 size={15} color={currentTheme.accent} />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: currentTheme.textPrimary }}>
                      {user.businessName}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: currentTheme.textSecondary, lineHeight: '1.3' }}>
                    {user.businessTagline}
                  </div>
                </div>

                {/* Quick Action Contact Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <a 
                    href={`tel:${user.phone}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '10px 4px',
                      textAlign: 'center',
                      color: currentTheme.textPrimary,
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Phone size={16} color={currentTheme.accent} />
                    <span>Call</span>
                  </a>

                  <a 
                    href={`https://wa.me/${user.whatsapp}?text=Hi%20${encodeURIComponent(user.fullName)},%20I%20got%20your%20Digital%20Card%20via%20JCI%20Tirupati%20Innovations.`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      borderRadius: '10px',
                      padding: '10px 4px',
                      textAlign: 'center',
                      color: '#4ade80',
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(34, 197, 94, 0.25)'
                    }}
                  >
                    <Share2 size={16} />
                    <span>WhatsApp</span>
                  </a>

                  <a 
                    href={`mailto:${user.email}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '10px 4px',
                      textAlign: 'center',
                      color: currentTheme.textPrimary,
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Mail size={16} color={currentTheme.accent} />
                    <span>Email</span>
                  </a>

                  <a 
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '10px 4px',
                      textAlign: 'center',
                      color: currentTheme.textPrimary,
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Globe size={16} color={currentTheme.accent} />
                    <span>Website</span>
                  </a>
                </div>

                {/* Embedded Mini QR & Save Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img 
                      src={qrCodeUrl} 
                      alt="Mini QR" 
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '6px',
                        background: '#ffffff',
                        padding: '2px'
                      }}
                    />
                    <div style={{ fontSize: '0.68rem', color: currentTheme.textSecondary, maxWidth: '140px' }}>
                      Scan to view products, deals & verified bio
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadVcf}
                    style={{
                      background: currentTheme.accent,
                      color: selectedThemeId === 'executive-gold' ? '#000000' : '#ffffff',
                      border: 'none',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                    }}
                  >
                    <Download size={14} />
                    <span>Save Contact (.vcf)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              maxWidth: '380px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <div style={{
                background: '#ffffff',
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                marginBottom: '20px'
              }}>
                <img 
                  src={qrCodeUrl} 
                  alt="Jaycee Dynamic Profile QR" 
                  style={{ width: '220px', height: '220px', display: 'block' }}
                />
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' }}>
                {user.fullName}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#38bdf8', margin: '0 0 16px 0' }}>
                {user.businessName} • {user.chapter}
              </p>

              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button
                  onClick={handleCopyLink}
                  style={{
                    flex: 1,
                    background: '#334155',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedLink ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>

                <a
                  href={qrCodeUrl}
                  download={`${user.fullName}_QR.png`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    background: '#0284c7',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={15} />
                  <span>Save QR Image</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'tenant' && (
            <div style={{
              background: '#111827',
              border: '1px solid #374151',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '600px',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid #1f2937',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Zap size={22} color="#ffffff" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#fef3c7' }}>
                      Letstrack & Enterprise Tenant Gateway
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                      Premium multi-tenant SaaS integration for business tracking & fleets
                    </span>
                  </div>
                </div>

                <span style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '20px'
                }}>
                  Paid Add-on
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: '#d1d5db', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                The <strong>Letstrack Tenant Module</strong> enables member businesses to spin up dedicated white-labeled enterprise portals with live asset GPS tracking, multi-branch employee digital cards, automated dispatch, and CRM analytics.
              </p>

              <div style={{
                background: '#1f2937',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff' }}>
                      Tenant Status: {tenantActive ? 'Active (Premium Tier)' : 'Inactive / Trial'}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
                      Subdomain: {user.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.letstrack.jcitirupati.org
                    </div>
                  </div>

                  <button
                    onClick={() => setTenantActive(!tenantActive)}
                    style={{
                      background: tenantActive ? '#10b981' : '#f59e0b',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {tenantActive ? '✓ Provisioned' : 'Activate Tenant'}
                  </button>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                fontSize: '0.78rem',
                color: '#9ca3af'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#10b981" />
                  <span>Real-time GPS Tracking API</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#10b981" />
                  <span>Custom Corporate Subdomain</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#10b981" />
                  <span>Multi-Employee Digital Cards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#10b981" />
                  <span>Unlimited Inbound Leads CRM</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '14px 24px',
          background: '#0b1120',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleCopyLink}
            style={{
              background: 'transparent',
              color: '#38bdf8',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Copy size={15} />
            <span>{copiedLink ? 'Profile Link Copied to Clipboard!' : 'Copy Shareable Profile Link'}</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
