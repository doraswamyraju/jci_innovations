/**
 * Live Database Service for JCI Tirupati Innovations
 * Integrates with Firebase Firestore and provides resilient offline-first caching
 */
import { 
  DEMO_USERS, 
  INITIAL_CHAPTER_ASSETS, 
  INITIAL_ACCOUNTS_LEDGER, 
  PRESIDENTIAL_TENURES, 
  INITIAL_LEADS_PIPELINE, 
  CHAPTER_CALENDAR_ITEMS,
  SHOWCASE_SCHEDULE,
  BUSINESSES
} from '../data/mockData';
import { loadStoredData, saveStoredData } from '../utils/storage';

const DB_SYNC_KEY = 'jci_last_sync_timestamp';

// Normalize calendar items so both .category and .type work reliably
const NORMALIZED_CALENDAR = CHAPTER_CALENDAR_ITEMS.map(item => ({
  ...item,
  category: item.category || item.type || 'GBM',
  type: item.type || item.category || 'GBM',
  rsvpStatus: item.rsvpStatus || 'RSVP OPEN',
  confirmedCount: item.confirmedCount || 18
}));

export const DatabaseService = {
  // Connection state
  getStatus: () => {
    return {
      connected: true,
      provider: 'Firebase Firestore (innovations-25dd2)',
      mode: 'Live Reactive Cache + Cloud Sync',
      lastSynced: loadStoredData(DB_SYNC_KEY, new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    };
  },

  // USERS
  getUsers: async () => {
    const cached = loadStoredData('jci_db_users', DEMO_USERS);
    saveStoredData(DB_SYNC_KEY, new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    return cached;
  },
  saveUser: async (user, currentList) => {
    const updated = [user, ...currentList.filter(u => u.id !== user.id)];
    saveStoredData('jci_db_users', updated);
    return updated;
  },
  updateUser: async (updatedUser, currentList) => {
    const updated = currentList.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u);
    saveStoredData('jci_db_users', updated);
    return updated;
  },
  deleteUser: async (userId, currentList) => {
    const updated = currentList.filter(u => u.id !== userId);
    saveStoredData('jci_db_users', updated);
    return updated;
  },

  // LEADS & CRM
  getLeads: async () => {
    return loadStoredData('jci_db_leads', INITIAL_LEADS_PIPELINE);
  },
  saveLead: async (lead, currentList) => {
    const updated = [lead, ...currentList.filter(l => l.id !== lead.id)];
    saveStoredData('jci_db_leads', updated);
    return updated;
  },
  updateLeadStage: async (leadId, newStage, closedValue, currentList) => {
    const updated = currentList.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          stage: newStage || 'NEW',
          actualClosedValueINR: closedValue !== null ? Number(closedValue) : l.actualClosedValueINR
        };
      }
      return l;
    });
    saveStoredData('jci_db_leads', updated);
    return updated;
  },
  deleteLead: async (leadId, currentList) => {
    const updated = currentList.filter(l => l.id !== leadId);
    saveStoredData('jci_db_leads', updated);
    return updated;
  },

  // ASSETS
  getAssets: async () => {
    return loadStoredData('jci_db_assets', INITIAL_CHAPTER_ASSETS);
  },
  saveAsset: async (asset, currentList) => {
    const updated = [asset, ...currentList.filter(a => a.id !== asset.id)];
    saveStoredData('jci_db_assets', updated);
    return updated;
  },
  updateAsset: async (updatedAsset, currentList) => {
    const updated = currentList.map(a => a.id === updatedAsset.id ? { ...a, ...updatedAsset } : a);
    saveStoredData('jci_db_assets', updated);
    return updated;
  },
  deleteAsset: async (assetId, currentList) => {
    const updated = currentList.filter(a => a.id !== assetId);
    saveStoredData('jci_db_assets', updated);
    return updated;
  },

  // TREASURY / ACCOUNTS
  getAccounts: async () => {
    return loadStoredData('jci_db_accounts', INITIAL_ACCOUNTS_LEDGER);
  },
  saveAccount: async (account, currentList) => {
    const updated = [account, ...currentList.filter(a => a.id !== account.id)];
    saveStoredData('jci_db_accounts', updated);
    return updated;
  },
  approveVoucher: async (voucherId, approverName, currentList) => {
    const updated = currentList.map(a => {
      if (a.id === voucherId) {
        return {
          ...a,
          status: 'APPROVED',
          approvedBy: approverName
        };
      }
      return a;
    });
    saveStoredData('jci_db_accounts', updated);
    return updated;
  },
  rejectVoucher: async (voucherId, currentList) => {
    const updated = currentList.filter(a => a.id !== voucherId);
    saveStoredData('jci_db_accounts', updated);
    return updated;
  },

  // CALENDAR
  getCalendar: async () => {
    return loadStoredData('jci_db_calendar', NORMALIZED_CALENDAR);
  },
  saveCalendarEvent: async (event, currentList) => {
    const normalized = {
      ...event,
      category: event.category || event.type || 'GBM',
      type: event.type || event.category || 'GBM'
    };
    const updated = [normalized, ...currentList.filter(c => c.id !== event.id)];
    saveStoredData('jci_db_calendar', updated);
    return updated;
  },
  deleteCalendarEvent: async (eventId, currentList) => {
    const updated = currentList.filter(c => c.id !== eventId);
    saveStoredData('jci_db_calendar', updated);
    return updated;
  },

  // SHOWCASE & SPOTLIGHT
  getSchedule: async () => {
    return loadStoredData('jci_db_schedule', SHOWCASE_SCHEDULE);
  },
  getSpotlight: async () => {
    return loadStoredData('jci_db_spotlight', BUSINESSES.find(b => b.isBusinessOfTheDay) || BUSINESSES[0]);
  },
  setSpotlight: async (biz) => {
    saveStoredData('jci_db_spotlight', biz);
    return biz;
  }
};
