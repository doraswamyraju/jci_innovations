import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Ticket 
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/mockData';

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setRegistered(false);
    setAttendeeName('');
    setAttendeePhone('');
  };

  return (
    <section id="events" className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Calendar size={14} />
            <span>Programs & Conclaves</span>
          </div>
          <h2 className="section-title">Upcoming JCI Tirupati Events</h2>
          <p className="section-subtitle">
            Participate in high-impact trade expos, sports fitness runs, leadership conclaves, and community service camps.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid-3">
          {UPCOMING_EVENTS.map((event) => (
            <div 
              key={event.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              {/* Event Cover Image */}
              <div style={{ position: 'relative', height: '180px' }}>
                <img 
                  src={event.image} 
                  alt={event.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(11, 31, 68, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {event.category}
                </div>

                {event.isMembersOnly && (
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: '#f59e0b',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '99px'
                  }}>
                    MEMBERS ONLY
                  </div>
                )}
              </div>

              {/* Event Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#005696', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                  <Calendar size={16} />
                  <span>{event.date}</span>
                  <span>•</span>
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0b1f44', marginBottom: '10px', lineHeight: '1.3' }}>
                  {event.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
                  <MapPin size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{event.venue}</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
                  {event.description}
                </p>

                {/* Footer Strip */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700' }}>
                    🔥 {event.spotsLeft} Seats Remaining
                  </span>

                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Register / RSVP</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event RSVP Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={20} />
              </button>

              {!registered ? (
                <div style={{ padding: '32px' }}>
                  <div className="badge-tag">
                    <Ticket size={14} />
                    <span>Instant Event Pass</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b1f44', marginBottom: '6px' }}>
                    {selectedEvent.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                    {selectedEvent.date} • {selectedEvent.venue}
                  </div>

                  <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Your Full Name *
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Jc. K. Rajesh"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        WhatsApp Number *
                      </label>
                      <input 
                        required
                        type="tel"
                        placeholder="+91 98490..."
                        value={attendeePhone}
                        onChange={(e) => setAttendeePhone(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
                      Confirm Free Registration & Get QR Pass
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b1f44', marginBottom: '6px' }}>
                    Registration Confirmed!
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '20px' }}>
                    We've reserved a seat for <strong>{attendeeName}</strong>. Your digital QR check-in pass has been dispatched to <strong>{attendeePhone}</strong>.
                  </p>
                  <button onClick={closeModal} className="btn btn-primary btn-sm">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
