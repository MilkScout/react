import { when } from './when';

export type DateFormat =
  | 'dd.MM.YYYY'
  | 'dd.MM.YYYY hh:mm'
  | 'MM/dd/YYYY'
  | 'MM/dd/YYYY hh:mm'
  | 'dd-MM-YYYY'
  | 'dd-MM-YYYY hh:mm';

export const formatDate = (date: Date | string, format: DateFormat) => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const year = new Intl.DateTimeFormat('de', { year: 'numeric', timeZone }).format(dateObject);
  const month = new Intl.DateTimeFormat('de', { month: '2-digit', timeZone }).format(dateObject);
  const day = new Intl.DateTimeFormat('de', { day: '2-digit', timeZone }).format(dateObject);

  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();

  const normalizedHour = when(hour < 10, `0${hour}`, `${hour}`);
  const normalizedMinute = when(minute < 10, `0${minute}`, `${minute}`);

  const buildFunction: Record<DateFormat, () => string> = {
    'dd.MM.YYYY': () => `${day}.${month}.${year}`,
    'dd.MM.YYYY hh:mm': () => `${day}.${month}.${year} ${normalizedHour}:${normalizedMinute}`,
    'MM/dd/YYYY': () => `${month}/${day}/${year}`,
    'MM/dd/YYYY hh:mm': () => `${month}/${day}/${year} ${normalizedHour}:${normalizedMinute}`,
    'dd-MM-YYYY': () => `${day}-${month}-${year}`,
    'dd-MM-YYYY hh:mm': () => `${day}-${month}-${year} ${normalizedHour}:${normalizedMinute}`,
  };

  return buildFunction[format]();
};
