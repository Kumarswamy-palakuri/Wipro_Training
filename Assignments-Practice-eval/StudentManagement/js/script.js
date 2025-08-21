// Wait until page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get today's day number: 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const today = new Date().getDay();

  // Map JS day numbers to our timetable index (Monday=0, Tuesday=1, etc.)
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };

  // If today is Monday–Friday, highlight the correct card
  if (typeof map[today] !== 'undefined') {
    const days = document.querySelectorAll('.timetable .day');
    const todayCard = days[map[today]];

    if (todayCard) {
      todayCard.style.boxShadow = '0 8px 22px rgba(13,110,253,0.15)';
      todayCard.style.border = '1px solid rgba(13,110,253,0.2)';
    }
  }
});
