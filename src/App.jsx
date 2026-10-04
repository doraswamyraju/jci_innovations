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

import { PENDING_JAYCEE_APPLICATIONS, RECENT_CONNECT_FEED, BUSINESSES } from './data/mockData';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminQueueOpen, setIsAdminQueueOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLogConnectOpen, setIsLogConnectOpen] = useState(false);
  const [logConnectTargetBiz, setLogConnectTargetBiz] = useState(null);

  // Dynamic state
  const [applications, setApplications] = useState(PENDING_JAYCEE_APPLICATIONS);
  const [connectFeed, setConnectFeed] = useState(RECENT_CONNECT_FEED);

  const businessOfTheDay = BUSINESSES.find(b => b.isBusinessOfTheDay) || BUSINESSES[0];

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
      {/* Navigation Bar */}
      <Navbar 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAdminQueue={() => setIsAdminQueueOpen(true)}
        onOpenFullAdmin={() => setIsAdminPanelOpen(true)}
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
    </div>
  );
}
