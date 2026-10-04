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

import { PENDING_JAYCEE_APPLICATIONS, RECENT_CONNECT_FEED } from './data/mockData';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminQueueOpen, setIsAdminQueueOpen] = useState(false);
  const [isLogConnectOpen, setIsLogConnectOpen] = useState(false);
  const [logConnectTargetBiz, setLogConnectTargetBiz] = useState(null);

  // Dynamic application list
  const [applications, setApplications] = useState(PENDING_JAYCEE_APPLICATIONS);

  // Dynamic connect / deals list
  const [connectFeed, setConnectFeed] = useState(RECENT_CONNECT_FEED);

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

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAdminQueue={() => setIsAdminQueueOpen(true)}
        pendingCount={pendingCount}
      />

      {/* Hero Banner with Stats */}
      <Hero 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogConnect={() => {
          setLogConnectTargetBiz(null);
          setIsLogConnectOpen(true);
        }}
      />

      {/* Daily Highlights: Business of the Day, Birthdays & Anniversaries */}
      <DailyHighlights 
        onSelectBusiness={(biz) => setSelectedBusiness(biz)}
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

      {/* Upcoming Events & Pass RSVP */}
      <EventsSection />

      {/* Partner Perks */}
      <PartnerBenefits />

      {/* Footer */}
      <Footer 
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Modals */}
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

      {isRegisterOpen && (
        <JayceeRegistrationModal 
          onClose={() => setIsRegisterOpen(false)}
          onSubmitApplication={handleAddApplication}
        />
      )}

      {isAdminQueueOpen && (
        <AdminApprovalQueueModal 
          applications={applications}
          onClose={() => setIsAdminQueueOpen(false)}
          onApprove={handleApproveApplication}
          onReject={handleRejectApplication}
        />
      )}

      {isLogConnectOpen && (
        <LogConnectModal 
          preselectedBusiness={logConnectTargetBiz}
          onClose={() => setIsLogConnectOpen(false)}
          onAddConnect={handleAddConnect}
        />
      )}
    </div>
  );
}
