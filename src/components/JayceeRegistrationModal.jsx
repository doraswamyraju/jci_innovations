import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { TIRUPATI_CHAPTERS, BUSINESS_CATEGORIES } from '../data/mockData';

export default function JayceeRegistrationModal({ onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    bloodGroup: 'O+',
    chapter: 'JCI Tirupati Innovations (Host LO)',
    membershipId: '',
    designation: 'Member',
    hasBusiness: true,
    businessName: '',
    businessCategory: 'Technology & Software',
    businessTagline: '',
    memberOffer: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = 'APP-TPT-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(newId);
    
    // Add to pending applications
    onSubmitApplication({
      id: newId,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      chapter: formData.chapter,
      membershipId: formData.membershipId || 'Pending Verification',
      designation: formData.designation,
      businessName: formData.hasBusiness ? formData.businessName : 'N/A',
      businessCategory: formData.hasBusiness ? formData.businessCategory : 'N/A',
      appliedDate: 'Just Now',
      status: 'PENDING'
    });

    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div style={{ padding: '32px' }}>
            {/* Modal Header */}
            <div style={{ marginBottom: '24px' }}>
              <div className="badge-tag badge-gold">
                <Sparkles size={14} />
                <span>Open to All Tirupati Jaycees</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0b1f44', marginBottom: '8px' }}>
                Register as a Tirupati Jaycee
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Join the unified digital network, get your member profile and business listed, and participate in B2B trade connects across all Tirupati JCI chapters.
              </p>
            </div>

            {/* Admin Verification Notice Box */}
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <ShieldAlert size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', color: '#1e40af', lineHeight: '1.5' }}>
                <strong>Mandatory Admin Verification:</strong> To protect the integrity of the network, all submitted applications will be reviewed and verified by LO Admins before your profile and business go live on the public directory.
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Section 1: Personal & JCI Information */}
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#005696', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                1. Member & Chapter Details
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Full Name (with Jc. title) *
                  </label>
                  <input 
                    required
                    type="text"
                    name="fullName"
                    placeholder="e.g. Jc. K. Rajesh"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    WhatsApp Phone Number *
                  </label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98490 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Select Your JCI Chapter in Tirupati *
                  </label>
                  <select 
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}
                  >
                    {TIRUPATI_CHAPTERS.map(ch => (
                      <option key={ch.id} value={ch.name}>{ch.name}</option>
                    ))}
                    <option value="Other JCI Local Organization">Other Visiting JCI LO</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    JCI National ID / Number
                  </label>
                  <input 
                    type="text"
                    name="membershipId"
                    placeholder="Optional / If known"
                    value={formData.membershipId}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input 
                    required
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Current Designation / Role
                  </label>
                  <input 
                    type="text"
                    name="designation"
                    placeholder="e.g. Member / VP Business / Director"
                    value={formData.designation}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Section 2: Business Showcase Information */}
              <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: '800', color: '#005696', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                2. Business Showcase Details
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    name="hasBusiness"
                    checked={formData.hasBusiness}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>I own or manage a business and want a dedicated showcase page</span>
                </label>
              </div>

              {formData.hasBusiness && (
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Business / Enterprise Name *
                      </label>
                      <input 
                        required={formData.hasBusiness}
                        type="text"
                        name="businessName"
                        placeholder="e.g. Tirupati Solar Tech Solutions"
                        value={formData.businessName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Business Category *
                      </label>
                      <select 
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        {BUSINESS_CATEGORIES.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Short Tagline / Core Products & Services *
                    </label>
                    <input 
                      required={formData.hasBusiness}
                      type="text"
                      name="businessTagline"
                      placeholder="e.g. On-grid rooftop solar installations, PM Surya Ghar subsidy consulting"
                      value={formData.businessTagline}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Exclusive Jaycee Member Offer (Optional)
                    </label>
                    <input 
                      type="text"
                      name="memberOffer"
                      placeholder="e.g. 15% discount for fellow Tirupati Jaycees"
                      value={formData.memberOffer}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div style={{ marginTop: '12px' }}>
                <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
                  <UserCheck size={18} />
                  <span>Submit Application for Admin Verification</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0b1f44', marginBottom: '8px' }}>
              Registration Submitted Successfully!
            </h3>
            <div style={{
              display: 'inline-block',
              background: '#f1f5f9',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: '#475569',
              marginBottom: '18px'
            }}>
              Reference ID: <strong>{applicationId}</strong>
            </div>

            <p style={{ color: '#475569', maxWidth: '480px', margin: '0 auto 28px auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Thank you, <strong>{formData.fullName}</strong>! Your application for <strong>{formData.chapter}</strong> has been forwarded to the Chapter Admins. You will receive an activation SMS/WhatsApp confirmation once verified.
            </p>

            <button onClick={onClose} className="btn btn-primary" style={{ padding: '12px 32px' }}>
              Done & Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
