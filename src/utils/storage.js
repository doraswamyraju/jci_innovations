/**
 * Production-ready LocalStorage Persistence & Utilities for JCI Tirupati Innovations
 */

export function loadStoredData(key, fallbackData) {
  if (typeof window === 'undefined') return fallbackData;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) return parsed;
    }
  } catch (err) {
    console.warn(`[StorageEngine] Failed reading ${key} from localStorage:`, err);
  }
  return fallbackData;
}

export function saveStoredData(key, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[StorageEngine] Failed writing ${key} to localStorage:`, err);
  }
}

/**
 * 1-Click CSV Exporter for Chapter Audits, Ledgers, and CRM
 */
export function exportToCSV(filename, headers, rows) {
  if (!rows || rows.length === 0) {
    alert('No records available to export.');
    return;
  }

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const headerRow = headers.map(h => escapeCSV(h.label)).join(',');
  const dataRows = rows.map(row => {
    return headers.map(h => escapeCSV(h.getValue ? h.getValue(row) : row[h.key])).join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headerRow, ...dataRows].join('\r\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format Currency in INR
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}
