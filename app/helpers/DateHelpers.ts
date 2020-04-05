export const parseDate = (date: string) => new Date(date);

export const formatDate = (date: Date) => date.toLocaleDateString();
export const formatTime = (date: Date) => date.toLocaleTimeString();

export const formatStringDate = (date: string) => formatDate(parseDate(date));

export const formatStringTime = (date: string) => formatTime(parseDate(date));

export const formatStringDateTime = (date: string) =>
  `${formatDate(parseDate(date))} ${formatTime(parseDate(date))}`;

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC"
];

export const getMonthName = (date: Date) => monthNames[date.getMonth()];
