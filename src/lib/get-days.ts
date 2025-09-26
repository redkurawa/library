import dayjs from 'dayjs';

export const getLoanDay = (startDate: string, endDate: string): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const duration = end.diff(start, 'day');
  return `Duration: ${duration} days`;
};
