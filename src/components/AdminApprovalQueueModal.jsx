import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  UserCheck, 
  Building2, 
  AlertCircle, 
  Filter, 
  Phone, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export default function AdminApprovalQueueModal({ applications, onClose, onApprove, onReject }) {
  const [selectedTab, setSelectedTab] = useState('PENDING');
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  const pendingList = applications.filter(a => a.status === 'PENDING');
  const approvedList = applications.filter(a => a.status === 'APPROVED');

  const handleApproveAction = (app) => {
    onApprove(app.id);
    setActionSuccessMessage(`✓ ${app.fullName} (${app.chapter}) approved & activated!`);
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  const handleRejectAction = (app) => {
    onReject(app.id);
    setActionSuccessMessage(`✗ Application for ${app.fullName} rejected.`);
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="badge-tag badge-green">
                <ShieldCheck size={14} />
                <span>Super Admin & Chapter Admin Queue</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0b1f44' }}>
                Tirupati Jaycees Verification Center
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Review, verify and approve registrations from all Tirupati Jaycee chapters.
              </p>
            </div>
          </div>

          {/* Feedback Alert */}
          {actionSuccessMessage && (
            <div style={{
              background: '#dcfce7',
              border: '1px solid #86efac',
              color: '#166534',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '0.88rem',
              fontWeight: '700',
              marginBottom: '18px'
            }}>
              {actionSuccessMessage}
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => setSelectedTab('PENDING')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: selectedTab === 'PENDING' ? '#005696' : '#f1f5f9',
                color: selectedTab === 'PENDING' ? 'white' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Pending Approvals</span>
              <span style={{
                background: selectedTab === 'PENDING' ? '#f59e0b' : '#cbd5e1',
                color: '#000',
                padding: '2px 6px',
                borderRadius: '99px',
                fontSize: '0.72rem',
                fontWeight: '800'
              }}>
                {pendingList.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedTab('APPROVED')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: selectedTab === 'APPROVED' ? '#005696' : '#f1f5f9',
                color: selectedTab === 'APPROVED' ? 'white' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Recently Approved</span>
              <span style={{
                background: selectedTab === 'APPROVED' ? '#10b981' : '#cbd5e1',
                color: selectedTab === 'APPROVED' ? 'white' : '#000',
                padding: '2px 6px',
                borderRadius: '99px',
                fontSize: '0.72rem',
                fontWeight: '800'
              }}>
                {approvedList.length}
              </span>
            </button>
          </div>

          {/* List of Applications */}
          {selectedTab === 'PENDING' ? (
            pendingList.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pendingList.map((app) => (
                  <div key={app.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0b1f44' }}>
                            {app.fullName}
                          </h4>
                          <span style={{
                            background: '#e0f2fe',
                            color: '#0369a1',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            {app.chapter}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                          Role: <strong>{app.designation}</strong> • JCI ID: <strong>{app.membershipId}</strong>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: '#f8fafc', padding: '4px 8px', borderRadius: '6px' }}>
                        Applied {app.appliedDate}
                      </span>
                    </div>

                    {/* Business Details Preview */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <Building2 size={20} color="#005696" />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>
                          {app.businessName}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Category: {app.businessCategory}
                        </div>
                      </div>
                    </div>

                    {/* Contact & Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '14px', fontSize: '0.82rem', color: '#475569' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Phone size={14} /> {app.phone}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={14} /> {app.email}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleRejectAction(app)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: '600',
                            border: '1px solid #fca5a5',
                            color: '#b91c1c',
                            background: '#fef2f2'
                          }}
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleApproveAction(app)}
                          className="btn btn-primary btn-sm"
                          style={{ background: '#10b981', borderColor: '#10b981' }}
                        >
                          <Check size={16} />
                          <span>Approve & Activate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '16px' }}>
                <ShieldCheck size={40} color="#10b981" style={{ margin: '0 auto 10px auto' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '4px' }}>Queue is Clear!</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>All registered Jaycees have been verified and approved.</p>
              </div>
            )
          ) : (
            /* Approved List Tab */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {approvedList.map(app => (
                <div key={app.id} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>
                      {app.fullName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {app.chapter} • {app.businessName} ({app.businessCategory})
                    </div>
                  </div>
                  <span style={{
                    background: '#dcfce7',
                    color: '#166534',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '99px'
                  }}>
                    ✓ ACTIVE MEMBER
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
