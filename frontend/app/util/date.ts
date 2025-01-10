

export const displayDateWithDiff = (isoDate: string) => {
  const now = new Date();
  const date = new Date(isoDate);
  const diffInSeconds = Math.floor((Number(now) - Number(date)) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30; // Approximating 30 days as a month

  if (diffInSeconds >= secondsInDay && diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}天前`;
  }
  if (diffInSeconds >= secondsInHour && diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}個小時前`;
  }
  if (diffInSeconds >= secondsInMinute && diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}分鐘前`;
  }
  if (diffInSeconds >= 1 && diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}秒前`;
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
