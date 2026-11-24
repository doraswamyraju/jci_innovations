import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Briefcase, 
  Building2, 
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import JciLogo from './JciLogo';
import { DEMO_USERS } from '../data/mockData';
import { signInWithGoogle } from '../config/firebase';
import { loadStoredData, saveStoredData } from '../utils/storage';
import { DatabaseService } from '../services/databaseService';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Sign up fields
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    chapter: 'JCI Tirupati Innovations',
    role: 'member',
    businessName: '',
    businessCategory: 'Technology & Software'
  });

  // Handle standard Email & Password Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      setErrorMsg('Invalid email or password. Please check credentials or use the quick test buttons below.');
    }
  };

  // Quick 1-Click Login Helper
  const handleQuickLogin = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setErrorMsg('');
    setTimeout(() => {
      onLoginSuccess(demoUser);
    }, 200);
  };

  // Google OAuth 2.0 Handler with Firebase
  const handleGoogleOAuth = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');

    try {
      const response = await signInWithGoogle();
      setIsGoogleLoading(false);
      const googleUser = response.user;

      // Automatically register and persist into Chapter Database & Members Directory
      const existingUsers = loadStoredData('jci_users', DEMO_USERS);
      const emailLower = googleUser.email?.toLowerCase();
      const userExists = existingUsers.some(u => 
        (emailLower && u.email?.toLowerCase() === emailLower) || u.id === googleUser.id
      );

      let updatedUsers;
      if (userExists) {
        updatedUsers = existingUsers.map(u => 
          ((emailLower && u.email?.toLowerCase() === emailLower) || u.id === googleUser.id)
            ? { ...u, ...googleUser }
            : u
        );
      } else {
        updatedUsers = [googleUser, ...existingUsers];
      }

      saveStoredData('jci_users', updatedUsers);
      saveStoredData('jci_auth_user', googleUser);
      DatabaseService.saveUser(googleUser, existingUsers);

      onLoginSuccess(googleUser);
    } catch (err) {
      setIsGoogleLoading(false);
      console.error(err);
      if (err.code === 'auth/unauthorized-domain') {
        setErrorMsg('Domain not authorized in Firebase! Please add "innovations.sriddha.com" to Firebase Console -> Authentication -> Settings -> Authorized Domains.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google login popup was closed. Please try again.');
      } else {
        setErrorMsg(err.message || 'Failed to authenticate with Google OAuth. Check Firebase configuration.');
      }
    }
  };

  // Handle Signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.fullName || !signupForm.email || !signupForm.password) {
      setErrorMsg('Please complete all mandatory fields.');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      role: signupForm.role,
      roleTitle: signupForm.role === 'officer' ? 'Chapter Officer' : 'Member - Entrepreneur',
      fullName: `Jc. ${signupForm.fullName}`,
      membershipId: `JCI-TI-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
      designation: signupForm.role === 'officer' ? 'Director (Portfolio)' : 'Active Member / Entrepreneur',
      chapter: signupForm.chapter,
      phone: signupForm.phone || '+91 98490 00000',
      email: signupForm.email,
      password: signupForm.password,
      whatsapp: signupForm.phone?.replace(/[^0-9]/g, '') || '919849000000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bloodGroup: 'O+ve',
      birthday: '01 January',
      anniversary: '01 January',
      businessName: signupForm.businessName || 'My Enterprise',
      businessCategory: signupForm.businessCategory,
      businessTagline: 'Professional Products & Services in Tirupati',
      businessAddress: 'Tirupati, AP, India',
      website: 'https://jcitirupati.org',
      memberDiscount: 'Special 10% Discount for Jaycee Members',
      tenantEnabled: false,
      cardTheme: 'royal-blue',
      products: [
        { name: 'Initial Business Consultation', price: 'Complimentary', desc: 'B2B assessment for fellow Jaycees' }
      ]
    };

    const existingUsers = loadStoredData('jci_users', DEMO_USERS);
    const updatedUsers = [newUser, ...existingUsers.filter(u => u.email?.toLowerCase() !== newUser.email.toLowerCase())];
    saveStoredData('jci_users', updatedUsers);
    saveStoredData('jci_auth_user', newUser);
    DatabaseService.saveUser(newUser, existingUsers);

    onLoginSuccess(newUser);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1300,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '24px 28px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <JciLogo height={44} />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#005696', margin: 0 }}>
                JCI Innovations
              </h2>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: '500' }}>
                Secure Member Authentication & RBAC
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div style={{
          display: 'flex',
          padding: '4px',
          margin: '16px 28px 0',
          background: '#f1f5f9',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'login' ? '#ffffff' : 'transparent',
              color: authMode === 'login' ? '#005696' : '#64748b',
              fontWeight: authMode === 'login' ? '700' : '600',
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: authMode === 'login' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'signup' ? '#ffffff' : 'transparent',
              color: authMode === 'signup' ? '#005696' : '#64748b',
              fontWeight: authMode === 'signup' ? '700' : '600',
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: authMode === 'signup' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Create Jaycee Account
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          padding: '20px 28px 28px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Error Message banner */}
          {errorMsg && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#b91c1c',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Continue with Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleOAuth}
            disabled={isGoogleLoading}
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '0.88rem',
              fontWeight: '700',
              color: '#1e293b',
              cursor: isGoogleLoading ? 'default' : 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'background 0.2s'
            }}
          >
            {/* Multi-color Google SVG Logo */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{isGoogleLoading ? 'Connecting to Google OAuth 2.0...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>OR SIGN IN WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Registered Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="email"
                    required
                    placeholder="name@innovations.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '0.86rem',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 38px 10px 38px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '0.86rem',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '10px',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #005696, #0284c7)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 86, 150, 0.25)',
                  marginTop: '4px'
                }}
              >
                <span>Sign In to Jaycee Portal</span>
                <ArrowRight size={16} />
              </button>

              {/* 1-Click Role Accounts Quick Test Grid */}
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Quick 1-Click Role Logins:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Super Admin */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(DEMO_USERS[0])}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#0f172a' }}>Super Admin</div>
                    <div style={{ fontSize: '0.68rem', color: '#0284c7' }}>superadmin@innovations.com</div>
                  </button>

                  {/* Admin (President) */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(DEMO_USERS[1])}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#0f172a' }}>Admin (President)</div>
                    <div style={{ fontSize: '0.68rem', color: '#0284c7' }}>admin@innovations.com</div>
                  </button>

                  {/* Officer */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(DEMO_USERS[2])}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#0f172a' }}>Officer (Secretary)</div>
                    <div style={{ fontSize: '0.68rem', color: '#0284c7' }}>officer@innovations.com</div>
                  </button>

                  {/* Member */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(DEMO_USERS[4])}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#0f172a' }}>Member (Entrepreneur)</div>
                    <div style={{ fontSize: '0.68rem', color: '#0284c7' }}>member@innovations.com</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name (Jaycee)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. K. Naresh Kumar"
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+91 98490 12345"
                    value={signupForm.phone}
                    onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Role Type</label>
                  <select
                    value={signupForm.role}
                    onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                  >
                    <option value="member">Jaycee Member</option>
                    <option value="officer">Chapter Officer / Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Enterprise / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Precast Technologies"
                  value={signupForm.businessName}
                  onChange={(e) => setSignupForm({ ...signupForm, businessName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.84rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#005696',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Create Account & Go to Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
