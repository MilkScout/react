import { when } from './when';

export type DateFormat =
  | 'dd.MM.YYYY'
  | 'dd.MM.YYYY hh:mm'
  | 'MM/dd/YYYY'
  | 'MM/dd/YYYY hh:mm'
  | 'dd-MM-YYYY'
  | 'dd-MM-YYYY hh:mm'
  | 'YYYY-MM-dd'
  | 'YYYY-MM-dd hh:mm';

export const formatDate = (date: Date | string, format: DateFormat) => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();

  const normalizedMonth = when(month < 10, `0${month}`, `${month}`);
  const normalizedDay = when(day < 10, `0${day}`, `${day}`);
  const normalizedHour = when(hour < 10, `0${hour}`, `${hour}`);
  const normalizedMinute = when(minute < 10, `0${minute}`, `${minute}`);

  const buildFunction: Record<DateFormat, () => string> = {
    'dd.MM.YYYY': () => `${normalizedDay}.${normalizedMonth}.${year}`,
    'dd.MM.YYYY hh:mm': () => `${normalizedDay}.${normalizedMonth}.${year} ${normalizedHour}:${normalizedMinute}`,
    'MM/dd/YYYY': () => `${normalizedMonth}/${normalizedDay}/${year}`,
    'MM/dd/YYYY hh:mm': () => `${normalizedMonth}/${normalizedDay}/${year} ${normalizedHour}:${normalizedMinute}`,
    'dd-MM-YYYY': () => `${normalizedDay}-${normalizedMonth}-${year}`,
    'dd-MM-YYYY hh:mm': () => `${normalizedDay}-${normalizedMonth}-${year} ${normalizedHour}:${normalizedMinute}`,
    'YYYY-MM-dd': () => `${year}-${normalizedMonth}-${normalizedDay}`,
    'YYYY-MM-dd hh:mm': () => `${year}-${normalizedMonth}-${normalizedDay} ${normalizedHour}:${normalizedMinute}`,
  };

  return buildFunction[format]();
};
