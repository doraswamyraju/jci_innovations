import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Share2, 
  ShieldCheck, 
  BadgePercent, 
  Briefcase, 
  Layers, 
  Check, 
  Edit3, 
  Send, 
  HeartHandshake 
} from 'lucide-react';

export default function BusinessShowcaseModal({ business, onClose, onOpenLogConnect }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTagline, setEditedTagline] = useState(business?.tagline || '');
  const [editedOffer, setEditedOffer] = useState(business?.memberOffer || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!business) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/business/' + business.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveEdits = (e) => {
    e.preventDefault();
    business.tagline = editedTagline;
    business.memberOffer = editedOffer;
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px' }}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Cover Photo Banner */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img 
            src={business.coverImage} 
            alt={business.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)'
          }} />

          {/* Share & Edit Controls on Top Cover */}
          <div style={{ position: 'absolute', top: '18px', left: '18px', display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleCopyLink}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share Page'}</span>
            </button>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'rgba(245, 158, 11, 0.95)',
                color: '#1a0e00',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.78rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Self-service update for business owner"
            >
              <Edit3 size={14} />
              <span>{isEditing ? 'Cancel Edit' : 'Owner Edit'}</span>
            </button>
          </div>
        </div>

        {/* Header Information Strip */}
        <div style={{ padding: '0 32px' }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            marginTop: '-50px',
            position: 'relative',
            zIndex: 2,
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <img 
              src={business.logo} 
              alt={business.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '4px solid white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                background: 'white'
              }}
            />

            <div style={{ paddingTop: '52px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0b1f44' }}>
                  {business.name}
                </h2>
                {business.isVerified && (
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#047857',
                    padding: '4px 10px',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ShieldCheck size={14} />
                    VERIFIED JAYCEE ENTERPRISE
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
                Category: <strong>{business.category}</strong> • <span>{business.chapter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Main Content */}
        <div style={{ padding: '0 32px 32px 32px' }}>
          {/* Owner Self-Edit Box Simulation */}
          {isEditing && (
            <form onSubmit={handleSaveEdits} style={{
              background: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#92400e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={16} />
                <span>Member Self-Service Business Editor</span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#78350f', marginBottom: '4px' }}>
                  Business Tagline / Headline:
                </label>
                <input 
                  type="text"
                  value={editedTagline}
                  onChange={(e) => setEditedTagline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#78350f', marginBottom: '4px' }}>
                  Exclusive Member Offer:
                </label>
                <input 
                  type="text"
                  value={editedOffer}
                  onChange={(e) => setEditedOffer(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button type="submit" className="btn btn-gold btn-sm">
                  Save Changes
                </button>
                {saveSuccess && (
                  <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>
                    ✓ Business Details Updated Successfully!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Owner Info & Impact Ticker */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '18px 22px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                Owner & JCI Designation
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
                {business.ownerName}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                {business.ownerDesignation}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                Jaycee Trade Impact
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#059669', marginTop: '2px' }}>
                {business.businessValueGenerated}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {business.connectsReceived} Qualified Connects Received
              </div>
            </div>
          </div>

          {/* Exclusive Member Offer Box */}
          {business.memberOffer && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
              border: '1.5px dashed #d97706',
              borderRadius: '14px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '26px'
            }}>
              <BadgePercent size={28} color="#b45309" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#92400e', textTransform: 'uppercase' }}>
                  Exclusive Jaycee Privilege Offer
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#78350f', marginTop: '2px' }}>
                  {business.memberOffer}
                </div>
              </div>
            </div>
          )}

          {/* About Us */}
          <div style={{ marginBottom: '26px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0b1f44', marginBottom: '8px' }}>
              About The Enterprise
            </h4>
            <p style={{ color: '#334155', lineHeight: '1.7', fontSize: '0.95rem' }}>
              {business.description}
            </p>
          </div>

          {/* Products & Services Grid */}
          {business.productsAndServices && (
            <div style={{ marginBottom: '26px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0b1f44', marginBottom: '14px' }}>
                Key Products & Services
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {business.productsAndServices.map((prod, idx) => (
                  <div key={idx} style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px 16px'
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                      • {prod.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      {prod.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details & Address Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            background: '#f1f5f9',
            padding: '18px',
            borderRadius: '14px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="#005696" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Direct Line</div>
                <a href={`tel:${business.phone}`} style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a' }}>{business.phone}</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="#005696" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Official Email</div>
                <a href={`mailto:${business.email}`} style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a' }}>{business.email}</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="#005696" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Location</div>
                <div style={{ fontWeight: '600', fontSize: '0.82rem', color: '#0f172a' }}>{business.address}</div>
              </div>
            </div>
          </div>

          {/* Action CTAs Bottom Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px'
          }}>
            <a 
              href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hi ${business.ownerName}, I'm reaching out after seeing your ${business.name} profile on JCI Tirupati portal.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ flex: '1 1 200px' }}
            >
              <MessageCircle size={18} />
              <span>Connect on WhatsApp</span>
            </a>

            <button 
              onClick={() => {
                onClose();
                onOpenLogConnect(business);
              }}
              className="btn btn-primary"
              style={{ flex: '1 1 200px' }}
            >
              <HeartHandshake size={18} />
              <span>Pass a Referral / Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
