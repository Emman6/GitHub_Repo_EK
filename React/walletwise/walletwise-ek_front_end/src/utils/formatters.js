/**
 * ── WALLETWISE UTILITIES: FORMATTERS ──
 * I am centralizing these functions here so that if I ever need to change 
 * from UGX to another currency, I only have to edit this one file.
 */

/**
 * I am using the native Intl.NumberFormat API to ensure that large 
 * currency amounts (like 2,450,000) are always comma-separated and 
 * prefixed with the correct currency symbol.
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'UGX 0';
  
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0, // In Uganda, we rarely use cents for daily tracking
  }).format(amount);
};

/**
 * I am creating this to handle the "Tithe" calculation requirement.
 * By keeping the 10% logic here, I keep my components clean and 
 * focused only on the UI.
 */
export const calculateTithe = (amount) => {
  const numericAmount = parseFloat(amount) || 0;
  return numericAmount * 0.10;
};

/**
 * I am formatting dates to be 'DD MMM YYYY' (e.g., 12 Mar 2026) 
 * to make the financial reports easier to read at a glance.
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};