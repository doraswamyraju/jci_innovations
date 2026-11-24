// Firebase Authentication Configuration for Google OAuth 2.0
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
// These can be configured in your .env file or updated directly here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDvPrVZseB6fu1EJ3jtBlLPlkx4d7gNYLc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "innovations-25dd2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "innovations-25dd2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "innovations-25dd2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "890440322350",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:890440322350:web:0d38afacccdd67ae00bebf"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google OAuth 2.0 Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always prompt user to choose their Google / Gmail account
});

/**
 * Triggers Google OAuth 2.0 Popup
 * Returns user info on success or throws error
 */
export async function signInWithGoogle() {
  // Check if real API key is configured
  if (firebaseConfig.apiKey.includes('DummyKey')) {
    // If not yet configured with real Firebase credentials, return demo user
    return {
      isDemo: true,
      user: {
        id: 'user-google-oauth',
        role: 'member',
        roleTitle: 'Verified Google Jaycee Member',
        fullName: 'Jc. Google Verified Member',
        email: 'google.jaycee@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        chapter: 'JCI Tirupati Innovations',
        designation: 'Active Member / Entrepreneur',
        phone: '+91 98490 12345',
        businessName: 'NextGen Digital Ventures',
        businessCategory: 'Technology & Software',
        membershipId: 'JCI-GOOGLE-OAUTH',
        bloodGroup: 'B+ve'
      }
    };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      isDemo: false,
      user: {
        id: `google-${user.uid}`,
        role: 'member',
        roleTitle: 'Verified Jaycee Member',
        fullName: user.displayName?.startsWith('Jc. ') ? user.displayName : `Jc. ${user.displayName || 'Jaycee Member'}`,
        email: user.email,
        avatar: user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        chapter: 'JCI Tirupati Innovations',
        designation: 'Active Member / Entrepreneur',
        phone: user.phoneNumber || '+91 98490 12345',
        businessName: 'Jaycee Enterprise',
        businessCategory: 'Technology & Software',
        membershipId: `JCI-TI-${Math.floor(1000 + Math.random() * 9000)}`,
        bloodGroup: 'O+ve'
      }
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}
