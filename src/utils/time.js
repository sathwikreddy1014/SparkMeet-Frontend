// returns strings like "just now", "5 seconds ago", "2 minutes ago", "yesterday", "in 3 hours"
const time = function timeAgo(createdAt) {
  const past = new Date(createdAt).getTime();
  if (isNaN(past)) return ''; // invalid date

  const diffMs = Date.now() - past;         // positive -> past, negative -> future
  const diffSec = Math.floor(Math.abs(diffMs) / 1000);

  const fmt = (n, unit, pastLike = true) =>
    pastLike
      ? `${n} ${unit}${n !== 1 ? 's' : ''} ago`
      : `in ${n} ${unit}${n !== 1 ? 's' : ''}`;

  // very recent
  if (diffSec < 5) return diffMs >= 0 ? 'just now' : 'in a few seconds';
  if (diffSec < 60) return diffMs >= 0 ? `${diffSec} second${diffSec !== 1 ? 's' : ''} ago` : `in ${diffSec} second${diffSec !== 1 ? 's' : ''}`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return diffMs >= 0 ? fmt(diffMin, 'minute') : fmt(diffMin, 'minute', false);

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return diffMs >= 0 ? fmt(diffHour, 'hour') : fmt(diffHour, 'hour', false);

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return diffMs >= 0 ? 'yesterday' : 'tomorrow';
  if (diffDay < 30) return diffMs >= 0 ? fmt(diffDay, 'day') : fmt(diffDay, 'day', false);

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return diffMs >= 0 ? fmt(diffMonth, 'month') : fmt(diffMonth, 'month', false);

  const diffYear = Math.floor(diffMonth / 12);
  return diffMs >= 0 ? fmt(diffYear, 'year') : fmt(diffYear, 'year', false);
}


export default time


