export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours() % 12 || 12; // the hour '0' should be '12'
  const minutes = padZero(date.getMinutes());
  const amPm = date.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes} ${amPm}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
