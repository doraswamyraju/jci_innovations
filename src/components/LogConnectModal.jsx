import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Coins, 
  Handshake, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building2 
} from 'lucide-react';
import { BUSINESSES, TIRUPATI_CHAPTERS } from '../data/mockData';

export default function LogConnectModal({ preselectedBusiness, onClose, onAddConnect }) {
  const [activeTab, setActiveTab] = useState('REFERRAL'); // 'REFERRAL' | 'CLOSED_DEAL'
  
  // Referral Form State
  const [fromMember, setFromMember] = useState('Jc. R. Dinesh Kumar');
  const [fromChapter, setFromChapter] = useState('JCI Tirupati Innovations');
  const [toBusinessId, setToBusinessId] = useState(preselectedBusiness?.id || BUSINESSES[0].id);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [requirement, setRequirement] = useState('');

  // Deal Form State
  const [dealValue, setDealValue] = useState('');
  const [dealDescription, setDealDescription] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetBiz = BUSINESSES.find(b => b.id === toBusinessId) || BUSINESSES[0];

    if (activeTab === 'CLOSED_DEAL') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    onAddConnect({
      id: 'con-' + Date.now(),
      fromMember,
      fromChapter,
      toMember: targetBiz.ownerName,
      toChapter: targetBiz.chapter,
      category: activeTab === 'CLOSED_DEAL' ? dealDescription || 'Commercial Trade Contract' : requirement || 'Business Lead Referral',
      valueINR: activeTab === 'CLOSED_DEAL' ? `₹ ${Number(dealValue).toLocaleString('en-IN')}` : 'Lead Passed',
      timeAgo: 'Just now',
      status: activeTab === 'CLOSED_DEAL' ? 'CLOSED_WON' : 'NEW_REFERRAL'
    });

    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div style={{ padding: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div className="badge-tag badge-gold">
                <Coins size={14} />
                <span>Jaycee Business Exchange</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0b1f44', marginBottom: '6px' }}>
                Pass a Connect or Log Closed Deal
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Strengthen our local trade ecosystem by logging referrals and celebrating closed transactions.
              </p>
            </div>

            {/* Switch Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              background: '#f1f5f9',
              padding: '6px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setActiveTab('REFERRAL')}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  background: activeTab === 'REFERRAL' ? '#ffffff' : 'transparent',
                  color: activeTab === 'REFERRAL' ? '#005696' : '#64748b',
                  boxShadow: activeTab === 'REFERRAL' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Handshake size={16} />
                <span>1. Pass a Referral Lead</span>
              </button>

              <button
                onClick={() => setActiveTab('CLOSED_DEAL')}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  background: activeTab === 'CLOSED_DEAL' ? '#ffffff' : 'transparent',
                  color: activeTab === 'CLOSED_DEAL' ? '#d97706' : '#64748b',
                  boxShadow: activeTab === 'CLOSED_DEAL' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Coins size={16} />
                <span>2. Log Deal Closed (₹)</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Common: From Jaycee */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Referring Jaycee Name *
                  </label>
                  <input 
                    required
                    type="text"
                    value={fromMember}
                    onChange={(e) => setFromMember(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Your Chapter *
                  </label>
                  <select 
                    value={fromChapter}
                    onChange={(e) => setFromChapter(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: '600' }}
                  >
                    {TIRUPATI_CHAPTERS.map(ch => (
                      <option key={ch.id} value={ch.name}>{ch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Jaycee Business */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Target Jaycee Business / Member *
                </label>
                <select 
                  value={toBusinessId}
                  onChange={(e) => setToBusinessId(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}
                >
                  {BUSINESSES.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.ownerName} ({b.chapter})
                    </option>
                  ))}
                </select>
              </div>

              {activeTab === 'REFERRAL' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Client / Prospect Name *
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. S. Murthy (Apex Corp)"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Client Phone Number *
                      </label>
                      <input 
                        required
                        type="tel"
                        placeholder="+91 98..."
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Requirement Details & Brief *
                    </label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="e.g. Needs ERP accounting software with GST invoicing for 3 retail branches in Tirupati."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    padding: '16px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#92400e', marginBottom: '4px' }}>
                        Closed Deal Value in INR (₹) *
                      </label>
                      <input 
                        required
                        type="number"
                        placeholder="e.g. 250000"
                        value={dealValue}
                        onChange={(e) => setDealValue(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#92400e', marginBottom: '4px' }}>
                        Deal / Project Title & Testimonial *
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. 5kW Solar Rooftop Installation for Villa Project"
                        value={dealDescription}
                        onChange={(e) => setDealDescription(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="btn btn-gold" 
                style={{ width: '100%', padding: '14px', fontSize: '0.98rem', marginTop: '10px' }}
              >
                {activeTab === 'REFERRAL' ? '🚀 Send Qualified Referral Lead' : '🎉 Record Closed Deal & Update Ticker'}
              </button>
            </form>
          </div>
        ) : (
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

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0b1f44', marginBottom: '8px' }}>
              {activeTab === 'REFERRAL' ? 'Referral Sent Successfully!' : 'Deal Closed & Value Logged!'}
            </h3>
            <p style={{ color: '#475569', maxWidth: '440px', margin: '0 auto 24px auto', fontSize: '0.92rem', lineHeight: '1.6' }}>
              The recipient Jaycee has been notified and the transaction has been recorded into the live Connect Tracker.
            </p>

            <button onClick={onClose} className="btn btn-primary" style={{ padding: '10px 28px' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
