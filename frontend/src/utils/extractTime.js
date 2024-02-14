/**
 * Extracts the time from a date string.
 * @param {string} dateString - The date string to extract time from.
 * @returns {string} - The formatted time string (HH:MM).
 */
export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

/**
 * Helper function to pad single-digit numbers with a leading zero.
 * @param {number} number - The number to pad.
 * @returns {string} - The padded number as a string.
 */
function padZero(number) {
  return number.toString().padStart(2, "0");
}
