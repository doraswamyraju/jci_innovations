import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailyHighlights from './components/DailyHighlights';
import ConnectTrackerSection from './components/ConnectTrackerSection';
import BusinessDirectory from './components/BusinessDirectory';
import PillarsSection from './components/PillarsSection';
import EventsSection from './components/EventsSection';
import PartnerBenefits from './components/PartnerBenefits';
import Footer from './components/Footer';

import BusinessShowcaseModal from './components/BusinessShowcaseModal';
import JayceeRegistrationModal from './components/JayceeRegistrationModal';
import AdminApprovalQueueModal from './components/AdminApprovalQueueModal';
import LogConnectModal from './components/LogConnectModal';
import AdminPanel from './components/AdminPanel';
import JayceeDashboard from './components/JayceeDashboard';
import AuthModal from './components/AuthModal';

import { PENDING_JAYCEE_APPLICATIONS, RECENT_CONNECT_FEED, BUSINESSES } from './data/mockData';
import { loadStoredData, saveStoredData } from './utils/storage';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminQueueOpen, setIsAdminQueueOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isJayceePortalOpen, setIsJayceePortalOpen] = useState(false);
  const [isLogConnectOpen, setIsLogConnectOpen] = useState(false);
  const [logConnectTargetBiz, setLogConnectTargetBiz] = useState(null);

  // Authentication State with Persistence
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    return loadStoredData('jci_auth_user', null);
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dynamic state with local storage persistence
  const [applications, setApplications] = useState(() => loadStoredData('jci_applications', PENDING_JAYCEE_APPLICATIONS));
  const [connectFeed, setConnectFeed] = useState(() => loadStoredData('jci_connect_feed', RECENT_CONNECT_FEED));
  const [customBizOfTheDay, setCustomBizOfTheDay] = useState(() => {
    return loadStoredData('jci_active_spotlight', BUSINESSES.find(b => b.isBusinessOfTheDay) || BUSINESSES[0]);
  });
  const [liveCelebrationFlyer, setLiveCelebrationFlyer] = useState(() => {
    return loadStoredData('jci_celebration_flyer', null);
  });

  const businessOfTheDay = customBizOfTheDay || BUSINESSES.find(b => b.isBusinessOfTheDay) || BUSINESSES[0];

  const handleLoginSuccess = (user) => {
    setAuthenticatedUser(user);
    saveStoredData('jci_auth_user', user);
    setIsAuthOpen(false);
    setIsJayceePortalOpen(true);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jci_auth_user');
    }
    setIsJayceePortalOpen(false);
  };

  const handleSetLiveSpotlight = (biz) => {
    setCustomBizOfTheDay(biz);
    saveStoredData('jci_active_spotlight', biz);
  };

  const handleSetLiveFlyer = (flyer) => {
    setLiveCelebrationFlyer(flyer);
    saveStoredData('jci_celebration_flyer', flyer);
  };

  const handleAddApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleApproveApplication = (appId) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'APPROVED' } : a));
  };

  const handleRejectApplication = (appId) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  const handleAddConnect = (newConnect) => {
    setConnectFeed(prev => [newConnect, ...prev]);
  };

  const pendingCount = applications.filter(a => a.status === 'PENDING').length;

  // SPA Full-Page Dedicated Dashboard Mode (Light Mode, Dedicated Sidebar & Topbar)
  if (isJayceePortalOpen) {
    return (
      <JayceeDashboard
        authenticatedUser={authenticatedUser}
        onExitToWebsite={() => setIsJayceePortalOpen(false)}
        onLogout={handleLogout}
        onSetBusinessOfTheDay={handleSetLiveSpotlight}
        onPublishCelebrationToWebsite={handleSetLiveFlyer}
      />
    );
  }

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <Navbar
        currentUser={authenticatedUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAdminQueue={() => setIsAdminQueueOpen(true)}
        onOpenFullAdmin={() => setIsAdminPanelOpen(true)}
        onOpenJayceePortal={() => {
          if (!authenticatedUser) {
            setIsAuthOpen(true);
          } else {
            setIsJayceePortalOpen(true);
          }
        }}
        pendingCount={pendingCount}
      />

      {/* Redesigned Hero Banner with 4 LOs Branding & Live Card */}
      <Hero
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogConnect={() => {
          setLogConnectTargetBiz(null);
          setIsLogConnectOpen(true);
        }}
        onSelectBusiness={(biz) => setSelectedBusiness(biz)}
        businessOfTheDay={businessOfTheDay}
      />

      {/* Daily Highlights: Business of the Day, Birthdays & Anniversaries */}
      <DailyHighlights
        onSelectBusiness={(biz) => setSelectedBusiness(biz)}
        customBusinessOfTheDay={customBizOfTheDay}
        liveCelebrationFlyer={liveCelebrationFlyer}
      />

      {/* Live Business Connect & Value Tracker (₹) */}
      <ConnectTrackerSection
        onOpenLogConnect={() => {
          setLogConnectTargetBiz(null);
          setIsLogConnectOpen(true);
        }}
      />

      {/* Member-Owned Business Directory (Search, Filters, Dedicated Pages) */}
      <BusinessDirectory
        onSelectBusiness={(biz) => setSelectedBusiness(biz)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* 10 Organizational Pillars */}
      <PillarsSection />

      {/* Upcoming Events & Digital Pass RSVP */}
      <EventsSection />

      {/* Partner Perks */}
      <PartnerBenefits />

      {/* Footer */}
      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Dedicated Business Page Modal */}
      {selectedBusiness && (
        <BusinessShowcaseModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onOpenLogConnect={(biz) => {
            setLogConnectTargetBiz(biz);
            setIsLogConnectOpen(true);
          }}
        />
      )}

      {/* Registration Modal for All 4 Tirupati Jaycees Chapters */}
      {isRegisterOpen && (
        <JayceeRegistrationModal
          onClose={() => setIsRegisterOpen(false)}
          onSubmitApplication={handleAddApplication}
        />
      )}

      {/* Quick Approval Queue Modal */}
      {isAdminQueueOpen && (
        <AdminApprovalQueueModal
          applications={applications}
          onClose={() => setIsAdminQueueOpen(false)}
          onApprove={handleApproveApplication}
          onReject={handleRejectApplication}
        />
      )}

      {/* Full Admin Command Center */}
      {isAdminPanelOpen && (
        <AdminPanel
          applications={applications}
          onApproveApplication={handleApproveApplication}
          onRejectApplication={handleRejectApplication}
          onClose={() => setIsAdminPanelOpen(false)}
          connectFeed={connectFeed}
        />
      )}

      {/* Pass a Connect / Log Closed Deal Modal */}
      {isLogConnectOpen && (
        <LogConnectModal
          preselectedBusiness={logConnectTargetBiz}
          onClose={() => setIsLogConnectOpen(false)}
          onAddConnect={handleAddConnect}
        />
      )}

      {/* User Login & Signup Modal with Google OAuth 2.0 & Role Detection */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
