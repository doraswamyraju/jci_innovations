import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  MessageCircle, 
  Phone, 
  ArrowUpRight, 
  ShieldCheck, 
  BadgePercent, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { BUSINESSES, BUSINESS_CATEGORIES, TIRUPATI_CHAPTERS } from '../data/mockData';

export default function BusinessDirectory({ onSelectBusiness, onOpenRegister }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState('All');

  const filteredBusinesses = useMemo(() => {
    return BUSINESSES.filter((biz) => {
      const matchesSearch = 
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'All' || biz.category === selectedCategory;

      const matchesChapter = 
        selectedChapter === 'All' || biz.chapter === selectedChapter;

      return matchesSearch && matchesCategory && matchesChapter;
    });
  }, [searchQuery, selectedCategory, selectedChapter]);

  return (
    <section id="directory" className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Building2 size={14} />
            <span>Verified Jaycee Enterprise Index</span>
          </div>
          <h2 className="section-title">Explore Member-Owned Businesses</h2>
          <p className="section-subtitle">
            Discover verified enterprises across Tirupati owned and operated by active Jaycees. Connect directly for trade, services, and member-exclusive privileges.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          marginBottom: '36px',
          border: '1px solid #e2e8f0'
        }}>
          {/* Top Row: Search Input & Chapter Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f5f9',
              borderRadius: '12px',
              padding: '12px 18px',
              gap: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <Search size={20} color="#64748b" />
              <input 
                type="text"
                placeholder="Search by business name, services, keywords, or Jaycee owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  color: '#0f172a'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Chapter Dropdown Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f5f9',
              borderRadius: '12px',
              padding: '0 16px',
              border: '1px solid #e2e8f0'
            }}>
              <Filter size={18} color="#64748b" style={{ marginRight: '8px' }} />
              <select 
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 0',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  fontWeight: '600',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Tirupati Chapters ({TIRUPATI_CHAPTERS.length})</option>
                {TIRUPATI_CHAPTERS.map(ch => (
                  <option key={ch.id} value={ch.name}>{ch.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Carousel / Row */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'none'
          }}>
            {BUSINESS_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '99px',
                    fontSize: '0.85rem',
                    fontWeight: active ? '700' : '500',
                    background: active ? '#005696' : '#f1f5f9',
                    color: active ? '#ffffff' : '#475569',
                    border: active ? '1px solid #005696' : '1px solid #e2e8f0',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Register Prompt */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '500' }}>
            Showing <strong>{filteredBusinesses.length}</strong> verified member enterprises
          </div>

          <div style={{ fontSize: '0.88rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Are you a Jaycee in Tirupati without a listed business?</span>
            <button 
              onClick={onOpenRegister}
              style={{ fontWeight: '700', textDecoration: 'underline', color: '#005696', cursor: 'pointer' }}
            >
              List your enterprise
            </button>
          </div>
        </div>

        {/* Businesses Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid-3">
            {filteredBusinesses.map((biz) => (
              <div 
                key={biz.id} 
                className="glass-card" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  background: 'white'
                }}
              >
                {/* Card Top Banner / Cover */}
                <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                  <img 
                    src={biz.coverImage} 
                    alt={biz.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(11, 31, 68, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: 'white',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {biz.category}
                  </div>

                  {biz.isVerified && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#10b981',
                      color: 'white',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '99px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                      <ShieldCheck size={13} />
                      <span>JCI VERIFIED</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Logo + Name Header */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginTop: '-35px', marginBottom: '12px' }}>
                    <img 
                      src={biz.logo} 
                      alt={biz.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        border: '3px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        background: 'white'
                      }}
                    />
                    <div style={{ paddingTop: '32px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0b1f44', lineHeight: '1.2' }}>
                        {biz.name}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        {biz.chapter}
                      </div>
                    </div>
                  </div>

                  {/* Owner & Designation */}
                  <div style={{
                    fontSize: '0.82rem',
                    color: '#334155',
                    background: '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '14px'
                  }}>
                    <strong>{biz.ownerName}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{biz.ownerDesignation}</div>
                  </div>

                  {/* Tagline */}
                  <p style={{
                    fontSize: '0.88rem',
                    color: '#475569',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                  }}>
                    {biz.tagline}
                  </p>

                  {/* Member Offer Pill */}
                  {biz.memberOffer && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px dashed #f59e0b',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '18px'
                    }}>
                      <BadgePercent size={16} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {biz.memberOffer}
                      </span>
                    </div>
                  )}

                  {/* Push to bottom CTAs */}
                  <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => onSelectBusiness(biz)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>Showcase Page</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <a 
                      href={`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(`Hi ${biz.ownerName}, I found ${biz.name} on the JCI Tirupati portal. I would like to enquire about your services.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      title="Quick WhatsApp Chat"
                      style={{ padding: '8px 12px' }}
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '20px',
            border: '1px dashed #cbd5e1'
          }}>
            <Building2 size={48} color="#94a3b8" style={{ margin: '0 auto 16px auto' }} />
            <h4 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px' }}>No businesses found matching your filter</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedChapter('All'); }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
